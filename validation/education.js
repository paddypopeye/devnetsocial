const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data){
    let errors = {};

    data.school = !isEmpty(data.school) ? data.school:"";
    data.level = !isEmpty(data.level) ? data.level:"";
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy:"";
    data.from = !isEmpty(data.from) ? data.from:"";
    data.to =!isEmpty(data.to) ? data.to:"";
    
    if(Validator.isEmpty(data.school)){
        errors.school = "School field is required";
    }//end if
    if(Validator.isEmpty(data.level)){
        errors.level = "Education level field is required";
    }//end if
    if(Validator.isEmpty(data.from)){
        errors.from = "From date field is required";
    }//end if
    if(Validator.isEmpty(data.to)){
        errors.to = "To date field is required";
    }//end if
    if(Validator.isEmpty(data.fieldofstudy)){
        errors.fieldofstudy= "Field of study field is a required";
    }//end if

    return {
        errors,
        isValid:  isEmpty(errors)
    }//end return  
}//end validateExperienceInput()