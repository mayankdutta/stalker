import "./App.css";
import NavBar from "./components/navbar/index.jsx";
import HomePage from "./containers/HomePage/index.jsx";
import UserPage from "./containers/UserPage/index.jsx";

function App() {
  return (
    <div className="h-screen">
      <NavBar />
      <UserPage />
    </div>
  );
}

export default App;
