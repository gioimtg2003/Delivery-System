export const FormatTime = (time: number) => {
    if (time < 60) {
        return `${time}p`;
    } else {
        const hours = Math.floor(time / 60);
        const remainingMinutes = time % 60;
        return `${hours}h${remainingMinutes}p`;
    }
};
