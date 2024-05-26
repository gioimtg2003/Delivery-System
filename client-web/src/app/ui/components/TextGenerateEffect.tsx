import { motion, stagger, useAnimate, Variants } from "framer-motion";
import React, { useEffect, useMemo } from "react";
const itemVariants: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    },
};
const TextGenerateEffect = ({
    text,
    className,
}: Readonly<{ text: string; className?: string }>): JSX.Element => {
    let wordArray = useMemo(() => text.split(" "), [text]);

    return (
        <motion.div
            className={className}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.1,
                    },
                },
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 24,
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{
                once: true,
            }}
        >
            {wordArray.map((word, idx) => {
                return (
                    <motion.span variants={itemVariants} key={word + idx}>
                        {word}{" "}
                    </motion.span>
                );
            })}
        </motion.div>
    );
};

export default TextGenerateEffect;
