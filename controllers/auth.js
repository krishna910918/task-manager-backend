const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signin = async(req, res) => {

    const {email, password} = req.body;

    try {

        let existingUser = await User.findOne({email});

        if ( ! existingUser) return res.status(404).json({message : "User not found "});

        const isPasswordCorrect = (existingUser.password === password);

        if ( ! isPasswordCorrect ) return res.status(400).json({message : "Invalid Credentials"});

        const token = jwt.sign({email, id : existingUser._id}, 'test', {expiresIn : '1h'});

        return res.status(200).json({result:existingUser,token});

    } catch(error) {
        return res.status(500).json({message : "Something went wrong "});
    }
}

exports.signup = async(req, res) => {
    
    let {name, email, password} = req.body;

    try{

        let existingUser = await User.findOne({email});

        if (existingUser) return res.status(400).json({message : 'User Already exists '});
        
        if (name == '' || email == "" || password == "" ) return res.status(400).json({message : "Incomplete Credentials"});

        let result = await User.create({name, email, password});

        return res.status(201).json({result,message:"Registration is Successful !!!"});



    } catch(error) {
        return res.status(500).json({message : "Something went Wrong "});
    }
}

