import { FormatDate } from "./FormatDate";

export const Log = {
    Error: (timeNow: Date, msg: any, service: string): void => {
        console.error(
            `[${FormatDate(
                timeNow
            )}] Status: Error - ${msg} - Service: ${service}`
        );
    },
    Info: (timeNow: Date, status: string, msg: any, service: string): void => {
        console.log(
            `[${FormatDate(
                timeNow
            )}] Status: ${status} - ${msg} - Service: ${service}`
        );
    },
};
