import React from "react";
import ArticleMediaFigure from "@/components/ArticleMediaFigure";

type ArticleFigureProps = {
  src: string;
  alt: string;
  caption?: string;
  align?: "right" | "left" | "center";
};

const ArticleFigure = ({ src, alt, caption, align = "right" }: ArticleFigureProps) => {
  const alignmentClass =
    align === "left"
      ? "md:float-left md:mr-6"
      : align === "center"
        ? "mx-auto"
        : "md:float-right md:ml-6";

  return (
    <ArticleMediaFigure
      src={src}
      alt={alt}
      caption={caption}
      figureClassName={`my-4 w-full md:w-80 ${alignmentClass} md:mb-4`}
      thumbImgClassName="w-full h-44 object-cover"
    />
  );
};

export default ArticleFigure;
