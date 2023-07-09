import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { SignUp, StarsCanvas, Login } from "./components";
import { Context } from "./context/Context";
function App() {
  const { user } = useContext(Context);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signup">
          <div className="relative z-0 bg-primary">
            <div className="relative z-0">
              <SignUp />
              <StarsCanvas />
            </div>
          </div>
        </Route>

        <Route path="/login">
          {/* {user ? (
            <div className="relative z-0 bg-primary">
              <div className="relative z-0">
                <SignUp />
                <StarsCanvas />
              </div>
            </div>
          ) : ( */}
          <div className="relative z-0 bg-primary">
            <div className="relative z-0">
              <Login />
              <StarsCanvas />
            </div>
          </div>
          {/* )} */}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
