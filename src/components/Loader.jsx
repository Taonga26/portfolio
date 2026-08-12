import { motion } from "framer-motion";

function Loader(){
    return(
        <div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50">
            <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                repeat: Infinity,
                duration: 1,
                repeatType: "reverse"
            }}
            className="text-5xl font-bold text-blue-400"
            animate-pulse
            >
                TC
            </motion.h1>
        </div>
    )
}

export default Loader;