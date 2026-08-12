import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import useSkills from "../hooks/useSkills";
import { skillIcons } from "../utils/skills";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Loader from "./Loader";

function Skills() {
    const { skills, loading } = useSkills();

    if (loading) {
        return (
            <Loader />
        );
    }

    const skillCategories = Object.entries(skills);

    return (
        <section
            id="skills"
            className="
                py-16 md:py-24
                px-6
                max-w-7xl
                mx-auto
                overflow-hidden
            "
        >

            <SectionTitle
                title="Skills"
                subtitle="Technologies and tools I use to create modern software solutions."
            />

            {/* 
                OUTER HORIZONTAL CAROUSEL
            */}
            <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation ={{
                        nextEl: ".project-next",
                        prevEl: ".project-prev",
                    }}
                    pagination={{ clickable: true }}
                    spaceBetween={20}
                    breakpoints={{
                        640: {
                            slidesPerView: 2
                        },
                        768: {
                            slidesPerView: 2
                        },
                        1024: {
                            slidesPerView: 3.5
                        }
                    }}
                    loop={true}
                    speed={3000}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction:false,
                        pauseOnMouseEnter:true
                    }}
                
                >

                    {skillCategories.map(([category, items]) => (
                        <SwiperSlide key={`slide-${category}`}>
                            <SkillCard
                                category={category}
                                items={items}
                            />
                        </SwiperSlide>
                    ))}

                </Swiper>

        </section>
    );
}


/*
    Individual skill card
*/

function SkillCard({ category, items }) {

    /*
        Duplicate the skills so the vertical
        animation can loop continuously.
    */

    const duplicatedSkills = [...items, ...items];

    return (
        <motion.div
            whileHover={{
                y: -8
            }}
            className="
                w-[280px]
                md:w-[320px]
                shrink-0

                bg-slate-800/70
                backdrop-blur-xl

                border
                border-slate-700

                rounded-3xl
                p-6

                shadow-xl

                hover:border-blue-500

                transition-colors
            "
        >

            {/* Category */}

            <h3
                className="
                    text-xl
                    font-bold
                    capitalize
                    mb-6
                    text-blue-400
                "
            >
                {category}
            </h3>


            {/* 
                VERTICAL SKILL MARQUEE

                Fixed height prevents the card
                from growing indefinitely.
            */}

            <div
                className="
                    relative
                    h-[300px]
                    overflow-hidden
                "
            >

                {/* Top fade */}

                <div
                    className="
                        absolute
                        top-0
                        left-0
                        right-0
                        h-12
                        bg-gradient-to-b
                        from-slate-800
                        to-transparent
                        z-10
                        pointer-events-none
                    "
                />


                {/* Bottom fade */}

                <div
                    className="
                        absolute
                        bottom-0
                        left-0
                        right-0
                        h-12
                        bg-gradient-to-t
                        from-slate-800
                        to-transparent
                        z-10
                        pointer-events-none
                    "
                />


                {/* Vertical animation */}

                <motion.div
                    className="space-y-4"
                    animate={{
                        y: ["0%", "-50%"]
                    }}
                    transition={{
                        duration: 12,
                        ease: "linear",
                        repeat: Infinity
                    }}
                >

                    {duplicatedSkills.map((skill, index) => {

                        const Icon = skillIcons[skill.icon];

                        return (
                            <motion.div
                                key={`${skill.id}-${index}`}
                                whileHover={{
                                    scale: 1.03
                                }}
                                className="
                                    flex
                                    items-center
                                    gap-4

                                    bg-slate-700/60

                                    rounded-xl

                                    px-4
                                    py-3

                                    cursor-default
                                "
                            >

                                {Icon && (
                                    <Icon
                                        className="
                                            text-xl
                                            md:text-2xl
                                            text-blue-400
                                            shrink-0
                                        "
                                    />
                                )}

                                <span
                                    className="
                                        font-medium
                                        text-sm
                                        sm:text-base
                                        text-slate-300
                                    "
                                >
                                    {skill.name}
                                </span>

                            </motion.div>
                        );
                    })}

                </motion.div>

            </div>

        </motion.div>
    );
}

export default Skills;