"use client";
interface ITypeSet {
  accessToken: string;
  refreshToken: string;
  exp: number;
}

const getAccessTokenLocal = (): string | null => {
  return localStorage.getItem("aT");
};

const getRefreshTokenLocal = (): string | null => {
  return localStorage.getItem("rT");
};

const getExpLocal = (): string | null => {
  return localStorage.getItem("exp");
};

export function setToken(data: ITypeSet): void {
  localStorage.clear();
  localStorage.setItem("aT", data.accessToken);
  localStorage.setItem("rT", data.refreshToken);
  localStorage.setItem("exp", data.exp.toString());
}
type IType = ITypeSet & { setToken: (data: ITypeSet) => void };

export function useToken(): IType {
  const accessToken = getAccessTokenLocal();
  const refreshToken = getRefreshTokenLocal();
  const exp = getExpLocal();
  return {
    accessToken: accessToken ?? "",
    refreshToken: refreshToken ?? "",
    exp: parseInt(exp ?? "0"),
    setToken: setToken,
  };
}
