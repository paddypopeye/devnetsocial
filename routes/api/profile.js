const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

//Load Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

//Route GET api/profile/profile
//Desc: get current user's profile
//Access: private
router.get('/', passport.authenticate('jwt',{session:false}), (req,res) =>{
    const errors = {}; 
    Profile.findOne({user: req.user.id}).populate('User',['name','avatar'])
    .then(profile => {
        if(!profile){
            errors.noprofile = "There is no profile for this user";
            return res.status(404).json(errors)
        }
        res.json(profile);
    })
    .catch(err => res.status(401).json(err));
})//end get('/')

//Route  GET api/profile/all
//Desc: get all profiles
//Access: public
router.get('/all', (req,res) =>{
    const errors = {}; 
    Profile.find().populate('User',['name','avatar'])
    .then(profiles => {
        if(!profiles){
            errors.profiles = "Not Found";
            return res.status(404).json(errors)
        }//end if
        res.json(profiles);
    }).catch(err => res.status(401).json(err + "No profiles"));
})//end get('/')

//Route GET api/profile/handle/:handle
//Desc: Get profile by handle
//Access: public
router.get('/handle/:handle', (req,res)=>{
    const errors = {};
    Profile.findOne({handle:req.params.handle})
    .populate('User',['name','avatar'])
    .then(profile => {
        if(!profile){
            errors.noprofile = "There is no profile for this user";
            res.status(404).json(errors)
        }//end if
        res.json(profile)
        
    }).catch(err => res.status(404).json()); //end profile=>{}
})//end get

//Route GET api/profile/user/:user_id
//Desc: Get profile by user id
//Access: public
router.get('/user/:user_id', (req,res)=>{
    const errors = {};
    Profile.findOne({ user: req.params.user_id })
    .populate('User',['name','avatar'])
    .then(profile => {
        if(!profile){
            errors.noprofile = "There is no profile for this user";
            res.status(404).json(errors)
        }//end if
        res.json(profile);
    }).catch(err => res.status(404).json(err)); //end profile=>{}
})//end get

//Route POST api/profile/profile
//Desc: Create or update user profile
//Access: private
router.post('/',
    passport.authenticate('jwt',{session:false}),
    (req,res) =>{
    const {errors, isValid} = validateProfileInput(req.body);
    //Check Validation
    if(!isValid){
        //return errors with 400 status
        return res.status(400).json(errors);
    }//end if 

    //Get the fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    if(req.body.status) profileFields.status = req.body.status;
    if(typeof req.body.skills !== 'undefined'){
        profileFields.skills = req.body.skills.split(',');
    }//end if

    //Social
    profileFields.social = {};
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    

    Profile.findOne({user: req.user.id})
    .then(profile =>{
        //update
        if(profile){
            Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new:true})
                .then(profile => res.json(profile));//end findOneAndUpdate
        }else{
            //check if handle exists
            Profile.findOne({handle: profileFields.handle })
            .then(profile => {
                if(profile){
                    errors.handle = "Handle already exists";
                    res.status(400).json(errors);
                }//end if
                //Save the profile
                new Profile(profileFields).save()
                .then(profile => {
                    res.json(profile)
                });//end new Profile
            });// end findOne.then()
        }//end if
    })//end then
})//end post('api/profile/profile')

//Route POST api/profile/experience
//Desc: Add experience to profile
//Access: private
router.post('/experience', passport.authenticate('jwt',{session:false}), (req,res)=>{
    const {errors, isValid} = validateExperienceInput(req.body);
    //Check Validation
    if(!isValid){
        //return errors with 400 status
        return res.status(400).json(errors);
    }//end if
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        const newExp = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }
        //Add experience to the profile
        profile.experience.unshift(newExp);
        profile.save()
        .then(profile => res.json(profile))
        .catch(err => res.status(400).json(err));
         
    }).catch(err => res.status(404).json(err)); //end profile=>{}
})//end post  api/profile/experiece

//Route POST api/profile/education
//Desc: Add education to profile
//Access: private
router.post('/education', passport.authenticate('jwt',{session:false}), (req,res)=>{
    const {errors, isValid} = validateEducationInput(req.body);
    //Check Validation
    if(!isValid){
        //return errors with 400 status
        return res.status(400).json(errors);
    }//end if

    Profile.findOne({ user: req.user.id })
    .then(profile => {
        const newEduc = {
            school: req.body.school,
            level: req.body.level,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from
        }
        //Add education to the profile
        profile.education.unshift(newEduc);
        profile.save()
        .then(profile => res.json(profile))
        .catch(err => res.status(400).json(err));
         
    }).catch(err => res.status(404).json(err)); //end profile=>{}
})//end post api/profile/education

//Route DELETE api/profile/experience/:edu_id
//Desc: Delete experience from profile
//Access: private
router.delete('/experience/:exp_id', passport.authenticate('jwt',{session:false}), (req,res)=>{
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        const removeIndedx = profile.experience
        .map(item => item.id)
        .indexOf(req.params.edu_id);
        //Splice out of array
        profile.experience.splice(removeIndedx,1);
        //Save the profile
        profile.save().then(profile => res.json(profile));
        }).catch(err => res.status(404).json(err)); //end profile=>{}
});//end delete experience

//Route DELETE api/profile/education/:edu_id
//Desc: Delete education from profile
//Access: private
router.delete('/education/:edu_id', passport.authenticate('jwt',{session:false}), (req,res)=>{
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        const removeIndedx = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);
        //Splice out of array
        profile.education.splice(removeIndedx,1);
        //Save the profile
        profile.save().then(profile => res.json(profile));
        }).catch(err => res.status(404).json(err)); //end profile=>{}
});//end delete education

//Route DELETE api/profile
//Desc: Delete a profile
//Access: private
router.delete('/',passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Profile.findOneAndRemove({ user: req.user.id })
      .then(() => { User.findOneAndRemove({ _id: req.user.id })
        .then(() =>res.json({ success: true }));
      });
    }//end object
  );//end delete profile

module.exports=router;