import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Panel from "./pages/Panel"
import Register from "./pages/Register";
import PrivateRoute from "./routes/PrivateRoute";
import Miembros from "./pages/Miembros";



function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route 
        path="/panel"
        element={
          <PrivateRoute>
            <Panel />
          </PrivateRoute>
        }/>

      <Route 
        path="/miembros"
        element={
          <PrivateRoute>
            <Miembros />
          </PrivateRoute>
        }/>
    </Routes>
  );
}

export default App
