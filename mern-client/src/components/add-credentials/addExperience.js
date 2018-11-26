import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import  TextFieldGroup from '../common/textFieldGroup';
import  TextAreaFieldGroup  from '../common/TextAreaFieldGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import  { addExperience }  from '../../actions/profileAction';

class AddExperience extends Component {
    constructor(props){
        super(props);
        this.state = {
            company: "",
            location:"",
            from:"",
            to :"",
            current:false,
            description: "",
            title:"",
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
        const experInfo = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        }//end experinfo

        this.props.addExperience(experInfo, this.props.history);
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
            <div className="add-experience">
                 <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">Go Back</Link>
                            <h1 className="display-4 text-center">Add Experience</h1>
                            <p className="lead text-center">Add some information</p>
                            <small className="d-block pb-3">required fields marked with an *</small>
                            <form onSubmit={this.onSubmit}>
                                    
                                    <TextFieldGroup 
                                        placeholder = "Company"
                                        name="company"
                                        onChange={this.onChange}
                                        value={this.state.company}
                                        error={errors.company}
                                        info="Company Information"
                                    />
                                    <TextFieldGroup 
                                        placeholder = "Title"
                                        name="title"
                                        onChange={this.onChange}
                                        value={this.state.title}
                                        error={errors.title}
                                        info="Title Information"
                                    />
                                    
                                    <TextFieldGroup 
                                        placeholder = "Location"
                                        name="location"
                                        onChange={this.onChange}
                                        value={this.state.location}
                                        error={errors.location}
                                        info="Location Information"
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
                                        placeholder = "Job Description"
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
}//end class addExperience

AddExperience.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addExperience: PropTypes.func.isRequired
}//end default props

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
})//end mapStateToProps

export default connect(mapStateToProps, { addExperience })(withRouter(AddExperience));