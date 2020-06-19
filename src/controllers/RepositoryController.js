const mongoose = require('mongoose');
const Repository = mongoose.model('Repository');

module.exports = {
    async index(req, res){
        try{
            await Repository.find().then((repository) => {
                    return res.json(repository);
            }).catch((erro) => {
                return res.status(400).json({
                    error: true,
                    message: "Erro ao listar os Repositorios"
                });
            });
        } catch(err){
            return res.status(500).json({
                error: true,
                message: err 
            })
        }
    },

    async show(req, res){
        await Repository.findById(req.params.id).then((repository) => {
            if (repository !== null){
                return res.json(repository);
            }else{
                return res.status(400).json({
                    error: true,
                    message: "Repositorio não encontrado!"
                });
            }
        }).catch((erro) => {
            return res.status(400).json({
                error: true,
                message: "Repositorio não encontrado!"
            });
        });
    },

    async store(req, res){
        try{
            const repository = await Repository.create(req.body, (err) => {
                if(err) return res.status(400).json({
                    error: true,
                    message: "Erro: Repositorio não cadastrado!"
                });
                return res.status(200).json({
                    error: false,
                    message: "Repositorio cadastrado com sucesso",
                    dados: repository
                });
            });
        } catch(err){
            return res.status(500).json({
                error: true,
                message: err 
            })
        }        
    },

    async likeup(req, res){
        try{
            const { id } = req.params;
            const repositoryIndex = await Repository.findById(req.params.id);

            if(repositoryIndex === null){
                return res.status(400).json({ 
                    error: true,
                    message: "Repositório não encontrado!" 
                });
            }
            const { title, url, techs, likes } = repositoryIndex;
            const incrementLike = (likes+1);
            const repository = { 
              id, 
              title, 
              url, 
              techs,
              likes: incrementLike
            };

            await Repository.findByIdAndUpdate(req.params.id, repository, { new: true }, (err) => {
                if(err) return res.status(400).json({
                    error: true,
                    message: "Error: Like não foi adicionado!"
                });
        
                return res.json(repository);
            });
        } catch(err){
            return res.status(500).send({
                error: true,
                message: "Erro fatal!" 
            })
        }        
    },

    async update(req, res){
        try{
            await Repository.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err) => {
                if(err) return res.status(400).json({
                    error: true,
                    message: "Error: repositorio não foi editado!"
                });
        
                return res.json({
                    error: false,
                    message: "Repositorio editado com sucesso!"
                });            
            });
        } catch(err){
            return res.status(500).json({
                error: true,
                message: err 
            })
        }
    },   

    async destroy(req, res){
        try{
            await Repository.findByIdAndRemove(req.params.id, (err) =>{
                if(err) return res.status(400).json({
                    error: true,
                    message: "Erro: não foi possível apagar o registro"
                });
                return res.json({
                    error: false,
                    message: "Registro excluído com sucesso"
                })
            });
        } catch(err){
            return res.status(500).json({
                error: true,
                message: err 
            })
        }
    }
};