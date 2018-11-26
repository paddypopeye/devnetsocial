import axios from "axios";

const setAuthToken = token => {
    if(token){
        //Apply to all req's
        axios.defaults.headers.common['Authorization'] = token;
    }else{
        //delete the auth header
        delete axios.defaults.headers.common['Authorization'];
    }
}
export default setAuthToken;