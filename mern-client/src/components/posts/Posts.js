import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import Spinner from '../common/spinner';
import { getPosts } from '../../actions/postActions';

class Posts extends Component {
  
  componentDidMount(){
    this.props.getPosts();
  }//end componentDidMount

  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    (posts === null||loading)  ? postContent = (<Spinner />)
    :postContent = (<PostFeed posts={posts} />)
    // if (posts === null || loading){
    //   postContent = <Spinner />

    // }//end if 
    // else{
    //   postContent = <PostFeed posts={posts}/>
    // }//end else

    return (
  <div className="feed">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <PostForm />
          {postContent}
        </div>
      </div>
    </div>
  </div>
    )//end return 
  }
}

Posts.protoTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
}//end prop types

const mapStateToProps = state => ({
  post: state.post
});//end mapStateToProps

export default connect(mapStateToProps, {getPosts})(Posts);