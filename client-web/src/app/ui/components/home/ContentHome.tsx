import { motion, Variants } from "framer-motion";
import { TiTickOutline } from "react-icons/ti";
import Button from "./Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const contentVariants: Variants = {
    hidden: {
        opacity: 0,
        x: -50,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            bounce: 0.6,
            duration: 3,
        },
    },
};

const ContentHome = (): JSX.Element => {
    const router = useRouter();
    return (
        <section
            className="h-screen w-full min-h-[600px] flex flex-row justify-center items-center"
            id="home"
        >
            <div className="w-1/2 content-end flex flex-col justify-between pt-10 items-start h-3/5 ml-14 pb-8">
                <motion.div
                    initial={{
                        opacity: 0,
                        y: -25,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 24,
                    }}
                    className="text-start font-semibold text-5xl w-3/4"
                >
                    <p className="text-[#19385D]">
                        Quản lý giao hàng dễ hơn bao giờ hết
                    </p>
                </motion.div>
                <motion.div
                    variants={{
                        visible: {
                            transition: { staggerChildren: 0.1 },
                        },
                    }}
                    initial="hidden"
                    whileInView="visible"
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 24,
                    }}
                    className="text-start text-2xl text-black font-normal"
                >
                    <motion.div
                        variants={contentVariants}
                        className="flex flex-row items-center pb-5"
                    >
                        <TiTickOutline className="text-[#5FC620] mr-1" />
                        <p>Tạo đơn dễ dàng.</p>
                    </motion.div>
                    <motion.div
                        variants={contentVariants}
                        className="flex flex-row items-center pb-5"
                    >
                        <TiTickOutline className="text-[#5FC620] mr-1" />
                        <p>Quản lý thông minh.</p>
                    </motion.div>
                    <motion.div
                        variants={contentVariants}
                        className="flex flex-row items-center pb-5"
                    >
                        <TiTickOutline className="text-[#5FC620] mr-1" />
                        <p>Nắm được tình trạng đơn hàng.</p>
                    </motion.div>
                </motion.div>
                <div className="">
                    <Button
                        text="Đăng ký ngay"
                        onClick={() => {
                            router.push("/register");
                        }}
                    />
                </div>
            </div>
            <motion.div
                className="w-1/2 h-full relative"
                variants={{
                    visible: {
                        transition: { staggerChildren: 0.5 },
                    },
                }}
                initial="hidden"
                whileInView="visible"
            >
                <motion.div
                    className="absolute top-28 left-0 z-0 "
                    variants={{
                        hidden: {
                            opacity: 0,
                        },
                        visible: {
                            opacity: 1,
                        },
                    }}
                >
                    <Image
                        width={550}
                        height={550}
                        src="/images/background_car.png"
                        alt="error"
                        className="object-cover "
                    />
                </motion.div>
                <motion.div
                    className="absolute top-[370px] left-20 z-1"
                    variants={{
                        hidden: {
                            transform: "translateX(-25%)",
                            opacity: 0,
                        },
                        visible: {
                            transform: "translateX(0%)",
                            opacity: 1,
                            transition: {
                                type: "spring",
                                bounce: 0.6,
                                duration: 1.6,
                            },
                        },
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 24,
                        duration: 0.2,
                    }}
                >
                    <Image
                        width={380}
                        height={380}
                        src="/images/car.png"
                        alt="error"
                        className="object-cover  "
                    />
                </motion.div>
                <motion.div
                    className="absolute top-[212px] left-[180px] z-2 "
                    variants={{
                        hidden: {
                            transform: "translateY(-10%)",
                            opacity: 0,
                        },
                        visible: {
                            transform: "translateY(0%)",
                            opacity: 1,
                            transition: {
                                type: "spring",
                                bounce: 0.6,
                                duration: 1,
                            },
                        },
                    }}
                >
                    <Image
                        width={170}
                        height={170}
                        src="/images/shipper_car.png"
                        alt="error"
                        className="object-cover "
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default ContentHome;
