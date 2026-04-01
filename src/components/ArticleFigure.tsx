import React from "react";
import ArticleMediaFigure from "@/components/ArticleMediaFigure";

type ArticleFigureProps = {
  src: string;
  alt: string;
  caption?: React.ReactNode;
  align?: "right" | "left" | "center";
  widthClassName?: string;
  figureClassName?: string;
  thumbImgClassName?: string;
};

const ArticleFigure = ({
  src,
  alt,
  caption,
  align = "right",
  widthClassName = "md:w-80",
  figureClassName = "",
  thumbImgClassName = "w-full h-44 object-cover",
}: ArticleFigureProps) => {
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
      figureClassName={`my-4 w-full ${widthClassName} ${alignmentClass} md:mb-4 ${figureClassName}`}
      thumbImgClassName={thumbImgClassName}
    />
  );
};

export default ArticleFigure;
