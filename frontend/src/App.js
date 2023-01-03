import { useState } from "react";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./components/DashBoard";

function App() {
  const [token, setToken] = useState("");
  return (
    <div className="App">
      <BrowserRouter>
        <Header setToken={setToken} />
        <Routes>
          <Route
            path="/"
            element={<Content setToken={setToken} token={token} />}
          ></Route>
          <Route
            path="/dashboard"
            element={<DashBoard setToken={setToken} token={token} />}
          ></Route>
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
