const express = require('express');
const router = express.Router();
const Projects = require('../models/project');
// const User = require('../models/user')
// const auth = require('../utils/auth');
const sanitize = require('mongo-sanitize');

// @route    GET api/projects
// @desc     Get List of Projects
// @access   Publicy
router.get('/', async(req, res)=> {
    try{
        const projects = await Projects.find({ });
        return res.json(projects);
    }catch(err){
        console.log(err.message);
        return res.status(500).send('Server Error');
    }
})
module.exports = router;
router.post('/add', async(req, res)=> {
    const project = sanitize(req.body);
    try{
        // const user = await User.findOne({ uid: req.user.uid }).select('-password');
        // if (user.role != 'admin') return res.status(401).json({ msg: 'Not authorized' });
        // else {
            let projectCreation = await Projects.create(project);
            if(projectCreation){
                return res.status(201).json({ msg: 'Project Added Successfully' });
            }else{
                return res.status(400).json({msg: 'Failed: Add Project Operation'});
            }
        // }
    }catch(err) {
		return res.status(500).send({'Server Error': err.message});
    }
});