const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data){
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle:"";
    data.status = !isEmpty(data.status) ? data.status:"";
    data.skills = !isEmpty(data.skills) ? data.skills:"";
    
    if(Validator.isEmpty(data.skills)){
        errors.skills = "Skills Field is required";
    }//end if
    if(Validator.isEmpty(data.status)){
        errors.status= "Status field is required";
    }//end if
    if(Validator.isEmpty(data.handle)){
        errors.handle = "Profile handle is required";
    }//end if
    if(!Validator.isLength(data.handle,{ min:2, max:4})){
        errors.handle = 'Handle must be between 2 and 4 characters'
    }//end if

    if(!isEmpty(data.website)){
        if(!Validator.isURL(data.website)){
            errors.website = "Not a valid URL"
        }
    }//end if

    if(!isEmpty(data.twitter)){
        if(!Validator.isURL(data.twitter)){
            errors.twitter = "Not a valid URL"
        }
    }//end if

    if(!isEmpty(data.facebook)){
        if(!Validator.isURL(data.facebook)){
            errors.facebook = "Not a valid URL"
        }
    }//end if

    if(!isEmpty(data.linkedin)){
        if(!Validator.isURL(data.linkedin)){
            errors.linkedin = "Not a valid URL"
        }
    }//end if

    if(!isEmpty(data.instagram)){
        if(!Validator.isURL(data.instagram)){
            errors.instagram = "Not a valid URL"
        }
    }//end if

    if(!isEmpty(data.youtube)){
        if(!Validator.isURL(data.youtube)){
            errors.youtube = "Not a valid URL"
        }
    }//end if

    return {
        errors,
        isValid: isEmpty(errors)
    }//end return  
}//end validateProfileInput()