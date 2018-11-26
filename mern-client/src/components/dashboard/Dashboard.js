import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount  } from '../../actions/profileAction';
import Spinner from '../common/spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {
    componentDidMount(){
        this.props.getCurrentProfile();
    }
    onDeletelClick(e){
        this.props.deleteAccount();
    }
    render(){
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;
        let dashboardContent;
        if( profile === null || loading ===  true ){
            dashboardContent = < Spinner />
        }else{
            if(Object.keys(profile).length > 0){
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`} >{user.name}</Link></p>
                        <ProfileActions />
                        <Experience experience={ profile.experience }/>
                        <Education education={ profile.education }/>
                        <button onClick={this.onDeletelClick.bind(this)} className="btn btn-danger">
                        Delete Account</button>          
                    </div>
                    
                )
            }else{
                dashboardContent = (
                    <div className="lead text-muted">
                        Welcome { user.name }
                        <p>You have to set up a profile</p>
                    <Link to="/create-profile" className="btn btn-lg btn-info">Create a Profile</Link>

                    </div>
                )
            }
        }
        
        return(
            <div className='dashboard'>
                <div className='container'>
                    <div className='row'>
                        <div className="col-md-12">
                            <h1 className='display-4'>Dashboard.. </h1>
                                { dashboardContent }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
  });//end mapStateToProps

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)