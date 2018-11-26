import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; 
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileGithub from  './ProfileGithub';
import ProfileCreds from './ProfileCreds';
import Spinner from '../common/spinner';
import { getProfileByHandle } from '../../actions/profileAction';

class Profile extends Component {
    componentDidMount(){
        if(this.props.match.params.handle){
            this.props.getProfileByHandle(this.props.match.params.handle);
        }//end if
    }//end componentDidMount

    componentWillReceiveProps(nextProps){
        if(nextProps.profile.profile === null && this.props.profile.loading){
            this.props.history.push('/not-found');
        }
    }
    render() {
    const {profile, loading} = this.props.profile;
    let profileContent;

    if(profile === null || loading){
        profileContent = <Spinner />
    }else{
        profileContent = (
            <div>
                <div className="row" >
                    <div className="col-md-6" >
                        <Link to="/profiles" className="btn btn-light mb-3 float-left">
                            Back to Profiles
                        </Link>
                    </div>
                    <div className="col-md-6 " />
                </div>
                <ProfileHeader  profile={profile} />
                <ProfileAbout  profile={profile}/>
                <ProfileCreds experience={profile.experience} education={profile.education}/>
                {!profile.githubusername || profile.githubusername === 'username' || profile.githubusername === '' ? null:(<ProfileGithub username={profile.githubusername}/> ) } 
            
            </div>
        )
    }
    return (
      <div className="profile">
            <div className="row">
                <div className="col-md-12">
                    {profileContent}
                </div>
            </div>
        </div>
    )//end return
  }//end return 
}//end class Profile

Profile.protoTypes = {
    profile: PropTypes.object.isRequired,
    getProfileByHandle: PropTypes.func.isRequired
}//end default proptypes

const mapStateToProps = state => ({
    profile: state.profile
})//end mapStateToProps

export default connect(mapStateToProps, { getProfileByHandle })(Profile);