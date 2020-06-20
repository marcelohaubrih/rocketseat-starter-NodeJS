const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const Task = mongoose.model('Task');

module.exports = {
    async index(req, res){
        try {
            const projects = await Project.find().populate(['user', 'tasks']);
            //console.log(projects);
            if(projects != null && projects != 0){
                return res.status(200).json({ projects });
            }else{
                return res.status(300).json({
                    error: false,
                    message: "project is null",
                });                
            }
        } catch (err) {
            return res.status(500).json({
                error: true,
                message: "Error loading project list",
            });             
        }
    },

    async show(req, res){
        try {
            const project = await Project.findById(req.params.id).populate(['user', 'tasks']);
            if(project != null && project != 0){
                return res.status(200).json({ project });
            }else{
                return res.status(300).json({
                    error: false,
                    message: "project not found",
                });                
            }            
        } catch (err) {
            return res.status(500).json({
                error: true,
                message: "Error loading project",
            });             
        }
    },

    async store(req, res){
        try{
            const {title, description, tasks} = req.body;
            const project = await Project.create({ title, description, user: req.userId });

            await Promise.all (tasks.map(async task => {
                const projectTask = new Task({ ...task, project: project._id });
                
                await projectTask.save();
                project.tasks.push(projectTask);
                
            }));
            await project.save();

            return res.status(200).json({
                error: false,
                message: "Project add success",
                project: project,
            });            
        }catch(err){
            console.log(err);
            return res.status(500).json({
                error: true,
                message: "Error creating new project",
            }); 
        } 
    },

    async update(req, res){
        try{
            const {title, description, tasks} = req.body;
            const project = await Project.findByIdAndUpdate(req.params.id, { 
                title, 
                description 
            }, { new:true });

            project.tasks = [];
            await Task.remove({ project: project._id });

            await Promise.all (tasks.map(async task => {
                const projectTask = new Task({ ...task, project: project._id });
                
                await projectTask.save();
                project.tasks.push(projectTask);
                
            }));
            await project.save();

            return res.status(200).json({
                error: false,
                message: "Project updating success",
                project: project,
            });            
        }catch(err){
            console.log(err);
            return res.status(500).json({
                error: true,
                message: "Error updating project",
            }); 
        } 
    },

    async destroy(req, res){
        try {
            await Project.findByIdAndRemove(req.params.id);
            return res.status(200).json({
                error: false,
                message: "Project remove sucess",
            }); 
        } catch (err) {
            return res.status(500).json({
                error: true,
                message: "Error deleting project",
            });             
        }
    }
};