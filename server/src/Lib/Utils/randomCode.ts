export const randomCode = () => {
    let code = "";
    for (let i = 0; i < 4; i++) {
        code += Math.floor(Math.random() * 10);
    }
    return code;
};
