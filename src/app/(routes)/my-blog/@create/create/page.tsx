"use client";

import CreateBlog from "@/_components/create-blog/CreateBlog";
import Title from "@/_components/title/Title";
import React from "react";

const Page = () => {
  return (
    <>
      <Title title={"Create Blog"} />
      <CreateBlog />
    </>
  );
};

export default Page;
