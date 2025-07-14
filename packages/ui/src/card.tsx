import { type ReactNode } from "react";

export function Card({
  title,
  children,
  href,
}: {
  title: string;
  children: ReactNode;
  href: string;
}) {
  return (
    <div className="w-[50%] border-4">
      <a href={`${href}`} rel="noopener noreferrer" target="_blank">
        <h2 className="bg-red-500  mb-3 text-2xl font-semibold">
          {title}{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className="m-0 max-w-[30ch] text-sm ">{children}</p>
      </a>
    </div>
  );
}
