import axios from 'axios';
import { GET_PROFILES, GET_PROFILE, GET_ERRORS, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER } from './types';

export const addEducation = (experInfo, history) => dispatch => {
    axios
    .post('/api/profile/education', experInfo)
    .then(res => history.push('/dashboard'))
    .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })//end dispatch
        )//end catch
}//end AddExperience


export const addExperience = (experInfo, history) => dispatch => {
    axios
    .post('/api/profile/experience', experInfo)
    .then(res => history.push('/dashboard'))
    .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })//end dispatch
        )//end catch
}//end AddExperience


//Get the current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
    .then(res => dispatch({
        type: GET_PROFILE,
        payload: res.data}))
    .catch( err => {
        dispatch({
            type: GET_PROFILE,
            payload: {}})
    })//end catch
}//ends getCurrentProfile

//Get a single profile by handle
export const getProfileByHandle = (handle) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`/api/profile/handle/${handle}`)
    .then(res => dispatch({
        type: GET_PROFILE,
        payload: res.data}))
    .catch( err => {
        dispatch({
            type: GET_PROFILE,
            payload: null})
    })//end catch
}//ends getProfile

//Set profile loading
export const setProfileLoading = () => {
    return{
        type: PROFILE_LOADING
    }
 }

 export const createProfile= (profileData, history) => dispatch => {
    axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err => 
        dispatch({
            type: GET_ERRORS,   
            payload: err.response.data
        })//end dispatch
    )//end catch
 }//end createProfile
 
//Clear profile
export const clearCurrentProfile = () => {
    return{
        type: CLEAR_CURRENT_PROFILE
    }//end return
 }//end clearCurrentProfile
 
export const deleteExperience = (id) => dispatch => {
    axios
    .delete(`/api/profile/experience/${id}`)
    .then(res => dispatch({
        type: GET_PROFILE,
        payload: res.data
    })) 
    .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })//end dispatch
        )//end catch
}//end deleteExperience

export const deleteEducation = (id) => dispatch => {
    axios
    .delete(`/api/profile/education/${id}`)
    .then(res => dispatch({
        type: GET_PROFILE,
        payload: res.data
    })) 
    .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })//end dispatch
        )//end catch
}//end deleteEducation


 export const deleteAccount = () => dispatch => {
    if(window.confirm('Are you sure? This cannot be undone!!')){
        axios
        .delete('/api/profile')
        .then(res =>{
            dispatch({  
                type: SET_CURRENT_USER,
                payload: {}
            })
        })//end then
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))//end catch
    }//end if window.confirm
 }//end deleteAccount

 //Get all profiles
 export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile/all')
    .then(res => dispatch({
        type: GET_PROFILES,
        payload: res.data}))
    .catch( err => {
        dispatch({
            type: GET_PROFILES,
            payload: {}})
    })//end catch
}//ends getCurrentProfile