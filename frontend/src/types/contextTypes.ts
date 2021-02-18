export type AuthContextType = {
  tokenCSRF?: string;
  createTokenCSRF(key: string): void;
  deleteTokenCSRF(): void;
  memberData: {
    group_id?: number;
    _id?: string;
    name?: string;
    email?: string;
    password?: string;
    date?: string;
  };
  statusVerifyCSRF: number;
};
