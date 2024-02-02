import appwriteAuthService from "@/appwrite/config";
import React, { useEffect, useState } from "react";

const useFetchUser = () => {
  const [isUserDataLoading, setIsUserDataLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userId, setUserid] = useState<any>(null);

  const getUser = async () => {
    setIsUserDataLoading(true);
    const user = await appwriteAuthService.getCurrentUser();
    setIsUserDataLoading(false);
    setCurrentUser(user);
    setUserid(user?.$id);
  };

  useEffect(() => {
    getUser();
  }, []);

  return { currentUser, userId, isUserDataLoading };
};

export default useFetchUser;
