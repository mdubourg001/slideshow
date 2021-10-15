import { ReactNode } from "react";
import cs from "classnames";

export interface WebBrowserProps {
  className?: string;
  url?: string;
  children?: ReactNode;
}

export function WebBrowser({ className, url, children }: WebBrowserProps) {
  return (
    <div
      className={cs(
        "flex flex-col w-full h-full border-4 border-black bg-white rounded-lg",
        className
      )}
    >
      <div className="flex items-center py-10 mx-10 space-x-3 border-b-2 border-gray-400">
        <div className="w-8 h-8 bg-red-600 border-4 border-black rounded-full" />
        <div className="w-8 h-8 bg-yellow-600 border-4 border-black rounded-full" />
        <div className="w-8 h-8 bg-green-600 border-4 border-black rounded-full" />
        <div className="w-8 h-8" />
        <div className="flex items-center w-full h-12 px-5 border-4 border-black rounded-full">
          {url}
        </div>
      </div>

      <div className="h-full p-10 overflow-y-scroll">{children}</div>
    </div>
  );
}
