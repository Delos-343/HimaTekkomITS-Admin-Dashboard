import { Routes, Route } from "react-router-dom";
import { NewsApp } from "./pages";
import { AddNews, EditNews } from "./components/newsapp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NewsApp /> } />
        <Route path="/add" element={<AddNews /> } />
        <Route path="edit/:id" element={<EditNews /> } />
      </Routes>
    </>
  );
}

export default App;