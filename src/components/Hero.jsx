import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin, FaDownload } from "react-icons/fa";

function Hero(){
    return(
        <section className="min-h-screen flex overflow-hidden items-center pt-20 px-6">
            <div className="absolute inset-0">
                <div className="absolute w-80 h-80 bg-blue-600 rounded-full blur-[120px] opacity-30 animate-pulse left-20 top-20"></div>
                <div className="absolute w-80 h-80 bg-cyan-500 rounded-full blur-[120px] opacity-20 animate-pulse right-20 bottom-20"></div>
                <div className="absolute w-96 h-96 bg-violet-500 rounded-full blur-[120px] opacity-20 animate-pulse left-1/2 top-1/3"></div>
            </div>
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Side */}
                <motion.div
                initial={{opacity: 0, x: -60}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.8}}
                >
                    <p className="text-blue-400 text-lg mb-4">
                        Hello, I'm
                    </p>
                    <h1 className="text-5xl md:text-7xl font-black leading-tight">
                        <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                            Taonga
                        </span>
                        <br />
                        Chiwowa
                    </h1>
                    <div className="text-2xl text-slate-300 mt-8 h-16">
                        <TypeAnimation
                        sequence={[
                            "Software Developer",
                            2000,
                            "Laravel Developer",
                            2000,
                            "React Developer",
                            2000,
                            "Flutter Developer",
                            2000,
                            "Machine Learning Enthusiat",
                            2000,
                        ]}
                        repeat={Infinity}
                        />
                    </div>
                    <p className="text-slate-400 mt-8 max-w-xl leading-8">
                        I build modern web applications, mobile apps and software solutions thatsolve real-world problems.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-10">
                        <a href="#projects" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold transition">
                            View Projects
                        </a>
                        <a href="#" className="border border-slate-600 px-8 py-4 rounded-xl hover:border-blue-500 transition flex items-center gap-2">
                            <FaDownload/>
                            Resume
                        </a>
                    </div>
                    <div className="flex gap-6 mt-10">
                        <a 
                        href="#" 
                        target="_blank" 
                        rel="noreferrer"
                        >
                            <FaGithub size={22} />
                        </a>
                        <div className="bg-slate-600 rounded-xl">
                            <a 
                            href="#" 
                            target="_blank" 
                            rel="noreferrer"
                            >
                                <FaLinkedin size={22} />
                            </a>
                        </div>
                        

                    </div>

                </motion.div>
                {/* Right Slide */}
                <motion.div
                initial={{opacity: 0, scale: .8}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: .8}}
                className="flex justify-center"overflow-hidden
                >
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-blue-500 blur-3xl opacity-30"></div>
                        <img src="src/assets/images/profile.jpg" alt="profile" className="relative w-80 h-80 object-cover rounded-full border-4 border-blue-500 shadow-2xl hero-img" />
                    </div>

                </motion.div>
            </div>
        </section>
    )
}

export default Hero;