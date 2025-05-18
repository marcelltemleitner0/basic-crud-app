import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Table from "./Table";
import Alldata from "./Alldata";
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="container text-center">
    <div className="d-flex flex-column gap-3 align-items-center">
      <button className="btn btn-primary w-auto px-4" onClick={() => navigate("/table")}>
        table
      </button>
      <button className="btn btn-primary w-auto px-4" onClick={() => navigate("/alldata")}>
        table
      </button>
    </div>
    </div>
    </div>



  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<Table />} />
         <Route path="/alldata" element={<Alldata />} />
      </Routes>
    </BrowserRouter>
  );
}
