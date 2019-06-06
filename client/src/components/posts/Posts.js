import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts, addPost } from '../../actions/post';

const Posts = ({ getPosts, addPost, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
    const socket = openSocket('http://localhost');
    socket.on('posts', data => {
      if (data.action === 'create') {
        console.log(data.post);
        addPost(data.post);
      } else if (data.action === 'delete') {
        getPosts();
      }
    });
  }, [posts.length]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome to the community
      </p>
      <PostForm />
      {posts[0] !== false && (
        <div className='posts'>
          {posts.map(post => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      )}
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts, addPost }
)(Posts);
