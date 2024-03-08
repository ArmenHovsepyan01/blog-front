import React, { FC } from "react";

interface IBlog {
  params: {
    blogId: string;
  };
}

const Page: FC<IBlog> = ({ params: blogId }) => {
  return <div>ID</div>;
};

export default Page;
