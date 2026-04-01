import React from "react";
import ArticleMediaFigure from "@/components/ArticleMediaFigure";

export type ArticleStackItem = {
  src: string;
  alt: string;
  caption?: React.ReactNode;
  thumbImgClassName?: string;
};

type ArticleStackProps = {
  items: ArticleStackItem[];
  align?: "right" | "left";
  widthClassName?: string;
};

const ArticleStack = ({
  items,
  align = "right",
  widthClassName = "md:w-[320px]",
}: ArticleStackProps) => {
  if (!items.length) return null;

  const floatClass =
    align === "left" ? "md:float-left md:mr-6" : "md:float-right md:ml-6";

  return (
    <div className={`my-2 w-full ${widthClassName} ${floatClass} md:mb-4`}>
      <div className="space-y-[2px]">
        {items.map((item, index) => (
          <ArticleMediaFigure
            key={`${item.src}-${index}`}
            src={item.src}
            alt={item.alt}
            caption={item.caption}
            thumbImgClassName={item.thumbImgClassName ?? "w-full h-auto"}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticleStack;
