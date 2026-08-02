import { useState } from "react";
import {FaBars, FaTimes} from "react-icons/fa";

function Navbar(){
    const [open, setOpen] =useState(false);
    const links =[
        "About",
        "Skills",
        "Projects",
        "Contact"
    ];
    return (
        <nav className="fixed top-0 w-full bg-transparent-900/80 backdrop-blur-md z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-20">
                <h1 className="text-2xl font-bold text-blue-400">TC</h1>
                <ul className="hiddem md:flex gap-8">
                    {links.map(link =>(
                        <li key={link}>
                            <a href={`#${link.toLocaleLowerCase()}`}
                            className="hover:text-blue-400 transition font-semibold"
                            >
                                {link}
                            </a>
                        </li> 
                    ))}
                
                </ul>
                <button 
                className="md:hidden"
                onClick={()=>setOpen(!open)}
                >
                    {open ? <FaTimes size={24} /> : <FaBars size={24} /> }
                </button>
            </div>
            {open && (
                <div className="md:hidden bg-slate-900">
                    {links.map(link =>(
                        <a key={link} href={`#${link.toLocaleLowerCase()}`}
                        className="block p-4 border-b border border--slate-800"
                        onClick={()=>setOpen(false)}
                        >
                            {link}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
}

export default Navbar;