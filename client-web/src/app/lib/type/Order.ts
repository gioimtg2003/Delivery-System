interface IOrder {
    _id: string;
    Customer: {
        Name: string;
        Phone: string;
        Address: string;
    };
    Status: string;
    Date: {
        OrderDate: string;
        CompleteDate: number | null;
        DeliveryDate: number | null;
        CancelDate: number | null;
    };
    idShipper: string;
}
