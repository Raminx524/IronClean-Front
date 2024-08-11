import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PageLayout from "./components/ui/PageLayout";
import CleanersPage from "./pages/CleanersPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="cleaners" element={<CleanersPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
