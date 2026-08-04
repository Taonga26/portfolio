import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectDetails from "./pages/ProjectDetails";
import ProjectsView from "./pages/ProjectsView";

function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route
      path="/"
      element={<Home/>}
      />
      <Route
      path="/project/:id"
      element={<ProjectDetails/>}
      />
      <Route
      path="/projects"
      element={<ProjectsView/>}
      />
      
    </Routes>
    </BrowserRouter>
  )
}

export default App;