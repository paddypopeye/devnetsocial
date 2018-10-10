const User  = require('../../models/User');
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

  

//Load input valdation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


//Route api/users/test 
//Method: GET
//Desc: test the route
//Access: public
router.get('/test', (req,res) => res.json({msg:"Users works!!"}));

//Route api/users/register 
//Method: POST
//Desc: test the route
//Access: public
router.post('/register', (req,res) => {
    const {errors, isValid} = validateRegisterInput(req.body);
    if(!isValid){
        //check validation
        return res.status(400).json(errors);
    }//end if

    User.findOne({ 
        email: req.body.email 
    })
    .then(user => {
        if(user){
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
        }//end if 
        else {

            const avatar = gravatar.url(req.body.email,{
                s:'200',//size
                r:'pg',//rating
                d: 'mm'//default
            })
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password

            });

            bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                    });// bcrypt.hash()
            })//end genSalt()
        }//end else
    })//end findOne
})//end post


//Route api/users/login
//Method: POST
//Desc: login for users
//Access: public
router.post('/login', (req, res)=>{
    const {errors, isValid} = validateLoginInput(req.body);
    if(!isValid){
        //check validation
        return res.status(400).json(errors);
    }//end if
    const email = req.body.email;
    const password = req.body.password;

    //find user with email
    User.findOne({ email })
    .then(user => {
        //check for user
        if(!user){
            errors.email = "User not found";
            return res.status(404).json(errors);
        }//end if
        //check submitted password
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if(isMatch){
                //user matched
                const payload = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar
                }//create jwt payload

                //sign the token
                jwt.sign(payload, keys.secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    })//end res.json()
                })//end jwt.sign()
            }//end if(isMatch) 
            else{
                errors.password = "Password incorrect";
                return res.status(400).json(errors);
            }//end else
        })//end compare.then()
    })//end findOne.then()
})//end post 

//Route api/users/current
//Method: GET
//Desc: return current user
//Access: private 
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res)=> {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        }); 
})//end get() 
module.exports=router;  