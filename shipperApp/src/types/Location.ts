export interface ILocation {
  id: string;
  address: {
    city: string;
    label: string;
    street?: string;
    district?: string;
    county: string;
  };
}
