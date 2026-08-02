import {motion} from "framer-motion";

function SectionTitle({title, subtitle}){
    return(
        <motion.div 
        initial={{opacity: 0, y: 40}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        transition={{duration: 0.6}}
        className="text-center mb-16"
        >
            <h2 className="text-4xl font-bold">{title}</h2>

            {subtitle && (
                <p className="text-slate-400 mt-4 max-w-xl mx-auto text-lg">
                    {subtitle}
                </p>
            )}
        </motion.div>
    )
}

export default SectionTitle;