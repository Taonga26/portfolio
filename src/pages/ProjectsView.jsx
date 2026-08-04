import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";
import PageTransition from "../components/PageTransition";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";


function ProjectsView(){


    return(

       <PageTransition>
         <section
            id="projects"
            className="
                py-12 md:py-16
                px-6
                max-w-7xl
                mx-auto
            "
        >
            <Link
                to="/"
                className="
                            inline-flex
                            items-center
                            gap-2
                            text-blue-400
                            hover:text-blue-300
                            transition
                        "
            >
                <FaArrowLeft />
                Back
            </Link>

            <SectionTitle

                title="Projects"

                subtitle="Some of the applications and systems I have designed and developed."

            />


            {/* Project Counter */}

            <motion.div

                initial={{
                    opacity:0,
                    y:20
                }}

                whileInView={{
                    opacity:1,
                    y:0
                }}

                viewport={{
                    once:true
                }}

                className="
                    mb-10
                    text-slate-400
                "

            >

                <span className="text-sm sm:text-base lg:text-lg text-blue-400 font-bold text-xl">
                    {projects.length}
                </span>

                {" "}Projects Completed

            </motion.div>



            {/* Projects Grid */}

            <div
                className="
                    grid
                    sm:grid-cols-2
                    lg:grid-cols-3
                    gap-8
                    lg:grid
                "
            >

                {
                    projects.map(
                        (project,index)=>(


                        <motion.div

                            key={project.title}


                            initial={{
                                opacity:0,
                                y:50
                            }}


                            whileInView={{
                                opacity:1,
                                y:0
                            }}


                            viewport={{
                                once:true
                            }}


                            transition={{
                                duration:.5,
                                delay:index * .1
                            }}

                        >

                            <ProjectCard

                                project={project}

                            />


                        </motion.div>


                    ))
                }


            </div>

        </section>
       </PageTransition>

    )

}


export default ProjectsView;