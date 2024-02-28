import { useReducer } from "react";

export default function PersonBio() {
  const initialState = {
    name: "Mason Betha",
    age: 51,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "increment-age":
        return {
          age: state.age + 1,
        };
      default:
        console.log("action type not found");
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <button onClick={() => dispatch({ type: "increment-age" })}>Change age</button>
      <p>Name: </p>
      <p>Age: {state.age}</p>
    </>
  );
}
