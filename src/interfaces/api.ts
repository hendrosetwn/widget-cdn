export interface APIBaseResponse<T = undefined> {
  status: boolean | number | string;
  message: string;
  data?: T extends undefined ? never : T;
  pagination?: IPagination;
}

export interface IPagination {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  totalRecords: number;
  totalPage: number;
}
