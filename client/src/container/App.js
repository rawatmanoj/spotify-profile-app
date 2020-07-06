import React, { useContext, useEffect } from "react";
import Home from "../Components/Home/Home";
import { token } from "../spotify/spotify";
import Login from "../Components/Login/login";
import { Context } from "../store/store";

const App = () => {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    dispatch({ type: "TOKEN", payload: token });
  }, [dispatch]);

  return (
    <div className="app-container"> {state.token ? <Home /> : <Login />} </div>
  );
};

export default App;
