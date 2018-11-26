import React, { Component } from 'react';
import Moment from 'react-moment';


class ProfileCreds extends Component {
    render() {
     const { experience, education } = this.props;
     const experItems = experience.map(exp => (
        
        <li key={exp._id} className="list-group-item" >
          <h4>{exp.company}</h4>
          <p>
            <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
            {exp.to === null ? ' Now' : (<Moment format="YYYY/MM/DD">{exp.from}</Moment>)}
          </p>
          <p><strong>Position:</strong>{exp.title}</p>
          <p>
            {exp.location === '' ? null : (<span><strong>Location:</strong>{exp.location}</span>)}
          </p>
          <p>
            {exp.description === '' ? null : (<span><strong>Description:</strong>{exp.description}</span>)}
          </p>
        </li>
      ));//end experItems
      
      const eduItems = education.map((edu) => (
        <li key={edu._id} className="list-group-item" >
          <h4>{edu.school}</h4>
          <p>
            <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
            {edu.to === null ? ' Now' : (<Moment format="YYYY/MM/DD">{edu.from}</Moment>)}
          </p>
          <p><strong>School:</strong>{edu.school}</p>
          <p><strong>Studied:</strong>{edu.fieldofstudy}</p>
          <p>
            {edu.location === '' ? null : (<span><strong>Location:</strong>{edu.location}</span>)}
          </p>
          <p>
            {edu.description === '' ? null : (<span><strong>Description:</strong>{edu.description}</span>)}
          </p>
        </li>
      ));//end eduItems

     return (
        <div>
         <div className="row">
            <div className="col-md-6">
              <h3 className="text-center text-success">
                {eduItems.length > 0 ? (<ul className="list-group">{eduItems}</ul>) : (<p className="text-center">No Education Information</p>)}
              </h3>
            </div>
        </div>
        <div className="col-md-6">
            <h3 className="text-center text-info">
              {experItems.length > 0 ? (<ul className="list-group">{experItems}</ul>) : (<p className="text-center">No Experience Information</p>)}
            </h3>
          </div>
       </div>
     
     )//end return
   }
 }

export default  ProfileCreds;