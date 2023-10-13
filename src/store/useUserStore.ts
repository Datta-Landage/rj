import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUser } from "../hooks/useUserInfo";

interface IUserStore {
  user: IUser;
  setUser: (user: IUser) => void;
}

export const useUserStore = create(
  persist<IUserStore>(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "useUserStore",
    },
  ),
);
