const Card = ({
    className,
    children,
}: {
    className?: String;
    children: React.ReactNode;
}): JSX.Element => {
    return (
        <div
            className={`${className} shadow-lg rounded-md hover:cursor-pointer hover:shadow-xl transition duration-300 ease-in-out  px-4 py-10 hover:scale-105`}
        >
            {children}
        </div>
    );
};

export default Card;
