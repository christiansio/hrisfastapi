import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/auth/AuthContext";
import ProtectedRoute from "@/auth/ProtectedRoute";
import DashboardPage from "@/pages/DashboardPage";
import RequestsPage from "@/pages/RequestsPage";
import AppPage from "@/pages/AppPage";
import Login from "@/pages/Login";
import './App.css'

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<ProtectedRoute />}>
        <Route element={<AppPage />}>
          <Route index element={<DashboardPage />} />
          <Route path="requests/*" element={<RequestsPage />} />
        </Route>
      </Route>
        
        </Routes>
    </AuthProvider>
  );
};

export default App;

// function App() {

//   return (
//     <Router>
//         <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="/" element={<AppPage />} />
//         </Routes>
//     </Router>
//   );
// }

// export default App
