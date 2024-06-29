export interface ITransportType {
    id: number;
    Name: string;
    Description: string;
    ImgUrl: string;
    Rate: number;
    CostLimit: number;
    KeyName: "car" | "truck" | "scooter";
}

export interface ITransportVisibleRules {
    id: number;
    TransportTypeId: number;
    CanSeeTransportTypeId: number;
}
