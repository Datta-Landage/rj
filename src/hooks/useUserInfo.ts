import { useState, useCallback } from "react";
import { API } from "../utils/api";

export const USER_TYPE = {
  RECRUITER: "Recruiter",
  CANDIDATE: "Candidate",
};

export interface IUser {
  _id: string;
  email: string;
  password: string;
  accountType: "Recruiter" | "Candidate";
  __v: number;
}

const fetchUserInfo = async (userId: string): Promise<IUser> => {
  const response = await fetch(API.getUserInfo(userId));
  if (!response.ok) {
    throw new Error(`Failed to fetch user info:\n${response.status} ${response.statusText}`);
  }
  const data: IUser = await response.json();
  return data;
};

export const useUserInfo = () => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUserInfo = useCallback(async (userId: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const data = await fetchUserInfo(userId);
      setUserData(data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    userData,
    getUserInfo,
    error,
    isLoading,
  };
};
