import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectDetails from "./pages/ProjectDetails";
import ProjectsView from "./pages/ProjectsView";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./admin/AdminLayout";
import AdminProjects from "./admin/AdminProjects";
import AdminProjectCreate from "./admin/AdminProjectCreate";
import AdminProjectEdit from "./admin/AdminProjectEdit";
import AdminSkills from "./admin/AdminSkills";
import AdminSkillForm from "./admin/AdminSkillForm";
import AdminTechnologies from "./admin/AdminTechnologies";
import AdminTechnologyForm from "./admin/AdminTechnologiesForm";
import AdminResumes from "./admin/AdminResume";
import AdminProfile from "./admin/AdminProfile";

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
      <Route
      path="/admin/login"
      element={<Login/>}
      />
      <Route
      element={<AdminRoute/>}
      >
        <Route
        element={<AdminLayout/>}
        >
          <Route
          path="/admin"
          element={<AdminDashboard/>}
          />
          <Route
            path="/admin/projects"
            element={<AdminProjects />}
          />
          <Route
            path="/admin/projects/create"
            element={<AdminProjectCreate />}
          />
          <Route
            path="/admin/projects/:id/edit"
            element={<AdminProjectEdit />}
          />
          <Route
            path="/admin/skills"
            element={<AdminSkills />}
          />
          <Route
              path="/admin/skills/create"
              element={<AdminSkillForm />}
          />

          <Route
              path="/admin/skills/:id/edit"
              element={<AdminSkillForm />}
          />
          <Route
          path="/admin/technologies"
          element={<AdminTechnologies />}
          />
          <Route
            path="/admin/technologies/create"
            element={<AdminTechnologyForm />}
          />
          <Route
            path="/admin/technologies/:id/edit"
            element={<AdminTechnologyForm />}
          />
          <Route
            path="/admin/resume"
            element={<AdminResumes />}
          />
          <Route
          path="/admin/profile"
          element={<AdminProfile />}
          />
        </Route>
        
      </Route>
      
      
    </Routes>
    </BrowserRouter>
  )
}

export default App;