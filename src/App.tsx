import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PageLayout from "./components/ui/PageLayout";
import CleanersPage from "./pages/CleanersPage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="cleaners" element={<CleanersPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
