import moment from "moment-timezone";

export const convertTimeStamp = (timeStamp: number): string => {
    return new Date(timeStamp).toISOString().slice(0, 19).replace("T", " ");
};

export const ConvertIsoToString = (iso: string): string => {
    const date = new Date(iso);

    // Create a formatter for the Vietnam timezone
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Ho_Chi_Minh",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });

    // Format the date
    const parts = formatter.formatToParts(date);
    const formattedDate = parts
        .reduce((acc, part) => {
            switch (part.type) {
                case "day":
                    return acc + part.value + "/";
                case "month":
                    return acc + part.value + "/";
                case "year":
                    return acc + part.value + " ";
                case "hour":
                case "minute":
                case "second":
                    return acc + part.value + ":";
                default:
                    return acc;
            }
        }, "")
        .slice(0, -1); // Remove the trailing space

    return formattedDate;
};
