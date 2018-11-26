import { GET_ERRORS } from './types';
import { SET_CURRENT_USER } from './types';
import axios  from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utilities/setAuthToken';

//register the user
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
};

//Login user fetch token
export const loginUser = (userData) => dispatch => {
    axios.post('api/users/login', userData)
    .then(res => {
        ///save to local storage
        const { token } = res.data;
        //set token local storage
        localStorage.setItem('jwtToken', token);
        //Set auth header
        setAuthToken(token); 
        //Decode token to exfiltrate user info
        const decoded = jwt_decode(token);
        //Set current user
        dispatch(setCurrentUser(decoded))})
        .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data}))};

//Set the current User
export const setCurrentUser = (decoded) => { 
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

//User logout
export const logoutUser = () => dispatch => {
    //delete token
    localStorage.removeItem('jwtToken');
    //delete the auth header
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};