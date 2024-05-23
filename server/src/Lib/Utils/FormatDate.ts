export const FormatDate = (currentDate: Date): string => {
    return `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()} ${currentDate.getDate()}-${
        currentDate.getMonth() + 1
    }-${currentDate.getUTCFullYear()}`;
};
