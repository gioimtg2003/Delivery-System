import { motion } from "framer-motion";
import TextGenerateEffect from "../TextGenerateEffect";
const ContentAbout = (): JSX.Element => {
    return (
        <section
            className="h-screen w-full snap-center min-h-[600px]"
            id="about"
        >
            <div className="mt-10 w-full text-center">
                <p className="text-4xl text-primary-1-color">
                    Đội ngũ của chúng tôi
                </p>
            </div>
            <div className="mt-8 w-full text-center flex flex-row justify-center">
                <TextGenerateEffect
                    text="Với chăm ngôn thấu hiểu khách hàng, chúng tôi luôn ở đây sẵn
                    sàng thấu hiểu bạn."
                    className="text-5xl text-[#19385D] font-semibold w-3/4 "
                />
            </div>
        </section>
    );
};

export default ContentAbout;
