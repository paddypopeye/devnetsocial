import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import  Moment  from 'react-moment';
import { deleteExperience } from '../../actions/profileAction';

class Experience extends Component{
    onDeleteClick(id){
        this.props.deleteExperience(id);
    }
    render(){
        const experience = this.props.experience.map(exp => (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>
                 <Moment format="YYYY/MM/DD">{exp.from}</Moment> - 
                    {
                        exp.to === null ? (' Now'):(
                         <Moment format="YYYY/MM/DD">{exp.to}</Moment>)
                    }
                </td>
                <td><button onClick={this.onDeleteClick.bind(this, exp._id)} className="btn btn-danger">Delete</button></td>

            </tr>
        ))//end map()
        return(
            <div>
                 <h4 className="mb-4">Experience Information</h4>
                   <table className="table">
                      <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Years</th>
                            <th></th>
                        </tr>
                            {experience}
                        </thead>
        </table>
      </div>
        )//end return
    }//end render
}//end class Experience

Experience.propTypes = {

    deleteExperience : Proptypes.func.isRequired
}

export default connect(null, { deleteExperience })(Experience);