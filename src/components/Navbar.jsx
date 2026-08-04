import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";


function Navbar(){

    const [open, setOpen] = useState(false);

    const links = [
        "About",
        "Skills",
        "Projects",
        "Contact"
    ];


    return (

        <nav
            className="
                fixed
                top-0
                w-full
                z-50
            
            "
        >

            <div
                className="
                    max-w-7xl
                    mx-auto
                    flex
                    justify-between
                    items-center
                    px-6
                    h-20
                "
            >


                {/* Logo */}

                <a
                    href="/"
                    className="
                        text-2xl
                        font-black
                        bg-gradient-to-r
                        from-blue-400
                        to-cyan-300
                        bg-clip-text
                        text-transparent
                    "
                >
                    TC
                </a>



                {/* Desktop Menu */}

                <ul
                    className="
                        hidden
                        md:flex
                        gap-8
                    "
                >

                    {
                        links.map(link => (

                            <li key={link}>

                                <a
                                    href={`#${link.toLowerCase()}`}
                                    className="
                                        hover:text-blue-400
                                        transition
                                        font-semibold
                                    "
                                >
                                    {link}
                                </a>

                            </li>

                        ))
                    }

                </ul>




                {/* Mobile Button */}

                <button

                    className="
                        md:hidden
                        text-white
                    "

                    onClick={() => setOpen(!open)}

                >

                    {
                        open
                        ?
                        <FaTimes size={20} className="sm:w-6 sm:h-6" />
                        :
                        <FaBars size={20} className="sm:w-6 sm:h-6" />
                    }


                </button>


            </div>




            {/* Mobile Menu */}

            {
                open && (

                    <motion.div

                        initial={{
                            opacity:0,
                            height:0
                        }}

                        animate={{
                            opacity:1,
                            height:"auto"
                        }}

                        className="
                            md:hidden
                            bg-slate-950
                            border-t
                            border-slate-800
                        "

                    >

                        {
                            links.map(link => (

                                <a

                                    key={link}

                                    href={`#${link.toLowerCase()}`}

                                    className="
                                        block
                                        px-6
                                        py-4
                                        border-b
                                        border-slate-800
                                        hover:text-blue-400
                                        transition
                                    "

                                    onClick={() => setOpen(false)}

                                >

                                    {link}

                                </a>

                            ))
                        }


                    </motion.div>

                )
            }


        </nav>

    );

}


export default Navbar;