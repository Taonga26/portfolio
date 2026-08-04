import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin, FaDownload, FaFacebook} from "react-icons/fa";
import profile from "../assets/images/profile.jpg";
import { info } from "../data/info";
import { Link } from "react-router-dom";


function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute left-20 top-20 w-80 h-80 bg-blue-600 rounded-full blur-[120px] opacity-30 animate-pulse"></div>

        <div className="absolute right-20 bottom-20 w-80 h-80 bg-cyan-500 rounded-full blur-[120px] opacity-20 animate-pulse"></div>

        <div className="absolute left-1/2 top-1/3 w-96 h-96 bg-violet-500 rounded-full blur-[140px] opacity-20 animate-pulse"></div>
      </div>

      {/* Image background panel */}
      <div
    className="
        hidden
        lg:block
        absolute
        top-0
        right-[-80px]
        h-full
        w-[45%]
        overflow-hidden
        -skew-x-12
        origin-top
        -z-10

    "
>
        <img
    src={profile}
    className="
        w-full
        h-full
        object-cover
        skew-x-12
        scale-110
    "
/>

        {/* Dark gradient overlay */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-slate-900/80
            via-blue-900/50
            to-cyan-700/40
        "
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto min-h-screen grid lg:grid-cols-[1.3fr_0.7fr] items-center px-6">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="py-20"
        >
          <p className="text-blue-400 text-xl mb-4">Hello, I'm</p>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Taonga
            </span>
            <br />
            Chiwowa
          </h1>

          <div className="text-lg sm:text-xl lg:text-2xl text-slate-300 mt-8 h-16">
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
                "Machine Learning Enthusiast",
                2000,
              ]}
              repeat={Infinity}
            />
          </div>

          <p className="text-sm sm:text-base lg:text-lg text-slate-400 mt-8 max-w-xl leading-8">
            I build modern web applications, mobile applications and AI powered
            software solutions that solve real-world problems.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              to="/projects"
              className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 md:px-8 md:py-4 rounded-xl sm:text-base
                                    text-sm"
            >
              View Projects
            </Link>

            <a
              href="#"
              className="border border-slate-600 hover:border-blue-500 transition px-6 py-3 md:px-8 md:py-4 rounded-xl flex items-center gap-2 sm:text-base
                                    text-sm"
            >
              <FaDownload />
              Resume
            </a>
          </div>

          <div className="flex gap-6 mt-10">
            <a href={info.github}>
              <FaGithub className="text-xl md:text-2xl" />
            </a>

            <a href={info.linkedin}>
              <FaLinkedin className="text-xl md:text-2xl" />
            </a>

            <a href="#">
              <FaFacebook className="text-xl md:text-2xl" />
            </a>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          className="
        hidden
        lg:block
    "
        >
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
