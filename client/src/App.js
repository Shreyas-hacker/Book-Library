import {BrowserRouter, Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/addBook" element={<AddBook/>}/>
        <Route path="/editBook/:id" element={<EditBook/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
