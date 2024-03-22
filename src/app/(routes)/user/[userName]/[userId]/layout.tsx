import { Box } from "@mui/material";
import UserDrawer from "../../../../../_components/user-drawer/UserDrawer";
import { ReactNode } from "react";
import AuthorTitle from "../../../../../_components/author-title/AuthorTitle";

type Props = {
  params: {
    userName: string;
  };
};

export const generateMetadata = (route: Props) => {
  const { params } = route;

  const title = params?.userName
    ? `Author: ${params.userName}`
    : "Node Blogs with Next.js";
  const description =
    "A blog built with Next.js and featuring Node.js content.";

  return {
    title,
    description,
  };
};

export default function Layout({
  children,
  followers,
  followings,
}: {
  children: React.ReactNode;
  followers: ReactNode;
  followings: ReactNode;
}) {
  console.log(typeof followings);
  return (
    <Box
      sx={{
        margin: "auto",
        maxWidth: "1200px",
        minHeight: 500,
        position: "relative",
      }}
    >
      <UserDrawer />
      <Box
        sx={{ marginRight: `380px`, marginTop: 8 }}
        display={"flex"}
        gap={2}
        flexDirection={"column"}
      >
        <AuthorTitle followers={!!followers} followings={!!followings} />
        {followings ? followings : followers ? followers : children}
      </Box>
    </Box>
  );
}
