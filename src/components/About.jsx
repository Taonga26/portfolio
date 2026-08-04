import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaGraduationCap, FaLaptopCode, FaBrain } from "react-icons/fa";
import profile from "../assets/images/profile_1.jpg";
import SectionTitle from "./SectionTitle";

function About() {
    return (
        <section
            id="about"
            className="py-16 md:py-24 px-6 max-w-7xl mx-auto"
        >
            <SectionTitle
                title="About Me"
                subtitle="Passionate about building modern software solutions that make an impact."
            />

            <div className="grid lg:grid-cols-2 gap-16 items-center">

                {/* Image */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                >
                    <div className="relative">

                        <div className="absolute inset-0 rounded-3xl bg-blue-600 blur-3xl opacity-20"></div>

                        <img
                            src={profile}
                            alt="Taonga Chiwowa"
                            className="relative w-[380px] rounded-3xl object-cover shadow-2xl"
                        />

                    </div>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl md:text-3xl font-bold mb-6">
                        Full Stack Developer & Machine Learning Enthusiast
                    </h3>

                    <p className="text-sm sm:text-base lg:text-lg text-slate-400 leading-8">
                        I'm a Software Developer passionate about
                        building scalable web applications, mobile apps,
                        and intelligent software solutions.

                        <br /><br />

                        I enjoy turning ideas into real products using
                        Laravel, React, Flutter, Python and cloud
                        technologies while continuously learning new
                        tools and best practices.
                    </p>

                    {/* Highlights */}

                    <div className="grid sm:grid-cols-2 gap-4 mt-10">

                        <div className="flex items-center gap-3">
                            <FaLaptopCode
                                className="
                                    text-lg
                                    md:text-xl
                                    text-blue-400
                                "
                            />
                            <span>Full Stack Development</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <FaBrain
                                className="
                                    text-lg
                                    md:text-xl
                                    text-blue-400
                                "
                            />
                            <span>Machine Learning</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <FaGraduationCap
                                className="
                                    text-lg
                                    md:text-xl
                                    text-blue-400
                                "
                            />
                            <span>Computer Science</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <FaMapMarkerAlt
                                className="
                                    text-lg
                                    md:text-xl
                                    text-blue-400
                                "
                            />
                            <span>Lusaka, Zambia</span>
                        </div>

                    </div>

                    {/* Stats */}

                    <div className="grid grid-cols-2 gap-6 mt-12">

                        <div className="bg-slate-800 rounded-2xl p-6">
                            <h4 className="text-sm sm:text-base lg:text-lg text-blue-400 leading-7 uppercase">
                                Focus
                            </h4>

                            <p className="mt-2 font-semibold">
                                Full Stack Development
                            </p>
                        </div>

                        <div className="bg-slate-800 rounded-2xl p-6">
                            <h4 className="text-sm sm:text-base lg:text-lg text-blue-400 leading-7 uppercase">
                                Interests
                            </h4>

                            <p className="mt-2 font-semibold">
                                AI & Cloud Computing
                            </p>
                        </div>

                    </div>

                </motion.div>

            </div>

        </section>
    );
}

export default About;