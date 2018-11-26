import React, {Component} from 'react';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import TextFieldGroup from '../common/textFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import {createProfile} from '../../actions/profileAction.js';

class CreateProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            bio: '',
            company: '',
            errors: {},
            githubusername: '',
            handle: '',
            location: '',
            status: '',
            skillset: '',
            website: '',
            displaySocialNets: false,
            twitter: '',
            facebook: '',
            linkedin: '', 
            youtube: '',
            instagram: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }//end if 
    }//end componentWillReceiveProps

    onSubmit(e){
        e.preventDefault();
        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            instagram: this.state.instagram,

            }//end profileData
            this.props.createProfile(profileData, this.props.history)
    }//end onSubmit

    

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        const { errors, displaySocialNets } = this.state;

        let socialInputs;

        if(displaySocialNets){
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder= "Twitter URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange = {this.onChange}
                        error = {errors.twitter}
                     />
                     <InputGroup
                        placeholder= "Facebook URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange = {this.onChange}
                        error = {errors.facebook}
                     />
                     <InputGroup
                        placeholder= "Instagram URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange = {this.onChange}
                        error = {errors.instagram}
                     />
                     <InputGroup
                        placeholder= "linkedIn URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange = {this.onChange}
                        error = {errors.linkedin}
                     />

                </div>
            )
        }//end if 
        //Select Options
        const options = [
            { label: "Select Job status", value: 0 },
            { label: "Developer", value: "Develeoper"},
            { label: "Junior Developer", value: "Jnr Developer"},
            { label: "Senior Developer", value: "Snr Develeoper"},
            { label: "Manager(Dickhead)", value: "Manager"},
            { label: "Instructor", value: "Instructor"},
            { label: "Intern(Slave)", value: "Itern"}
        ]
        
        return(
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9 m-auto">
                            <h1 className="display-4 text-center">Create Your Profile</h1>
                                <p className="lead text-center">
                                    Porfile information
                                </p>
                                <small className="d-block pb-3">Fields arked with * are required</small>

                                <form onSubmit={this.onSubmit}>
                                    <TextFieldGroup 
                                        placeholder = "* Profile Handler"
                                        name="handle"
                                        onChange={this.onChange}
                                        value={this.state.handle}
                                        errors={errors.handle}
                                        info="Handle for your profile URL.Full name, company name, nickname, etc...(This info CANNOT be changed later)"
                                    />
                                    <SelectListGroup
                                        placeholder = "Status"
                                        name="status"
                                        onChange={this.onChange}
                                        value={this.state.status}
                                        errors={errors.status}
                                        info="Your current job status"
                                        options = {options}

                                    />
                                    <TextFieldGroup 
                                        placeholder = "Company"
                                        name="company"
                                        onChange={this.onChange}
                                        value={this.state.company}
                                        errors={errors.company}
                                        info="Company Information"
                                    />
                                    <TextFieldGroup 
                                        placeholder = "website"
                                        name="website"
                                        value={this.state.website}
                                        errors={errors.website}
                                        info="Website Information"
                                        onChange = {this.onChange}
                                    />
                                    <TextFieldGroup 
                                        placeholder = "Location"
                                        name="location"
                                        onChange={this.onChange}
                                        value={this.state.location}
                                        errors={errors.location}
                                        info="Location Information"
                                    />
                                    <TextFieldGroup 
                                        placeholder = "Skills"
                                        name="skills"
                                        errors={errors.skills}
                                        info="Skills Information"
                                        onChange = {this.onChange}
                                        value={this.state.skills}
                                    />
                                    <TextFieldGroup 
                                        placeholder = "Github Username"
                                        name="githubusername"
                                        value={this.state.githubusername}
                                        errors={errors.githubusername}
                                        info="Gituhub Information for repository inclusion"
                                        onChange = {this.onChange}
                                    />
                                    <TextAreaFieldGroup 
                                        placeholder = "Bio"
                                        name="bio"
                                        value={this.state.bio}
                                        errors={errors.bio}
                                        info="Bio Information"
                                        onChange = {this.onChange}
                                    />
                                    <div className="mb-3">
                                        <button type="button" className="btn btn-dark" onClick = {() => {
                                            this.setState(prevState => ({
                                                displaySocialNets: !prevState.displaySocialNets
                                                }));
                                            }}>
                                        </button>
                                        <span className="text-muted">  Click to add Social network sites ..Optional</span>
                                            {socialInputs}
                                        <input className="btn btn-info btn-block mt-4" type="submit" value="Submit"></input>
                                    </div>
                                </form>
                        </div>
                    </div>
                </div>
            </div>
        )//end return 
    }//end render
};//End create profile

CreateProfile.propTypes = {
    profile: Proptypes.object.isRequired,
    errors: Proptypes.object.isRequired
}

const mapStateToProps = state =>({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile));