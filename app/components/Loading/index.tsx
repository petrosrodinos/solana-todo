import { FC } from "react";

const Loading: FC<any> = ({ loading = false, children = null }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-10 h-10 animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default Loading;
