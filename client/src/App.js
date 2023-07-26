import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";

function App() {
  
  return (
    <div className="app">
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile/:userId" element={<ProfilePage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
