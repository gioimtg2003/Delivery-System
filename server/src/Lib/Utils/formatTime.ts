export const FormatTime = (time: number) => {
    if (time < 60) {
        return `${time.toFixed(0)}p`;
    } else {
        const hours = Math.floor(time / 60);
        console.log(`hours: ${hours}`);
        const remainingMinutes = time % 60;
        console.log(`remainingMinutes: ${remainingMinutes}`);
        return `${hours}h${remainingMinutes.toFixed(0)}p`;
    }
};
