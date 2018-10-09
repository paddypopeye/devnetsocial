const express = require('express');
const router = express.Router();

//Route api/users/test
//Desc: test the route
//Access: public
router.get('/test', (req,res) => res.json({msg:"Users works!!"}));

module.exports=router;