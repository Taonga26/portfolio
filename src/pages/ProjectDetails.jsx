import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projects";
import PageTransition from "../components/PageTransition";
import { FaArrowLeft } from "react-icons/fa";

function ProjectDetails(){
    const {id}= useParams();
    const project = projects.find(p=>p.id === Number(id));

    return(
        <PageTransition>
            <div className="min-h-screen px-6 py-24 max-w-5xl mx-auto">
                <Link
                to="/"
                className="text-blue-400" 
                >
                   <FaArrowLeft/> Back
                </Link>
                <img src={project.image} className="rounded-2xl mt-8 w-full"/>
                <h1 className="text-5xl font-bold mt-10">
                    {project.title}
                </h1>
                <p className="text-slate-400 mt-5">
                    {project.description}
                </p>
                <div className="mt-8">
                    <h2 className="text-2xl font-bold">
                        Project Overview
                    </h2>
                    <p className="whitespace-pre-line mt-4">
                        {project.details}
                    </p>
                </div>
                <diiv className="flex gap-3 mt-8">
                    {project.tech.map(item=>(
                        <span
                        key={item}
                        className="bg-blue-600 px-4 py-2 rounded-full"
                        >
                            {item}
                        </span>
                    ))}
                </diiv>
            </div>
        </PageTransition>
    )
}

export default ProjectDetails;