import { render, screen,  } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import BlogForm from "./CreacteBlog";

describe("<Blog/>", () => {
  let container;
  beforeEach(() => {
    const blog = {
      title: "ayantola",
      author: "mubashir",
      likes: 0,
      url: "http://localhost:3001/api/blogs",
    };
    const handleBlogUpdate = jest.fn();
    // const handleToggle = jest.fn();
    container = render(
      <Blog blog={blog} handleBlogUpdate={handleBlogUpdate} />
    ).container;
  });

  test("render author and title", () => {
    const p = container.querySelector(".title-author");
    expect(p).toHaveTextContent("ayantola");
    expect(p).not.toHaveTextContent("http://localhost:3001/api/blogs");
  });

  test("show blogUrl and number of likes", () => {
    const viewButton = screen.getByText("view");
    userEvent.click(viewButton);
  });

  test("like button clicked twice", () => {
    // const div = container.querySelector(".url-likes");
    const likeButton = screen.getByText("like");
    userEvent.click(likeButton);
    // expect(handleBlogUpdate.mock.calls).toHaveLength(1)
  });
});

describe("<BlogForm>", () => {
  const createBlog = jest.fn();
  const handleChange = jest.fn();
  const newBlog = jest.fn();
  render(
    <BlogForm
      const
      handleAddBlog={createBlog}
      handleChange={handleChange}
      newBlog={newBlog}
    />
  );
  const input = screen.getAllByRole("textbox");
  const createBTN = screen.getByText("create");

  userEvent.type(input[0], "ayantola");
  userEvent.click(createBTN);
  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].content).toBe("ayantola");
});
