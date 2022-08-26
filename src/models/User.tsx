export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
}

export interface IUserFilter {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: "asc" | "desc";
  first_name?: string;
  last_name?: string;
  email?: string;
  gender?: string;
  ip_address?: string;
}
