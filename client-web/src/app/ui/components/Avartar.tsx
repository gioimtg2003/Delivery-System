const Avatar = ({ className }: { className?: String }): JSX.Element => {
    return (
        <div
            className={`${className} shadow-lg rounded-md hover:cursor-pointer hover:shadow-xl transition duration-300 ease-in-out`}
        ></div>
    );
};

export default Avatar;
