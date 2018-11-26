const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data){
    let errors = {};
    
    data.title = !isEmpty(data.title) ? data.title:"";
    data.company = !isEmpty(data.company) ? data.company:"";
    data.from = !isEmpty(data.from) ? data.from:"";
       
    if(Validator.isEmpty(data.title)){
        errors.title = "Job title Field is required";
    }//end if
    if(Validator.isEmpty(data.company)){
        errors.company = "Job company Field is required";
    }//end if
    if(Validator.isEmpty(data.from)){
        errors.from = "From date field is required";
    }//end if
        
    return {
        errors,
        isValid:  isEmpty(errors)
    }//end return  
}//end validateExperienceInput()