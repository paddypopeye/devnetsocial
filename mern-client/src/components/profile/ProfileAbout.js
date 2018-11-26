import React, { Component } from 'react'
import isEmpty from '../../validation/is-empty';
import Proptypes from 'prop-types';


class ProfileAbout extends Component {
   render() {
     const {profile} = this.props;
     const firstName = profile.user.trim().split(' ')[0];
     const skills = profile.skills.map((skill,index) => (
        <div className="p-3" key={index}>
            <i className="fa fa-check" />
              {skill}
        </div>
     ));//end map

     
     return (
       <div>
         <div className="row">
            <div className="col-md-12">
              <div className="card card-body bg-light mb-3">
                <h3 className="text-center text-info">{firstName}</h3>
                <p className="lead">{isEmpty(profile.bio) ? null : (<span>{profile.bio}</span>)}
                </p>
                <hr />
                
                <h3 className="text-center text-info">{isEmpty(profile.bio) ? null : (<span>{profile.bio}</span>)}</h3>
                <div className="row">
                  <div className="d-flex flex-wrap justify-content-center align-items-center">
                    {skills}
                  </div>
                </div>
              </div>
            </div>
          </div>
       </div>
     )
   }
 }

export default  ProfileAbout;