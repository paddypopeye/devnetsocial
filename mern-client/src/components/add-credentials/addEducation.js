import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import  TextFieldGroup from '../common/textFieldGroup';
import  TextAreaFieldGroup  from '../common/TextAreaFieldGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import  { addEducation }  from '../../actions/profileAction';

class AddEducation extends Component {
    constructor(props){
        super(props);
        this.state = {
            school: "",
            level:"",
            fieldofstudy:"",
            from:"",
            to :"",
            current:false,
            description: "",
            errors: {},
            disabled:""

        };//end state

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheck = this.onCheck.bind(this);
    }//end constructor

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            })//end setState
        }//end if
    }//end componentWillReceiveProps

    onSubmit(e){
        e.preventDefault();
        const educaInfo = {
            school: this.state.school,
            level: this.state.level,
            fieldofstudy: this.state.fieldofstudy,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        }//end experinfo

        this.props.addEducation(educaInfo, this.props.history);
    }//end Submit

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }//end onChange

    onCheck(e){
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        });//end setState
    }//end onCheck
    render(){
        const {errors} = this.state;
        
        return(
            <div className="add-education">
                 <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">Go Back</Link>
                            <h1 className="display-4 text-center">Add Education</h1>
                            <p className="lead text-center">Add some information</p>
                            <small className="d-block pb-3">required fields marked with an *</small>
                            <form onSubmit={this.onSubmit}>
                                    
                                    <TextFieldGroup 
                                        placeholder = "School"
                                        name="school"
                                        onChange={this.onChange}
                                        value={this.state.school}
                                        error={errors.school}
                                        info="School Information"
                                    />
                                    <TextFieldGroup 
                                        placeholder = "Degree"
                                        type = "text"
                                        name="level"
                                        onChange={this.onChange}
                                        value={this.state.level}
                                        error={errors.level}
                                        info="Degree Information"
                                    />
                                    
                                    <TextFieldGroup 
                                        placeholder = "Field of Study"
                                        name="fieldofstudy"
                                        onChange={this.onChange}
                                        value={this.state.fieldofstudy}
                                        error={errors.fieldofstudy}
                                        info="Studied Information"
                                    />
                                    <h6>From Date</h6>
                                    <TextFieldGroup 
                                        placeholder = "From Date"
                                        name="from"
                                        type="date"
                                        error={errors.from}
                                        info="From date Information"
                                        onChange = {this.onChange}
                                        value={this.state.from}
                                    />
                                    <h6>To Date</h6>
                                    <TextFieldGroup 
                                        placeholder = "To Date"
                                        name="to"
                                        type="date"
                                        value={this.state.to}
                                        error={errors.to} 
                                        info="To date information"
                                        onChange={this.onChange}
                                        disabled={this.state.disabled ? "disabled": ""}
                                    />
                                    <div className="form-check mb-4">
                                        <input type="checkbox" 
                                        className="form-check-input"
                                        name="current"
                                        value={this.state.current}
                                        checked={this.state.current}
                                        onChange={this.onCheck}
                                        id="current" />
                                        <label htmlFor="current" className="form-check-label">   
                                        Current Position</label>
                                    </div>

                                    <TextAreaFieldGroup 
                                        placeholder = "Description"
                                        name="description"
                                        value={this.state.description}
                                        error={errors.description}
                                        info="Description Information"
                                        onChange = {this.onChange}
                                    />
                                    <input type="submit" value="Submit"  className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                 </div>
            </div>
        )//end return
    }//end render
}//end class AddEducation

AddEducation.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addEducation: PropTypes.func.isRequired
}//end default props

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
})//end mapStateToProps

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));