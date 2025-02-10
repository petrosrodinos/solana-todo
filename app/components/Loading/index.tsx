import { FC } from "react";

const Loading: FC<any> = ({ loading, children }) => {
  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
};

export default Loading;
