const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data){
    let errors = {};
    

    data.email = !isEmpty(data.email) ? data.email:"";
    data.password = !isEmpty(data.password) ? data.password:"";
    
    if(Validator.isEmpty(data.email)){
        errors.email = "Email Field is required";
    }//end if
    if(!Validator.isEmail(data.email)){
        errors.email = "Email Field must be valid email";
    }//end if
    if(Validator.isEmpty(data.password)){
        errors.password = "Password Field is required";
    }//end if
    if(!Validator.isLength(data.password,{ min:8, max:30})){
        errors.password = 'Password must be at least 8  characters'
    }//end if
    
    return {
        errors,
        isValid:  isEmpty(errors)
    }//end return  
}//end validateRegisterInput()