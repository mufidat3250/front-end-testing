export const allblogs = (action) => {
  return {
    type: "ALL_BLOG",
  };
};

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case "ALL_BLOG":
      return [...state];
  }
};

export default blogsReducer;
