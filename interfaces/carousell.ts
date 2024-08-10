export type ICarousell = {
  carousellId: string;
  title: string;
  totalMenu: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  cardMenu: ICardMenu[];
};

export type ICardMenu = {
  carousellCardId: string;
  menuTitle: string;
  imageId: string;
  imagePath: string;
  imageName: string;
  menuDesc: string;
  buttonType: string;
  buttonValue: string;
  datasetId: string | null;
  dialogId: string | null;
  isActive: boolean;
};

export type IGetCustomerCarousell = {
  tenantId: string;
};
