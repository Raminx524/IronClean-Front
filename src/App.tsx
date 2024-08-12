import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PageLayout from "./components/ui/PageLayout";
import CleanersPage from "./pages/CleanersPage";

import Auth from "./pages/AuthPage";

import CleanerDetailsPage from "./pages/CleanerDetailsPage";
import Profile from "./pages/ProfilePage";
import AboutPage from "./pages/About";

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
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
