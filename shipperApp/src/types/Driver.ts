export interface IDriver {
  id?: number;
  Name: string;
  Balance: number;
  Password?: string;
  Re_password?: string;
  Province: string;
  District: string;
  Ward: string;
  Hamlet?: string;
  DetailsAddress?: string;
  OnlineStatus: number;
  Status: 'Free' | 'Delivering';
  Phone: string;
  Email: string;
  Verify: boolean;
  Created?: Date;
}
