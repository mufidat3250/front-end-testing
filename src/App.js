import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/notification";
import CreateBlog from "./components/CreacteBlog";
import Togglable from "./components/togglable";

// import LoginForm from "./components/loginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [newBlog, setNewBLog] = useState({ title: "", author: "", url: "" });
  const [users, setUsers] = useState([]);

  //dynamic style
  console.log(user);
  console.log(blogs);

  useEffect(() => {
    blogService.getAll().then((blog) => {
      setBlogs(blog);
    });
  }, []);

  useEffect(() => {
    blogService.getA().then((users) => {
      setUsers(users);
    });
  }, []);

  console.log(users, "i love coding");
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setSuccess("correct details");
      setUserName("");
      setPassword("");
      setTimeout(() => {
        setSuccess(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage("Wrong userName or Password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  console.log(blogs);
  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      let user = await blogService.create({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
      });
      setBlogs([...blogs, user]);
      setSuccess(`${user.title} ${user.author} added`);
      setTimeout(() => {
        setSuccess(null);
      }, 5000);
    } catch (error) {
      console.log(error);
    }

    setNewBLog({ title: "", url: "", author: "" });
  };

  const addLikes = async (id, blogObject) => {
    // console.log({id, blogObject})
    try {
      const newBlogUpdate = await blogService.update(id, blogObject);
      setBlogs((prev) => {
        return prev.map((blog) => {
          return blog.id.toString() === id ? newBlogUpdate : blog;
        });
      });
    } catch (error) {
      console.log("something went wrong");
    }
  };

  const handleDelete = async (blogObject) => {
    try {
      if (
        window.confirm(
          `Remove blog ${blogObject.title} by ${blogObject.author}`
        )
      ) {
        await blogService.remove(blogObject.id);
        setBlogs((prev) => prev.filter((blog) => blog.id !== blogObject.id));
      }
    } catch (error) {
      setErrorMessage("Something went wrong");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleChange = ({ target }) => {
    setNewBLog({ ...newBlog, [target.name]: target.value });
  };

  ///helper function

  const login = () => {
    return (
      <div>
        <h1 id="Log">Log in to application</h1>
        <form action="" onSubmit={handleLogin}>
          <div className="input">
            <span> UserName </span>
            <input
              id="username"
              type="text"
              name={username}
              value={username}
              onChange={({ target }) => setUserName(target.value)}
            />
          </div>
          <div>
            <span> Password </span>
            <input
              id="password"
              type="password"
              name={password}
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" id="login-button">
            login
          </button>
        </form>
      </div>
    );
  };

  return (
    <div>
      <Notification message={errorMessage} success={success} />

      {user === null ? (
        <Togglable buttonlabel="Login">{login()}</Togglable>
      ) : (
        <div>
          <h2 className="blogs"> blogs</h2>
          <h4>
            {user.name} is logged in{" "}
            <button onClick={handleLogout}>logout</button>
          </h4>

          <h1>Create New Blog </h1>

          <h1>users</h1>
          <table>
            <tr>
              <th></th>
              <th>Blog created</th>
            </tr>
            {users.map((user, index) => {
            // console.log(user.user[0].username, "user");
              return (
                <div key={`user${index}`}>

                  <tr>
                    <td>{user.username}</td> <td>{user.blog.length}</td>
                  </tr>
                </div>
              );
            })}
          </table>
          <Togglable buttonlabel="create new blog">
            <CreateBlog
              newBlog={newBlog}
              handleAddBlog={handleAddBlog}
              handleChange={handleChange}
            />
          </Togglable>

          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => {
              return (
                <Blog
                  key={blog.id}
                  blog={blog}
                  handleBlogUpdate={addLikes}
                  handleDelete={handleDelete}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default App;
