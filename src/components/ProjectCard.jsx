import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";


function ProjectCard({project}){

    return(

        <motion.div

            whileHover={{
                y:-10
            }}

            className="
                h-full
                bg-slate-800/70
                backdrop-blur-xl
                border
                border-slate-700
                rounded-3xl
                overflow-hidden
                shadow-xl
                hover:border-blue-500
                transition
            "

        >


            {/* Image */}

            <div className="overflow-hidden">

                <img

                    src={project.image}

                    alt={project.title}

                    className="
                        w-full
                        h-56
                        object-cover
                        hover:scale-110
                        transition
                        duration-500
                    "

                />

            </div>



            {/* Content */}

            <div className="p-6">


                <h3
                    className="
                        text-xl md:text-2xl
                        font-bold
                        mb-3
                    "
                >

                    {project.title}

                </h3>



                <p
                    className="
                        text-slate-400
                        text-sm md:text-base
                        leading-7
                        mb-6
                    "
                >

                    {project.description}

                </p>



                {/* Technologies */}

                <div className="flex flex-wrap gap-2 mb-6">

                    {
                        project.tech.map(
                            tech=>(

                            <span

                                key={tech}

                                className="
                                    text-sm
                                    bg-blue-600/20
                                    text-blue-400
                                    px-3
                                    py-1
                                    rounded-full
                                "

                            >

                                {tech}

                            </span>

                        ))
                    }

                </div>



                <Link

                    to={`/project/${project.id}`}

                    className="
                        inline-flex
                        items-center
                        bg-blue-600
                        hover:bg-blue-700
                        px-5
                        py-1
                        rounded-xl
                        transition
                        text-sm sm:text-base text-white
                        gap-2
                    "

                >

                    View Details
                    <FaArrowRight/>

                </Link>


            </div>


        </motion.div>

    )

}


export default ProjectCard;