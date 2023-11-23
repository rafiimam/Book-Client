import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home/home";
import About from "./routes/About/about";
import Header from "./components/Header";
import SingleBook from "./routes/Book/singleBook";
import Footer from "./components/Footer";
import Book from "./routes/Book/book";
import CreateBook from "./routes/Book/createBook";
import EditBooks from "./routes/Book/editBooks";

function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/books" element={<Book/>}/>
          <Route path="/books/:slug" element={<SingleBook/>}/>
          <Route path="/createbook" element={<CreateBook/>}/>
          <Route path="/editbook/:slug" element={<EditBooks/>}/>
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
