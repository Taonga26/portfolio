import {
    FaReact,
    FaLaravel,
    FaPhp,
    FaPython,
    FaGitAlt
} from "react-icons/fa";

import {
    SiTailwindcss,
    SiMysql,
    SiFlutter,
    SiTensorflow,
    SiJavascript,
    SiFirebase,
    SiSupabase,
    SiPostgresql
} from "react-icons/si";


export const skills = {

    frontend: [
        {
            name: "React",
            icon: FaReact
        },
        {
            name: "JavaScript",
            icon: SiJavascript
        },
        {
            name: "Tailwind CSS",
            icon: SiTailwindcss
        },
        {
            name: "Flutter",
            icon: SiFlutter
        }
    ],


    backend: [
        {
            name: "Laravel",
            icon: FaLaravel
        },
        {
            name: "PHP",
            icon: FaPhp
        },
        {
            name: "Python",
            icon: FaPython
        },
        {
            name: "REST APIs",
            icon: FaGitAlt
        }
    ],


    database: [
        {
            name: "MySQL",
            icon: SiMysql
        },
        {
            name: "PostgreSQL",
            icon: SiPostgresql
        },
        {
            name: "Firebase",
            icon: SiFirebase
        },
        {
            name: "Supabase",
            icon: SiSupabase
        }
    ],


    "machine learning": [
        {
            name: "TensorFlow",
            icon: SiTensorflow
        },
        {
            name: "Python ML",
            icon: FaPython
        },
        {
            name: "Data Analysis",
            icon: FaPython
        }
    ]

};