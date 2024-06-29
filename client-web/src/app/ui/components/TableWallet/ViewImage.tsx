import { axiosInstance } from "@/app/lib/util/axios";
import { Image } from "antd";
import { useEffect, useState } from "react";
import { GrImage } from "react-icons/gr";

const ViewImage = ({ image }: { readonly image: string }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [url, setUrl] = useState<string>("");
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axiosInstance().get(
                    `/media/sign-url?url=${image}`
                );
                setUrl(data.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [image]);
    return (
        <>
            <div className="w-full h-full flex flex-row justify-center align-center">
                <GrImage
                    size={20}
                    className="cursor-pointer"
                    onClick={() => setVisible(!visible)}
                />
            </div>
            <Image
                alt="Image Screen"
                style={{ display: "none" }}
                preview={{
                    visible,
                    scaleStep: 1,
                    src: url,
                    onVisibleChange: (value) => {
                        setVisible(value);
                    },
                }}
            />
        </>
    );
};

export default ViewImage;
