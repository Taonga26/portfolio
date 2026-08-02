import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function ProjectCard({project}){
    return(
        <div className="bg-slate-800 rounded-2xl overflow-hidden hover:scale-105 transition">
            <div className="h-48 bg-slate-700"></div>
            <div className="p-6">
                <h3 className="text-2xl font-bold">
                    {project.title}
                </h3>
                <p className="text-slate-400 mt-8">
                    {project.description}
                </p>
                <div className="flex fle-wrap gap-2 mt-5">
                    {project.tech.map(tech =>(
                        <span
                        key={tech}
                        className="bg-blue-600 px-3 py-1 rounded-full text-sm"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
                <div className="flex gap-5 mt-6">
                    <a href={project.github}>
                        <FaGithub size={24}/>
                    </a>
                    <a href={project.demo}>
                        <FaExternalLinkAlt size={22} />
                    </a>
                    <Link
                    to={`/project/${project.id}`}
                    className="bg-blue-600 px-5 py-3 rounded-lg"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;