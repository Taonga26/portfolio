import {
    FaGithub,
    FaLinkedin
} from "react-icons/fa";

import { motion } from "framer-motion";

function Footer(){

    return(

        <motion.footer
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}

            className="
                relative
                mt-20
                border-t
                border-slate-800
                overflow-hidden
            "
        >

            {/* Background Glow */}

            <div
                className="
                    absolute
                    left-1/2
                    top-0
                    -translate-x-1/2
                    w-96
                    h-40
                    bg-blue-600
                    opacity-20
                    blur-[100px]
                "
            ></div>



            <div
                className="
                    relative
                    max-w-7xl
                    mx-auto
                    px-6
                    py-10
                    flex
                    flex-col
                    items-center
                    gap-6
                "
            >


                {/* Brand */}

                <h2
                    className="
                        text-2xl
                        font-bold
                        bg-gradient-to-r
                        from-blue-400
                        to-cyan-300
                        bg-clip-text
                        text-transparent
                    "
                >
                    Taonga Chiwowa
                </h2>



                {/* Navigation */}

                <div
                    className="
                        flex
                        flex-wrap
                        justify-center
                        gap-6
                        text-sm sm:text-base lg:text-lg text-slate-400
                    "
                >

                    <a href="#about" className="hover:text-blue-400 transition">
                        About
                    </a>

                    <a href="#skills" className="hover:text-blue-400 transition">
                        Skills
                    </a>

                    <a href="#projects" className="hover:text-blue-400 transition">
                        Projects
                    </a>

                    <a href="#contact" className="hover:text-blue-400 transition">
                        Contact
                    </a>

                </div>




                {/* Social Links */}

                <div className="flex gap-6">

                    <a
                        href="#"
                        target="_blank"
                        rel="noreferrer"
                    >

                        <FaGithub
                            size={24}
                            className="
                                hover:text-blue-400
                                transition
                            "
                        />

                    </a>


                    <a
                        href="#"
                        target="_blank"
                        rel="noreferrer"
                    >

                        <FaLinkedin
                            size={24}
                            className="
                                hover:text-blue-400
                                transition
                            "
                        />

                    </a>


                </div>




                {/* Copyright */}

                <p className="text-slate-500 text-sm">

                    © {new Date().getFullYear()} Taonga Chiwowa.
                    All rights reserved.

                </p>


            </div>


        </motion.footer>

    )

}


export default Footer;