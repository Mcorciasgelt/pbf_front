import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Panel from "./pages/Panel"
import Register from "./pages/Register";
import PrivateRoute from "./routes/PrivateRoute";
import Miembros from "./pages/Miembros";
import NuevoMiembro from "./pages/NuevoMiembro"
import Navbar from "./components/Navbar";
import EditarMiembro from "./pages/EditarMiembro";
import VistaLista from "./pages/VistaLista";
import NuevaTarea from "./pages/NuevaTarea";
import EditarTarea from "./pages/EditarTarea";


function App() {
  return (
    <>

    <Navbar />
    <Routes>
      <Route path="/" element={<Login />} />
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

        <Route 
        path="/nuevo-miembro"
        element={
          <PrivateRoute>
            <NuevoMiembro />
          </PrivateRoute>
        }/>

        <Route 
        path="/editar-miembro/:id"
        element={
          <PrivateRoute>
            <EditarMiembro />
          </PrivateRoute>
        }/>

        <Route 
        path="/vistas"
        element={
          <PrivateRoute>
            <VistaLista />
          </PrivateRoute>
        }/>

        <Route 
        path="/nueva-tarea"
        element={
          <PrivateRoute>
            <NuevaTarea />
          </PrivateRoute>
        }/>

        <Route 
        path="/editar-tarea/:id"
        element={
          <PrivateRoute>
            <EditarTarea />
          </PrivateRoute>
        }/>

    </Routes>

    </>
  );
}

export default App
