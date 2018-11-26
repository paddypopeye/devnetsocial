import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/spinner';
import { getProfiles } from '../../actions/profileAction';
import ProfileItem from './ProfileItem';
class Profiles extends Component {
    componentDidMount(){
        this.props.getProfiles();
    }
    render(){
        const {profiles, loading} = this.props.profile;
        let profileItems;
        if(profiles === null || loading){
            profileItems = <Spinner />;
        }//end if
        else{
                if(profiles.length > 0){ 

                profileItems =  profiles.map(profile => 
                    (
                    <ProfileItem key={profile._id} profile={profile}/>
                    ))//end map()
                }//end if
                else{  
                    profileItems = <h4>No Profiles Found</h4>
                }//end else
            }//end else
        return (
            <div className="profiles">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Developer Profiles</h1>
                            <p className="lead text-center">Browse and connect with developers</p>
                                {profileItems}
                        </div>
                    </div>
                </div>
            </div> 
        )//end return 
    }//end render
}//end class Profiles

Profiles.propTypes = {
    profiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}//end default prop types

const mapStateToProps = state => ({
    profile: state.profile
})//end mapStateToProps
export default connect(mapStateToProps, { getProfiles, ProfileItem })(Profiles);