import { AppRoute } from "./AppRoute";

import "./App.scss";

function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        Srack
        <form>
          <input></input>
          <input></input>
          <button>Sign In</button>
        </form>
      </header>
      <main className="app-body">
        <AppRoute />
      </main>
    </div>
  );
}

export default App;
