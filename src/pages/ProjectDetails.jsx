import { useParams, Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import {
    FaArrowLeft,
    FaGithub,
    FaExternalLinkAlt,
    FaCode,
    FaChevronLeft,
    FaChevronRight,
    FaTimes,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";
import { getProjectImage } from "../utils/storage";
import useProject from "../hooks/useProject";
import { skillIcons } from "../utils/skills";
import Loader from "../components/Loader";



function ProjectDetails(){

    const { id } = useParams();

    const { project, loading } = useProject(id);


    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);


    // Handle invalid project

    if(!project){

        return (

            <div className="min-h-screen flex items-center justify-center">

                <h1 className="text-3xl font-bold">
                    Project Not Found
                </h1>

            </div>

        )

    }

    if (loading) {

        return (

          <Loader />

        );

    }

    return (
      <PageTransition>
        <div className="absolute inset-0 -z-20">
        <div className="absolute left-20 top-20 w-80 h-80 bg-blue-800 rounded-full blur-[120px] opacity-30 "></div>

        <div className="absolute right-20 bottom-20 w-80 h-80 bg-cyan-600 rounded-full blur-[120px] opacity-20"></div>

        <div className="absolute left-1/2 top-1/3 w-96 h-96 bg-violet600 rounded-full blur-[140px] opacity-20 "></div>
      </div>
        <main
          className="
                    min-h-screen
                    px-6
                    py-12
                    lg:py-24
                    max-w-6xl
                    mx-auto
                "
        >
          {/* Back Button */}

          <Link
          to="/projects"
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

          {/* Title */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
            }}
            className="mt-12"
          >
            <h1
              className="
                            text-4xl
                            md:text-6xl
                            font-black
                        "
            >
              {project.title}
            </h1>

            <p
              className="
                            text-sm sm:text-base lg:text-lg text-slate-400
                            mt-6
                            leading-8
                        "
            >
              {project.short_description}
            </p>
          </motion.div>

          {/* Details Card */}

          <div
            className="
                        mt-12
                        bg-slate-800/60
                        backdrop-blur-xl
                        border
                        border-slate-700
                        rounded-3xl
                        p-8
                    "
          >
            <h2
              className="
                            text-2xl
                            font-bold
                            flex
                            items-center
                            gap-3
                        "
            >
              <FaCode className="text-blue-400 " />
              Project Overview
            </h2>

            <p
              className="
                            whitespace-pre-line
                            text-slate-300
                            mt-6
                            leading-8
                            sm:text-base
                            text-sm
                        "
            >
              {project.description}
            </p>
          </div>

          {/* Screenshots Carousel */}

          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold mb-6">Screenshots</h2>

            <div className="relative">
              <button className="
                project-prev 
                absolute
                top-20
                lg:top-50 
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
                top-20
                lg:top-50 
                -right-8 
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
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation ={{
                nextEl: ".project-next",
                prevEl: ".project-prev",
              }}
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1}
              centeredSlides
              loop={true}
              speed={2500}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              className="rounded-xl overflow-hidden"
            >
              {project.project_images
                ?.sort((a, b) => a.display_order - b.display_order)
                .map((shot,index) => (
                <SwiperSlide key={shot.id}>
                  <img
                    key={shot.id}
                    src={getProjectImage(shot.image_path)}
                    alt={shot.caption}
                    onClick={()=> {
                      setSelectedImage(shot);
                      setSelectedIndex(index);
                      
                    }}
                    className="
                                        w-auto
                                        max-h-[500px]
                                        h-auto
                                        object-cover
                                        rounded-xl
                                        mx-auto
                                    "
                                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.section>

          {/* Technologies */}

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-5">Technologies Used</h2>
            
            <div className="flex flex-wrap gap-3">
              {project.project_technologies?.map(({ technologies }) => {
                  const Icon = skillIcons[technologies.icon];

                  return (
                      <span
                          key={technologies.id}
                          className="
                              inline-flex
                              items-center
                              gap-2
                              bg-blue-600/20
                              text-slate-400
                              px-4
                              py-2
                              rounded-full
                          "
                      >
                          {Icon && <Icon />}
                          {technologies.name}
                      </span>
                  );
              })}
            </div>
          </div>

          {/* Links */}

          <div className="flex gap-5 mt-10">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="
                                    flex
                                    items-center
                                    gap-3
                                    bg-slate-800
                                    hover:bg-slate-700
                                    px-6
                                    py-3
                                    rounded-xl
                                    transition
                                    sm:text-base
                                    text-sm

                                "
              >
                <FaGithub />
                Github
              </a>
            )}

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="
                                    flex
                                    items-center
                                    gap-3
                                    bg-blue-600
                                    hover:bg-blue-700
                                    px-6
                                    py-3
                                    rounded-xl
                                    transition
                                    sm:text-base
                                    text-sm
                                "
              >
                <FaExternalLinkAlt />
                Live Demo
              </a>
            )}
          </div>
        </main>
        {selectedImage && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="
                    fixed
                    inset-0
                    bg-black/90
                    backdrop-blur-md
                    z-50
                    flex
                    items-center
                    justify-center
                    p-6
                    hidden
                "
                onClick={() => setSelectedImage(null)}
            >
              <button
                  onClick={() => setSelectedImage(null)}
                  className="
                  absolute
                  top-6
                  right-6
                  text-2xl
                  "
              >
                <FaTimes/>
              </button>
              <button
                  onClick={(e) => {
                      e.stopPropagation();

                      const newIndex =
                          (selectedIndex - 1 + project.project_images.length) %
                          project.project_images.length;

                      setSelectedIndex(newIndex);
                      setSelectedImage(project.project_images[newIndex]);
                  }}
                  className="absolute left-6 text-4xl"
              >
                  <FaChevronLeft />
              </button>

                <img
                    src={selectedImage}
                    alt=""
                    className="
                      w-auto
                      max-h-[500px]
                      h-auto
                      object-cover
                      rounded-xl
                      mx-auto
                    "
                    onClick={(e) => e.stopPropagation()}
                />
                <button
                    onClick={(e) => {
                        e.stopPropagation();

                        const newIndex =
                            (selectedIndex + 1) %
                            project.project_images.length;

                        setSelectedIndex(newIndex);
                        setSelectedImage(project.project_images[newIndex]);
                    }}
                    className="absolute right-6 sm:right-2 text-4xl"
                >
                    <FaChevronRight />
                </button>

            </motion.div>
        )}
      </PageTransition>
    );

    
}

export default ProjectDetails;