import SectionTitle from "./SectionTitle";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";
function Projects(){
    return(
        <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
            <SectionTitle
            title="Projects"
            subtitle="Some projects I've worked on."
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map(project =>(
                    <ProjectCard
                    key={project.title}
                    project={project}
                    />
                ))}
            </div>
        </section>
    )
}

export default Projects