import { Routes, Route } from "react-router-dom";
import { HomePage, NewsApp } from "./pages";
import { AddUser, EditUser } from "./components/newsapp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage /> } />
        <Route path="/news" element={<NewsApp /> } />
        <Route path="/add" element={<AddUser /> } />
        <Route path="edit/:id" element={<EditUser /> } />
      </Routes>
    </>
  );
}

export default App;