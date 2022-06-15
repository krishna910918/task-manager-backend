const Task = require('../models/task');
const User = require('../models/user');

exports.addTask = async (req,res) => {

    let {task} = req.body;
    
    if( task == '') return res.status(400).json({message : "Fill the task"});

    try {

        let userId = req.user.id;
       
        let user = await User.findById(userId);
        

        let result = await Task.create({task,author:user.name});

        return res.status(201).json({result,message : "Task added successfully !"});

    

    } catch (error) {
        return res.status(500).json({message : "Something went Wrong "});
    }
}

exports.getTasks = async (req,res) => {

    try {

        let tasks = await Task.find();

        return res.status(200).json({tasks});

    } catch(error) {
        return res.status(500).json({message : 'Something went wrong'});
    }

}

exports.updateTask = async (req,res) => {

    try{

        let {id} = req.params;
        let {task} = req.body;

        let existingTask = await Task.findById(id);

        existingTask.task = task;

        let result = await Task.findByIdAndUpdate(id,existingTask);
        
        return res.status(200).json({result});

    } catch (error) {
        return res.status(500).json({message : "Something went Wrong"});
    }
}

exports.deleteTask = async (req, res) => {

    let {id} = req.params;

    try {

        let existingTask = await Task.findById(id);

        if ( ! existingTask) return res.status(404).json({message : "Task not found"});

        await Task.findByIdAndRemove(id);

        return res.status(200).json({message : "Task deleted successfully"});

    } catch(error) {
        return res.status(500).json({message : "Something went Wrong "})
    }
}