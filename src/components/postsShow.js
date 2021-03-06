import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchContent, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount(){
        this.props.fetchContent(this.props.params.id)
    }

    onDeleteClick(){
        this.props.deletePost(this.props.params.id)
            .then(()=>{
                this.context.router.push('/');
            });
    }

    render(){
        const {post} = this.props;

        if(!post){
            return <div>Loading...</div>
        }
        return(
            <div>
                <Link to='/'><button className='btn btn-primary'>Back</button></Link>
                <button className='btn btn-danger pull-xs-right'
                onClick={this.onDeleteClick.bind(this)}>
                    Delete
                </button>
                <h3>{post.title}</h3>
                <h5>Categories: {post.categories}</h5>
                <p>{post.content}</p>
                
            </div>
        )
    }
}

function mapStateToProps(state){
  return{post: state.posts.post}
}

export default connect(mapStateToProps, {fetchContent, deletePost})(PostsShow);

