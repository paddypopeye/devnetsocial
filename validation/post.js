const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data){
    let errors = {};
    

    data.text = !isEmpty(data.text) ? data.text:"";

    
    if(!Validator.isLength(data.text, {min:10,max:300})){
        errors.text = "Posts between 10 and 300 characters";
    }//end if    
    if(Validator.isEmpty(data.text)){
        errors.text = "Text field is required";
    }//end if
    
    return {
        errors,
        isValid:  isEmpty(errors)
    }//end return  
}//end validatePostInput()