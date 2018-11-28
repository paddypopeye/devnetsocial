import React, { Component } from 'react';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utilities/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileAction';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
//Import components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import store  from './store';
import Login from   './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import PrivateRoute from './components/common/PrivateRoute';
import AddExperience from './components/add-credentials/addExperience';
import AddEducation from './components/add-credentials/addEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

//check if logged in using jwt token
if(localStorage.jwtToken){
  //Set token value
  setAuthToken(localStorage.jwtToken)
  //Decode the token 
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user as authenticated
  store.dispatch(setCurrentUser(decoded));
  //Check for expired token
  const currentTime = Date.now()/1000
  if(decoded.exp < currentTime ){
    //Clear current profile
    store.dispatch(clearCurrentProfile());
    //Logout user
    store.dispatch(logoutUser());
    //Redirect to landing
    window.location.href = '/'
  }//end if
}//end if 

class App extends Component {
  render() {
    return (
    <Provider store={store}>
      <Router>
          <div className='App'>
              < Navbar />
              
              <Route  exact path="/" component={ Landing } />
                    <div className="container">
                        
                      <Route exact path="/not-found" component={ NotFound } />
                      <Route exact path="/register" component={ Register } />
                      <Route exact path="/profile/:handle" component={ Profile } />
                      <Route exact path="/login" component={ Login } /> 
                      <Route exact path="/profiles" component={ Profiles } /> 
                      <Switch>
                        <PrivateRoute exact path="/dashboard"  component={  Dashboard }/>
                      </Switch>
                      <Switch>
                        <PrivateRoute exact path="/create-profile"  component={  CreateProfile }/>
                      </Switch>
                      <Switch>
                        <PrivateRoute exact path="/edit-profile"  component={  EditProfile }/>
                      </Switch>
                      <Switch>
                        <PrivateRoute exact path="/add-experience"  component={ AddExperience }/>
                      </Switch>
                      <Switch>
                        <PrivateRoute exact path="/add-education"  component={ AddEducation }/>
                      </Switch>
                      <Switch>
                        <PrivateRoute exact path="/feed" component={ Posts }/>
                      </Switch>
                      <Switch>
                        <PrivateRoute exact path="/post/:id" component={ Post }/>
                      </Switch>
                                                
                  </div>
                < Footer />
          </div>
      </Router>
    </Provider>  
    );//end return
  }//end render
}//end Class App 
export default App;
