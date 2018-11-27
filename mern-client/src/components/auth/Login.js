import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import  TextFieldGroup  from '../common/textFieldGroup';

class Login extends Component{
    constructor(){
        super();
        this.state = {
            email:'',
            password:'',
            errors: {}
        };
        
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };
    onChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })//end onChange
    };//end onChange
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }//end if
        if(nextProps.errors){
              this.setState({
                errors: nextProps.errors})
        }//end if
    }
    
    onSubmit(e){
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        };//end newUser
        this.props.loginUser(user);
    };//end onSubmit

    render(){
        const { errors } = this.state;
        return(
        <div className='login'>
            <div className="login">
                <div className="container">
                  <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Log In</h1>
                        <p className="lead text-center">Sign in to your Devel'd-In account</p>
                        <form noValidate onSubmit={this.onSubmit} >
                            < TextFieldGroup 
                                type="email" 
                                name="email"
                                placeholder="Email Address" 
                                value={this.state.email} 
                                onChange={this.onChange}
                                error={errors.email}
                            />
                            
                            < TextFieldGroup 
                                type="password" 
                                name="password"
                                placeholder="Password Address" 
                                value={this.state.password} 
                                onChange={this.onChange}
                                error={errors.password}
                                info="Password"
                            />
                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )//end return
    }//end render
}//end class Login

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors   
});
export default connect(mapStateToProps,{loginUser})(Login);