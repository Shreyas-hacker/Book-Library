import {BrowserRouter, Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import AuthorForm from "./Authors/AuthorForms";

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/addBook" element={<AddBook/>}/>
        <Route path="/editBook/:id" element={<EditBook/>}/>
        <Route path="/author/:name" element={<AuthorForm/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
