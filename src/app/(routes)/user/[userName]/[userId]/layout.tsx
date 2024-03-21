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

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
