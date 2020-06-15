const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const crypto = require('crypto');

signToken = user => {
    return jwt.sign({
        iss: 'CodeWorkr_API',
        sub: 'NodeJS-API-mongoDB',
        iat: new Date().getTime(),// Current time
        exp: new Date().setDate(new Date().getDate() + 1) //Current time + 1 day ahead
    }, 'userauthenticate');
};

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
                //console.log(product.pages);
                if(page <= user.pages){
                    //const tempUsers = JSON.stringify(user.docs);
                    //const tempUsers = Object.assign({},user.docs);
                    //console.log(tempUsers.name);
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
                id: user._id,
                name: user.name,
                email: user.email
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

        const user = await User.create(req.body, (err) => {
            if(err) return res.status(400).json({
                error: true,
                message: "Erro: usuário não cadastrado!"
            });
            
            return res.status(200).json({
                error: false,
                message: "Usuário cadastrado com sucesso"
            });
        });
        
    },

    async login(req, res){
        const email = req.body.email;
        const password = req.body.password;
        
        User.findOne({email: email, password: password}, (err, user) => {
            if(err){ 
                //console.log(err);
                return res.status(400).json({
                error: true,
                login: false,
                message: "Erro ao processar o Login!"
                });
            };
            if(!user){
                //console.log(user);
                return res.status(404).json({
                    error: true,
                    login: false,
                    message: "Usuário/Senha inválidos!"
                })
            }
            return res.status(200).json({
                error: false,
                login: true,
                message: "Login efetuado!"
            })
        });
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
        return res.json(product);
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
    }
};