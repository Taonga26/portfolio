import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaList } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


function Projects(){

    return(

        <section
            id="projects"
            className="
                py-16 md:py-24
                px-6
                max-w-7xl
                mx-auto
            "
        >

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
                <div className="flex justify-between text-white">

                    <span className="text-sm sm:text-base lg:text-lg text-blue-400 font-bold text-xl">
                    {projects.length}
                    </span>

                    <Link

                    to={"/projects"}

                    className="
                        inline-flex
                        items-center
                        bg-blue-600
                        hover:bg-blue-700
                        px-5
                        py-3
                        rounded-xl
                        transition
                        text-sm sm:text-base lg:text-lg text-white
                    "

                >

                    <FaList/>


                </Link>


                </div>

            </motion.div>



            {/* Projects Grid */}
            <div className="relative">
              <button className="
                project-prev 
                absolute
                top-50 
                -left-8 
                top-1/2 
                -translate-y-1/2 
                z-20 
                w-12 
                h-12 
                rounded-full 
                bg-slate-900/80 
                backdrop-blur 
                border 
                border-slate-700 
                flex items-center 
                justify-center 
                hover:bg-blue-600 
                transition"
              >
                <FaChevronLeft/>
              </button>
              <button className="
                project-next 
                absolute
                top-50 
                -right-8 
                top-1/2 
                -translate-y-1/2 
                z-20 
                w-12 
                h-12 
                rounded-full 
                bg-slate-900/80 
                backdrop-blur 
                border 
                border-slate-700 
                flex items-center 
                justify-center 
                hover:bg-blue-600 
                transition"
              >
                <FaChevronRight/>
              </button>
            </div>

            <div className="
            
            "
            >

                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation ={{
                        nextEl: ".project-next",
                        prevEl: ".project-prev",
                    }}
                    pagination={{ clickable: true }}
                    spaceBetween={15}
                    breakpoints={{
                        640: {
                            slidesPerView: 1
                        },
                        768: {
                            slidesPerView: 1
                        },
                        1024: {
                            slidesPerView: 3
                        }
                    }}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction:false,
                        pauseOnMouseEnter:true
                    }}
                
                >

                    {projects.map(project => (

                        <SwiperSlide key={project.id}>

                            <ProjectCard project={project} />

                        </SwiperSlide>

                    ))}

                </Swiper>

            </div>


        </section>

    )

}


export default Projects;