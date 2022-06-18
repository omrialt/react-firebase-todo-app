import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/Home/Layout/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoPage from "./pages/TodoPage";
import NotFound from "./pages/NotFound";

function App() {
  const logIn = localStorage.getItem("id");
  return (
    <Layout>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="user/:id/todoList"
          element={logIn ? <TodoPage /> : <NotFound />}
        />
      </Routes>
    </Layout>
  );
}

export default App;
