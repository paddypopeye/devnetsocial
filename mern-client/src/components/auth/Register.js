import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/textFieldGroup';

class Register extends Component{
    constructor(){
        super();
        this.state = {
            name: '',
            email:'',
            password:'',
            password2:'',
            errors: {}
        };//end this.state
        
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };//end class Register

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/login')

        }
        
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({ errors: nextProps.errors })
        }
    }
    
    onChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })//end onChange
    };//end onChange

    onSubmit(e){
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };//end newUser
        this.props.registerUser(newUser, this.props.history);
        
        
    }//end onSubmit

    render(){
      const {errors} = this.state;
      return(
    <div className="signup">
    <div className="register">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Sign Up</h1>
                    <p className="lead text-center">Create your Devel'd-In account</p>
                        <form onSubmit={ this.onSubmit } >
                            < TextFieldGroup 
                                name="name"
                                placeholder="Name" 
                                value={this.state.name} 
                                onChange={this.onChange}
                                error={errors.name}
                            />
                            < TextFieldGroup 
                                type="email" 
                                name="email"
                                placeholder="Email Address" 
                                value={this.state.email} 
                                onChange={this.onChange}
                                error={errors.email}
                                info="Some message blah blah blah"
                            />
                            < TextFieldGroup 
                                type="password" 
                                name="password"
                                placeholder="Password" 
                                value={this.state.password} 
                                onChange={this.onChange}
                                error={errors.password}
                            />
                            < TextFieldGroup 
                                type="password" 
                                name="password2"
                                placeholder="Password Confirm" 
                                value={this.state.password2} 
                                onChange={this.onChange}
                                error={errors.password2}
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

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps,{registerUser})(withRouter(Register));