import React, { FC } from "react";
import { useUserFollowings } from "../../../hooks/useUserFollowings";
import Link from "next/link";

interface IFollowings {
  id: number;
}

const Followings: FC<IFollowings> = ({ id }) => {
  const { followings } = useUserFollowings(id.toString());

  return (
    <Link href={`/my-blog/followings`} style={{ fontSize: 18 }}>
      {followings?.length} Followings
    </Link>
  );
};

export default Followings;
