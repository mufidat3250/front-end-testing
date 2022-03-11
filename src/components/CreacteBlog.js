
export default function BlogForm({ handleAddBlog, handleChange, newBlog }) {
  // console.log(newBlog, "child component");
  return (
    <>
      <form onSubmit={handleAddBlog}>
        <div>

          title{" "}
          <input
            id="title"
            type="text"
            name="title"
            value={newBlog.title}
            onChange={handleChange}
          />
        </div>
        <div>
          author:{" "}
          <input
            id="author"
            type="text"
            name="author"
            value={newBlog.author}
            onChange={handleChange}
          />
        </div>
        <div>
          url:{" "}
          <input
            type="text"
            name="url"
            value={newBlog.url}
            onChange={handleChange}
            id="url"
          /> <br/>
          <button id="create" type="submit">create</button>
        </div>
      </form>
    </>
  );
}
// BlogForm.prototypes