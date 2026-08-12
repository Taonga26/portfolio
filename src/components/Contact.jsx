import { motion } from "framer-motion";
import {
    FaEnvelope,
    FaMapMarkerAlt,
    FaLinkedin,
    FaGithub
} from "react-icons/fa";
import SectionTitle from "./SectionTitle";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import useProfile from "../hooks/useProfile";


function Contact(){

    const {profile,loading, error} = useProfile();

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const [emailloading, setLoading] = useState(false);


    const form = useRef();


    const sendEmail = async (e) =>{
        e.preventDefault();

        setLoading(true);
    

        try{
            await emailjs.sendForm(
                SERVICE_ID,
                TEMPLATE_ID,
                form.current,
                PUBLIC_KEY
            );

            alert("Message sent successfully");
            form.current.reset();
        }catch(error){
            alert("Message not sent")
            console.error(error);
        }finally{
            setLoading(false);
        }
    }

    if (loading){
        return(
            <div>
                Loading.....
            </div>
        );
    }

    if (error) {
        return (
            <div>
                Failed to load contact.
            </div>
        );
    }

    return(

        <section
            id="contact"
            className="
                py-16 md:py-24
                px-6
                max-w-7xl
                mx-auto
            "
        >

            <SectionTitle

                title="Get In Touch"

                subtitle="Let's build something amazing together."

            />



            <div
                className="
                    grid
                    lg:grid-cols-2
                    gap-12
                    mt-8 md:mt-12
                "
            >


                {/* Contact Information */}

                <motion.div

                    initial={{
                        opacity:0,
                        x:-50
                    }}

                    whileInView={{
                        opacity:1,
                        x:0
                    }}

                    viewport={{
                        once:true
                    }}

                    className="
                        bg-slate-800/60
                        backdrop-blur-xl
                        border
                        border-slate-700
                        rounded-3xl
                        p-8
                    "

                >

                    <h3 className="text-2xl md:text-3xl font-bold mb-6">

                        Let's Talk

                    </h3>


                    <p className="text-sm sm:text-base lg:text-lg text-slate-400 leading-8 mb-8">

                        I'm always interested in discussing
                        software development, new ideas,
                        and opportunities to create impactful
                        solutions.

                    </p>



                    <div className="space-y-6">


                        <div className="flex items-center gap-4">

                            <FaMapMarkerAlt
                                className="text-sm sm:text-base lg:text-lg text-blue-400"
            
                            />

                            <span>
                                {profile?.location}
                            </span>

                        </div>



                        <div className="flex items-center gap-4">

                            <FaEnvelope
                                className="text-sm sm:text-base lg:text-lg text-blue-400"
            
                            />
                            
                            <a href={`mailto:${profile.email}`}>
                                {profile.email}
                            </a> 

                        </div>



                    </div>



                    <div className="flex gap-5 mt-10">


                        <a href={profile?.github_url}>

                            <FaGithub
                                size={22}
                                className="hover:text-blue-400 transition"
                            />

                        </a>


                        <a href={profile?.linkedin_url}>

                            <FaLinkedin
                                size={22}
                                className="hover:text-blue-400 transition"
                            />

                        </a>


                    </div>


                </motion.div>





                {/* Contact Form */}

                <motion.form
                    ref={form}
                    onSubmit={sendEmail}
                    initial={{
                        opacity:0,
                        x:50
                    }}

                    whileInView={{
                        opacity:1,
                        x:0
                    }}

                    viewport={{
                        once:true
                    }}

                    className="
                        bg-slate-800/60
                        backdrop-blur-xl
                        border
                        border-slate-700
                        rounded-3xl
                        p-8
                        space-y-6
                    "

                >



                    <input

                        type="email"
                        name="user_email"
                        placeholder="Email Address"
                        required

                        className="
                            w-full
                            border
                            border-white
                            rounded-xl
                            p-4
                            outline-none
                            focus:border-blue-500
                            transition
                        "

                    />



                    <textarea

                        rows="6"
                        name="message"
                        placeholder="Your Message"
                        required

                        className="
                            w-full
                            border
                            border-slate-700
                            rounded-xl
                            p-4
                            outline-none
                            focus:border-blue-500
                            transition
                        "

                    />



                    <button

                        type="submit"
                        disabled={emailloading}

                        className="
                            w-full
                            bg-blue-600
                            hover:bg-blue-700
                            py-4
                            rounded-xl
                            font-semibold
                            transition
                            hover:scale-[1.02]
                        "

                    >

                        {emailloading ? "Sending..." : "Send Message"}

                    </button>


                </motion.form>


            </div>


        </section>

    )

}


export default Contact;