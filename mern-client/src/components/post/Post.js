import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/spinner';
import { getPost } from '../../actions/postActions';
import PostItem from '../posts/PostItem';
import { Link } from 'react-router-dom';
import  CommentForm from './CommentForm';
import  CommentFeed from './CommentFeed';

class Post extends Component {
    componentDidMount(){
        this.props.getPost(this.props.match.params.id)
    }//end componentDidMount
  render() {
    const { post, loading } = this.props.post;
    let postContent;

    ( post === null || loading || Object.keys(post).length === 0)
    ?postContent = <Spinner />
     :postContent = (<div>
         <PostItem post={post} showActions={false} />
         <CommentForm postId={post._id} />
         <CommentFeed postId={post._id} comments={post.comments} />
         </div>);
    //end postContent
    
    return (
        <div className="post">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Link to="/feed" className="btn btn-light mb-3">
                            Back to Posts feed
                        </Link>
                        {postContent}
                    </div>
                </div>
            </div>
        </div>
    )//end return
  }//end render
}//end class Post

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})//end mapStateToProps

export default connect(mapStateToProps, {getPost})(Post);