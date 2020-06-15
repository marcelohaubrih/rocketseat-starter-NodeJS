const mongoose = require('mongoose');
const Product = mongoose.model('Product');

module.exports = {
    async index(req, res){
        const { page = 1 } = req.query;
        if (page === '0' || page === ''){
            return res.status(400).json({
                error: true,
                message: "Erro: página nula ou zero!"
            });
        }else{
            await Product.paginate({}, {page, limit:10}).then((product) => {
                //console.log(product.pages);
                if(page <= product.pages){
                    return res.json(product);
                }else{
                    return res.status(400).json({
                        error: true,
                        message: "Erro: página fora do escopo!"
                    });                    
                }
            }).catch((erro) => {
                return res.status(400).json({
                    error: true,
                    message: "Erro ao listar os produtos"
                });
            });
        }
    },

    async show(req, res){
        await Product.findById(req.params.id).then((product) => {
            return res.json(product);
        }).catch((erro) => {
            return res.status(400).json({
                error: true,
                message: "Produto não encontrado!"
            });
        });
    },

    async store(req, res){
        const product = await Product.create(req.body, (err) => {
            if(err) return res.status(400).json({
                error: true,
                message: "Erro: produto não cadastrado!"
            });
            
            return res.status(200).json({
                error: false,
                message: "Produto cadastrado com sucesso",
                dados: product
            });
        });
        
    },

    async update(req, res){
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err) => {
            if(err) return res.status(400).json({
                error: true,
                message: "Error: produto não foi editado!"
            });
    
            return res.json({
                error: false,
                message: "Produto editado com sucesso!"
            });            
        });
        return res.json(product);
    },

    async destroy(req, res){
        const product = await Product.findByIdAndRemove(req.params.id, (err) =>{
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