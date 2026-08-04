import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { skills } from "../data/skills";


function Skills(){

    return(

        <section
            id="skills"
            className="
                py-16 md:py-24
                px-6
                max-w-7xl
                mx-auto
            "
        >

            <SectionTitle

                title="Skills"

                subtitle="Technologies and tools I use to create modern software solutions."

            />


            <div
                className="
                    grid
                    md:grid-cols-2
                    lg:grid-cols-4
                    gap-8
                "
            >


                {
                    Object.entries(skills).map(
                        ([category,items])=>(


                        <motion.div

                            key={category}


                            initial={{
                                opacity:0,
                                y:40
                            }}


                            whileInView={{
                                opacity:1,
                                y:0
                            }}


                            viewport={{
                                once:true
                            }}


                            whileHover={{
                                y:-10
                            }}


                            transition={{
                                duration:.4
                            }}


                            className="
                                bg-slate-800/70
                                backdrop-blur-xl
                                border
                                border-slate-700
                                rounded-3xl
                                p-6
                                shadow-xl
                                hover:border-blue-500
                                transition
                            "

                        >


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



                            <div
                                className="
                                    space-y-4
                                "
                            >


                                {
                                    items.map(
                                        (skill)=>(


                                        <motion.div

                                            key={skill.name}


                                            whileHover={{
                                                scale:1.05
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


                                                <skill.icon
                                                    className="
                                                    text-xl
                                                    md:text-3xl
                                                    text-blue-400
                                                "
                                                />


                                            <span
                                                className="
                                                    text-white
                                                    font-medium
                                                    text-sm sm:text-base lg:text-lg text-slate-400
                                                "
                                            >

                                                {skill.name}

                                            </span>


                                        </motion.div>


                                    ))
                                }


                            </div>


                        </motion.div>


                    ))
                }


            </div>


        </section>

    )

}


export default Skills;