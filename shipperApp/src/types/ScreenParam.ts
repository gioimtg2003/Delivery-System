export type IdentityScreenParamList = {
  identity: {
    idShipper: number;
  };
  imgDriveLicense: {
    identityAfter: string;
    identityBefore: string;
  };
  imgVehicleRegistrationCert: {
    imgDriveLicenseBefore: string;
    imgDriverLicenseAfter: string;
  };
};

export type AppScreenParamList = {
  login: undefined;
  signup: undefined;
  home: undefined;
  orderDetails: {
    id: string;
  };
  orderDelivery: {
    id: string;
  };
  Wallet: undefined;
  AddWalletScreen: undefined;
};
