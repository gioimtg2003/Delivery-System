import { FormatDate } from "./FormatDate";

export const FormatApi = (
    code: number,
    status: "error" | "success" | "failed",
    message: any,
    data: any,
    time: Date
) => {
    return {
        code: code,
        status: status,
        message: message,
        data: data,
        time_request: FormatDate(time),
    };
};
