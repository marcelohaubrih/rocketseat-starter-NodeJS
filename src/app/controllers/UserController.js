const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const authConfig = require('../../config/auth.json');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');
const multer = require('multer');
const path = require('path');

require('dotenv').config();

function generateToken(params = {}){
    const { id, email } = params;
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });       
}

module.exports = {
    async index(req, res){
        const { page = 1 } = req.query;
        if (page === '0' || page === ''){
            return res.status(400).json({
                error: true,
                message: "Erro: página nula ou zero!"
            });
        }else{
            await User.paginate({}, {page, limit:10}).then((user) => {
                if(page <= user.pages){
                    return res.json(user);
                }else{
                    return res.status(400).json({
                        error: true,
                        message: "Erro: página fora do escopo!"
                    });                    
                }
            }).catch((erro) => {
                return res.status(400).json({
                    error: true,
                    message: "Erro ao listar os usuários"
                });
            });
        }
    },

    async show(req, res){
        await User.findById(req.params.id).then((user) => {
            if(user === null){
                return res.status(400).json({
                    error: true,
                    message: "Usuário não encontrado!"
                });
            }
            return res.json({
                error: false, 
                user,
            });
        }).catch((erro) => {
            return res.status(400).json({
                error: true,
                message: "Usuário não encontrado!"
            });
        });
    },

    async store(req, res){
        const foundUser = await User.findOne({ email: req.body.email });
        if(foundUser){
            return res.status(403).json({
                error: true,
                message: "email já cadastrado no banco de dados"
            });
        }

        const user = await User.create(req.body);

        user.password = undefined;

        return res.status(200).json({
            error: false,
            message: "Usuário cadastrado com sucesso",
            token: generateToken({id: user.id, email: user.email}),
            user,
        });
    },

    async login(req, res){
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');
        if (!user){
            return res.status(404).json({
                error: true,
                login: false,
                message: "User not found"
            });            
        }
        if (!await bcrypt.compare(password, user.password)){
            return res.status(404).json({
                error: true,
                login: false,
                message: "Invalid password"
            });             
        }
        user.password = undefined;

        return res.status(200).json({
            error: false,
            login: true,
            message: "Login efetuado!",
            token: generateToken({id: user.id, email: user.email}),
            user,
        })        
    },

    async forgot(req, res){
        const { email } = req.body;
        try{
            const user = await User.findOne({ email })
            if (!user) return res.status(400).json({
                error: true,
                message: "Error: user not found!"
            }); 

            const token = crypto.randomBytes(20).toString('hex');
            const now = new Date();
            now.setHours(now.getHours()+1);

            await User.findByIdAndUpdate(user.id, {
                '$set':{
                    passwordResetToken: token,
                    passwordResetExpires: now,
                }
            })
            mailer.sendMail({
                to: email,
                from: process.env.SMTP_EMAIL_FROM,
                template: 'auth/forgot_password',
                subject: 'APP-GOSTACK - forgot password',
                //text: `seu token: ${token}`,
                //html: `<p>seu token: ${token}</p>`,
                context: { token },
            }, (err) =>{
                console.log(err);
                if(err) return res.status(400).json({
                    error: true,
                    message: "Cannot send forgot password email!"
                }); 
                console.log(token, now);
                return res.status(200).json({
                    error: false,
                    message: "Token de reset de email criado, entre no seu email e verifique o link de reset"
                });
            });

        } catch(err){
            console.log(err);
            return res.status(400).json({
                error: true,
                message: "Error on forgot password, try again"
            });
        }
    },

    async reset(req, res){
        const { email, token, password } = req.body;
        try{
            const user = await User.findOne({ email }).select('+ passwordResetToken passwordResetExpires');
            if (!user) return res.status(400).json({
                error: true,
                message: "Error: user not found!"
            }); 

            if(token !== user.passwordResetToken) return res.status(400).json({
                error: true,
                message: "Token invalid!"
            }); 

            const now = new Date();
            if(now > user.passwordResetExpires) return res.status(400).json({
                error: true,
                message: "Token Expired, generete a new one!"
            });            

            user.password = password;
            user.passwordResetExpires = now;
            await user.save();

            return res.status(200).json({
                error: false,
                message: "Password update sucessful"
            });

        } catch(err){
            console.log(err);
            return res.status(400).json({
                error: true,
                message: "Error cannot reset password, try again"
            });
        }
    },

    async update(req, res){
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err) => {
            if(err) return res.status(400).json({
                error: true,
                message: "Error: usuário não foi editado!"
            });
    
            return res.json({
                error: false,
                message: "Usuário editado com sucesso!"
            });            
        });
    },

    async destroy(req, res){
        const user = await User.findByIdAndRemove(req.params.id, (err) =>{
            if(err) return res.status(400).json({
                error: true,
                message: "Erro: não foi possível apagar o registro"
            });
            return res.json({
                error: false,
                message: "Registro excluído com sucesso"
            })
        });
    },

    async avatar(req, res){
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, path.join(__dirname, '../../../src/files'));
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + path.extname(file.originalname));
            }
        });
        
        const fileFilter = (req, file, cb) => {
            if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/gif' || file.mimetype == 'image/png') {
                cb(null, true);
            } else {
                cb(null, false);
            }
        }

        var upload = multer({ 
            storage: storage, 
            fileFilter: fileFilter,
            onError : function(err, next) {
                console.log('error', err);
                next(err);
              }            
        }).single('image')

        try {
            const findUser = await User.findById(req.params.id)
        
            if(findUser){
                upload(req, res, async function (err) {
                    if (err instanceof multer.MulterError) {
                      // A Multer error occurred when uploading.
                        return res.status(400).json({
                            message: 'MulterError - File uploded Error',
                            err
                        });               
                    } else if (err) {
                        return res.status(400).json({
                            message: 'FatalError - File uploded Error 2',
                            err
                        });              
                    }
                    if (!req.file){
                        return res.status(400).json({
                            message: 'Incompatible File - uploded Error',
                        });  
                    }else{
                        await User.findByIdAndUpdate(req.params.id, { "avatar": req.file.filename}, { new: true }, (err) => {
                            if(err) return res.status(400).json({
                                error: true,
                                message: "Fatal Error: user not updated!"
                            });
                            return res.status(201).json({
                                message: 'User updated successfully',
                                file: req.file.filename,
                                userId: req.params.id,
                                userEmail: req.params.email
                            });                                
                        });              
                    }
                }); 
            }else{
                console.log('Não encontrado');
            }
        } catch (error) {
            return res.status(400).json({
                message: 'Error - find user',
                error
            });        
        }
        /* 
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
              // A Multer error occurred when uploading.
                return res.status(400).json({
                    message: 'MulterError - File uploded Error',
                    err
                });               
            } else if (err) {
                return res.status(400).json({
                    message: 'FatalError - File uploded Error 2',
                    err
                });              
            }
            if (!req.file){
                return res.status(400).json({
                    message: 'Incompatible File - uploded Error',
                });  
            }else{
                return res.status(201).json({
                    message: 'File uploded successfully',
                    file: req.file.filename,
                    userId: req.params.id,
                    userEmail: req.params.email
                });              
            }
        }); 
        */

    }
};