import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blog) => {
      setBlogs(blog);
    });
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // e.target.reset();
  //   console.log("i am clicked", { userName, password });
  //   setPassword("");
  //   setUserName("");
  // };
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      console.log({ user });
      setUser(user);
      setUserName("");
      setPassword("");
    } catch (exception) {
      console.log("wrong details");
    }
  };

  ///helper function

  const login = () => {
    return (
      <div>
        <h1>Log in to application</h1>

        <form action="" onSubmit={handleLogin}>
          <div className="input">
            <span> UserName </span>
            <input
              type="text"
              name={username}
              value={username}
              onChange={({ target }) => setUserName(target.value)}
            />
          </div>
          <div>
            <span> Password </span>
            <input
              type="password"
              name={password}
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  };

  return (
    <div>
      {user === null ? (
        login()
      ) : (
        <div>
          <h2>blogs</h2>
          <p>{console.log(user)}</p>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
