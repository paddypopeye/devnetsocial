import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';

class PostForm extends Component {
   constructor(props){
       super(props);
       this.state = {
        text: '',
        errors: {}
       }//end state

       this.onSubmit = this.onSubmit.bind(this);
       this.onChange = this.onChange.bind(this);
   }//end constructor   
   componentWillReceiveProps(newProps){
        if(newProps.errors){
            this.setState({ errors : newProps.errors })
        }//end setState
    }//end componentWillReceiveProps

   onSubmit(e){
       e.preventDefault();
       const { user }  = this.props.auth;
        
       const newPost = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
       }//end newPost
       this.props.addPost(newPost);
       this.setState({text: ' '})
    }//end onSubmit

   onChange(e){
       this.setState({[e.target.name]: e.target.value});
   }//end onChange 

  render() {
    const { errors } = this.state;
    return (
        <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing Interesting or feck off...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});//end mapStateToProps

export default connect(mapStateToProps, {addPost})(PostForm);