import { skills } from "../data/skills";
import SectionTitle from "./SectionTitle";
import { motion } from "framer-motion";

function Skills(){
    return(
        <section id="skills" className="py-24 px-6 max-w-7xl mx-auto">
            <SectionTitle
            title="Skills"
            subtitle="Technologies I enjoy working with."
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {Object.entries(skills).map(([category, items]) =>(
                    <motion.div
                    key={category}
                    whileHover={{scale: 1.05}}
                    className="bg-slate-800 rounded-2xl p-6"
                    >
                        <h3 className="text-xl font-bold capitalize mb-6 text-blue-400">
                            {category}
                        </h3>
                        <div className="space-y-3">
                            {items.map(skill => (
                                <div 
                                key={skill}
                                className="text-white rounded-lg px-4 py-2">
                                    {skill}
                                </div>
                            ))}
                        </div>

                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default Skills