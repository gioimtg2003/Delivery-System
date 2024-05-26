export const NumberToPrice = (number: number): string => {
    return number
        .toLocaleString("it-IT", { style: "currency", currency: "VND" })
        .replace("VND", "₫ ");
};
