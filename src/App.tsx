import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PageLayout from "./components/ui/PageLayout";
import CleanersPage from "./pages/CleanersPage";
import CleanerDetailsPage from "./pages/CleanerDetailsPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="cleaners">
            <Route index element={<CleanersPage />} />
            <Route path=":id" element={<CleanerDetailsPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
