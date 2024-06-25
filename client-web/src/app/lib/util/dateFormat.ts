export const dateFormat = (date: string): string => {
    const dateObject = new Date(date);

    return dateObject.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};
export const msToDate = (duration: number): string => {
    const date = new Date(duration);
    return date.toLocaleString();
};

export const convertIso = (iso: string): string => {
    const date = new Date(iso);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
    const formattedDate = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
    return formattedDate;
};
