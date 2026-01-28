import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import LoginPage from "./pages/LoginPage";
import ShopPage from "./pages/ShopPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./layout/ProtectedRoute";
import { FractoDevTools } from "fractostate/devtools";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={
              <Layout>
                <ShopPage />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <ProfilePage />
              </Layout>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <FractoDevTools />
    </BrowserRouter>
  );
}

export default App;
