const Button = ({
    text,
    onClick,
}: Readonly<{ text: string; onClick?: () => void }>): JSX.Element => {
    return (
        <button className="py-2 px-4 bg-[#4292F3] rounded-md" onClick={onClick}>
            <span className="font-medium text-white">{text}</span>
        </button>
    );
};

export default Button;
