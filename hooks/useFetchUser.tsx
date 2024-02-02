import appwriteAuthService from "@/appwrite/config";
import React, { useEffect, useState } from "react";

const useFetchUser = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userId, setUserid] = useState<any>(null);

  const getUser = async () => {
    const user = await appwriteAuthService.getCurrentUser();
    setCurrentUser(user);
    setUserid(user?.$id);
  };

  useEffect(() => {
    getUser();
  }, []);

  return { currentUser, userId };
};

export default useFetchUser;
