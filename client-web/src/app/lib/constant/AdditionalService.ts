export const AdditionalService = [
    {
        name: "Đóng gói",
        value: "package",
        description: "Miễn phí",
    },
    {
        name: "Giao tận tay",
        value: "hand_delivery",
        description: "+ 10.000đ",
    },
    {
        name: "Giữ nhiệt (Thức ăn)",
        value: "keep_warm",
        description: "Miễn phí",
    },
    {
        name: "Gia cố hàng hóa (Cồng kềnh)",
        value: "reinforce",
        description: "+ 8% Phí",
    },
];

export type additional_service_type =
    | "package"
    | "hand_delivery"
    | "keep_warm"
    | "reinforce";
