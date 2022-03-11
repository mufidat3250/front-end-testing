import React, { useState } from "react";
const Blog = ({ blog , handleBlogUpdate, handleDelete }) => {

  const [blogUpdate, setBlogUpdate] = useState(blog);
  const { title, author,  url, id } = blog;
  const [ view, setView ] = useState(false);
  const showWhenVisible = { display: view ? "":"none" };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const buttonlabel =view ? "hide" : "view";
  const handleToggle = () => {
    setView((prev) => !prev);
  };

  const handleUpdate = () => {
    const updatedBlog ={
      ...blog,
      likes: blog.likes++
    };
    // console.log(blog.id)
    handleBlogUpdate(id, updatedBlog);
    setBlogUpdate(updatedBlog);
  };

  const handle_delete =() => {
    handleDelete(blog);

  };
  console.log(blog.title, blog.url);
  // console.log(blog)
  // console.log('i am the new update',blogUpdate.likes)
  return (
    <div style={blogStyle}>

      <p id="title-author">
        {title} {author}   <button id="view" onClick={handleToggle}>{buttonlabel}</button>
      </p>

      <div className="url-likes" style={showWhenVisible}>
        <p>  {title} {author}</p>
        <p> url:{url}</p>
        <p> likes: {blogUpdate.likes}
          <button id='like' onClick={() => handleUpdate()}>like</button></p>
        <br/>
        <button id='delete' onClick={ handle_delete }>
                delete
        </button>
      </div>




    </div>
  );
};

export default Blog;
