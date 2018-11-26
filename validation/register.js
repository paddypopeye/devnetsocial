const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data){
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name:"";
    data.email = !isEmpty(data.email) ? data.email:"";
    data.password = !isEmpty(data.password) ? data.password:"";
    data.password2 = !isEmpty(data.password2) ? data.password2:"";


    if(!Validator.isLength(data.name,{ min:2,max:30})){
        errors.name = 'Name must be between 2 and 30 characters'
    }//end if
    if(Validator.isEmpty(data.name)){
        errors.name = "Name Filed is required";
    }//end if
    if(Validator.isEmpty(data.email)){
        errors.email = "Email Field is required";
    }//end if
    if(!Validator.isEmail(data.email)){
        errors.email_ = "Email Field must be valid email";
    }//end if
    if(Validator.isEmpty(data.password)){
        errors.password = "Password Field is required";
    }//end if
    if(!Validator.isLength(data.password,{ min:8, max:30})){
        errors.password_ = 'Password must be at least 8 characters'
    }//end if
    if(Validator.isEmpty(data.password2)){
        errors.password2 = "Confirm password Field is required";
    }//end if
    if(!Validator.equals(data.password, data.password2)){
        errors.password2 = "Passwords do not match" ;
    }//end if
    return {
        errors,
        isValid:  isEmpty(errors)
    }//end return  
}//end validateRegisterInput(