"use server";

import React, { FC } from "react";

interface IUser {
  params: {
    userId: string;
  };
}

const User: FC<IUser> = async ({ params: { userId } }) => {
  return <div>{userId}</div>;
};

export default User;
