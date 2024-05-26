import { motion, Variants } from "framer-motion";
const dot = [1, 2, 3, 4];
const itemVariants: Variants = {
    open: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            bounce: 0.7,
            damping: 8,
            duration: 2.5,
            repeat: Infinity,
        },
    },
    hidden: {
        opacity: 0,
        y: -40,
    },
};
export default function LoadingComponent({
    content = true,
}: Readonly<{
    content?: boolean;
}>): React.ReactElement {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            {content && (
                <>
                    <motion.img
                        src="/images/iconLoading.png"
                        width={65}
                        height={65}
                        alt="loading"
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                            transition: {
                                duration: 3,
                            },
                        }}
                    />
                    <motion.p
                        className="text-gray-500 mt-2"
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                            transition: {
                                duration: 0.5,
                            },
                        }}
                    >
                        Vui lòng đợi tí nhé!
                    </motion.p>
                </>
            )}

            <motion.div
                className="text-center text-primary-1-color/75 mt-4 flex"
                initial="hidden"
                variants={{
                    open: {
                        transition: { staggerChildren: 0.2 },
                    },
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                }}
                animate="open"
            >
                {dot.map((_, i) => (
                    <motion.span
                        key={i}
                        className="font-bold text-5xl sm:text-9xl"
                        variants={itemVariants}
                    >
                        .
                    </motion.span>
                ))}
            </motion.div>
        </div>
    );
}
