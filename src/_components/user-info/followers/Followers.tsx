import React, { FC } from "react";
import { useUserFollowers } from "../../../hooks/useUserFollowers";
import Link from "next/link";

interface IFollowers {
  id: number;
}

const Followers: FC<IFollowers> = ({ id }) => {
  const { followers } = useUserFollowers(id.toString());

  return (
    <Link href={`/my-blog/followers`} style={{ fontSize: 18 }}>
      {followers?.length} Followers
    </Link>
  );
};

export default Followers;
