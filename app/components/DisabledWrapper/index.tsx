import { FC, ReactNode } from "react";

interface DisabledWrapperProps {
  loading: boolean;
  children: ReactNode;
}

const DisabledWrapper: FC<DisabledWrapperProps> = ({ loading, children }) => {
  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 bg-gray-200 opacity-50 pointer-events-none"></div>
      )}

      <div className={`transition-opacity ${loading ? "opacity-50" : "opacity-100"}`}>
        {children}
      </div>
    </div>
  );
};

export default DisabledWrapper;
