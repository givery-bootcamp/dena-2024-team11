import { AppRoute } from "./AppRoute";
import { useState } from "react";

import "./App.scss";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import { APIService } from "../shared/services";

function App() {
  const user = useAppSelector(state => state.login.user)
  console.log("user:", user)
  return (
    <div className="app-root">
      <header className="app-header">
        <div>Srack</div>
        {user.id == -1 ? <SignInBlock/> : <LoginedUserBlock icon={user.icon}/>}
      </header>
      <main className="app-body">
        <AppRoute />
      </main>
    </div>
  );
}

function SignInBlock() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch(APIService.loginBoard({userId: userId, password: password}));
    setUserId("");
    setPassword("");
  }

  return (
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-input-form">
          <div className="login-input-container">
            <input className="login-input"
              type="text" 
              value={userId} 
              placeholder="User ID" 
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="login-input-container">
            <input className="login-input"
              type="text" 
              value={password} 
              placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="signin-button" type="submit">Sign In</button>
      </form>
  );
}

function LoginedUserBlock({icon}: {icon: string}) {
  return (
    <div>
      <img className="login-icon-image" src={icon}></img>
    </div>
  )
}

export default App;
