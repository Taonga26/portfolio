import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

function About(){
    return(
        <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
            <SectionTitle
                title="About Me"
                subtitle="A passionate software developer who enjoys solving real-world problems through technology."
            />
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div 
                initial={{opacity: 0, x: -60}}
                whileInView={{opacity: 1, x: 0 }}
                viewport={{ once: true}}
                >
                    <img src="src/assets/images/profile.jpg" alt="Profile" className="rounded-3xl shadow-xl about-img"/>

                </motion.div>
                <motion.div 
                initial={{opacity: 0, x: 60}}
                whileInView={{opacity: 1, x: 0}}
                viewport={{once: true}}
                >
                    <p className="text-slate-300 leading-8">
                        I'm a Computer Science student with a passion for building web  & mobile applications and intelligent software solutions.
                        <br /><br />
                        My interests include Laravel, React, Flutter, Python, Machine Learning, Rest APIs and cloud tecnologies 
                    </p>

                    <div className="grid grid-cols-2 gap-4 mt-10">
                        <div>
                            <h3 className="font-bold text-blue-400"></h3>
                            <p>Lusaka, Zambia</p>
                        </div>
                        
                    </div>

                </motion.div>
            </div>
        </section>
    );
}

export default About;