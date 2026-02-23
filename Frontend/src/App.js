import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./Components/Home";
import { Create } from "./Components/Create";
import { Edit } from "./Components/Edit";
import { View } from "./Components/View";

import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      
<nav className="navbar navbar-expand-lg bg-dark navbar-dark ">
        <div className="container-fluid">
         
         
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/Create">
                  Create
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/Edit/:productId" element={<Edit />} />
        <Route path="/View/:productId" element={<View />} />
      </Routes>
    </>
  );
}

export default App;
