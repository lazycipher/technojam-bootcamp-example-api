const express = require('express');
const router = express.Router();
const Projects = require('../models/projects');
// const User = require('../models/user')
// const auth = require('../utils/auth');
const sanitize = require('mongo-sanitize');

// @route    GET api/projects
// @desc     Get List of Projects
// @access   Public
router.get('/', async(req, res)=> {
    try{
        const projects = await Projects.find({ });
        return res.json(projects);
    }catch(err){
        console.log(err.message);
        return res.status(500).send('Server Error');
    }
})

// @route    POST api/projects/add
// @desc     add new project
// @access   Private: Only admins can add Projects
router.post('/add', async(req, res)=> {
    const project = sanitize(req.body);
    try{
            let projectCreation = await Projects.create(project);
            if(projectCreation){
                return res.status(201).json({ msg: 'Project Added Successfully' });
            }else{
                return res.status(400).json({msg: 'Failed: Add Project Operation'});
            }
    }catch(err) {
		return res.status(500).send({'Server Error': err.message});
    }
});

module.exports = router;
