import { createContext, useReducer } from "react";

export const RenderContext = createContext({
  rendered: false,
  setRerender: () => {},
});

export const Actions = {
  SET_RE_RENDER: "SET_RE_RENDER",
};

const renderReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case Actions.SET_RE_RENDER:
      return {
        ...state,
        rendered: payload,
      };
    default:
      throw new Error(`Error  in ${type} found in Reducer`);
  }
};

const initialRender = {
  rendered: false,
};

export const ProvideRender = ({ children }) => {
  const [{ rendered }, dispatch] = useReducer(renderReducer, initialRender);
  const setRerender = (bool) => {
    dispatch({ type: Actions.SET_RE_RENDER, payload: bool });
  };

  const value = { rendered, setRerender };

  return (
    <RenderContext.Provider value={value}>{children}</RenderContext.Provider>
  );
};
