import React, { useState } from 'react';
import PostItem from './PostItem';

const PostsList = (props) => {
    const [searchPost, setSearchPost] = useState({ id: '', title: '' });

    //פונקציה לפלט חיפוש
    const handleSearchChange = (e) => {
        setSearchPost({
            ...searchPost,
            [e.target.name]: e.target.value,
        });
    };
    // פונקציה שתעטוף את כל המשימות בתוך חיפוש
    const searchPosts = (posts) => {
        return posts.filter((post) => {
            return (
                post.id.toString().includes(searchPost.id) &&
                post.title.toLowerCase().includes(searchPost.title.toLowerCase())
            );
        });
    };

    const myposts = searchPosts(props.posts);
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-3">
                    <div className="mb-3">
                        <label htmlFor="searchId">Search by id:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by id"
                            value={searchPost.id}
                            onChange={handleSearchChange}
                            name="id"
                            id="searchId"
                        />
                    </div>
                    <label className="mb-2" htmlFor="searchTitle">Search by title:</label>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchPost.title}
                            onChange={handleSearchChange}
                            name="title"
                            id="searchTitle"
                        />
                    </div>
                </div>
                <ul className="todo-list">
                    <div className="col-md-9">
                        {myposts.map((post) => (
                            <PostItem
                                key={post.id}
                                post={{ ...post }}
                                deletePost={() => props.deletePost(post.id)}
                                updatePost={props.updatePost}
                            />
                        ))}
                    </div>
                </ul>
            </div>
        </div >
    );
};

export default PostsList;