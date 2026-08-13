import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy,Suspense } from "react";

const Home = lazy(()=>
  import("./pages/Home")
);
const ProjectDetails = lazy(()=>
  import("./pages/ProjectDetails")
);
const ProjectsView = lazy(()=>
  import("./pages/ProjectsView")
);
const Login = lazy(()=>
  import("./pages/Login")
);
const AdminDashboard = lazy(()=>
  import("./pages/AdminDashboard")
);
const AdminRoute = lazy(()=>
  import("./components/AdminRoute")
);
const AdminLayout = lazy(()=>
  import("./admin/AdminLayout")
);
const AdminProjects = lazy(()=>
  import("./admin/AdminProjects")
);
const AdminProjectCreate = lazy(()=>
  import("./admin/AdminProjectCreate")
);
const  AdminProjectEdit = lazy(()=>
  import("./admin/AdminProjectEdit")
);
const  AdminSkills = lazy(()=>
  import("./admin/AdminSkills")
);
const  AdminSkillForm = lazy(()=>
  import("./admin/AdminSkillForm")
);
const  AdminTechnologies = lazy(()=>
  import("./admin/AdminTechnologies")
);
const  AdminTechnologyForm = lazy(()=>
  import("./admin/AdminTechnologiesForm")
);
const  AdminResumes = lazy(()=>
  import("./admin/AdminResume")
);
const  AdminProfile = lazy(()=>
  import("./admin/AdminProfile")
);



function App(){
  return(
    <BrowserRouter>
    <Suspense
      fallback={
        <div className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-slate-950
        text-white
        "
        >
          Loading....
        </div>
      }
    >
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
    </Suspense>
    
    </BrowserRouter>
  )
}

export default App;