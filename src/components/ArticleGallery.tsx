import React from "react";
import ArticleMediaFigure from "@/components/ArticleMediaFigure";

export type GalleryItem = {
  src: string;
  alt: string;
  caption?: React.ReactNode;
};

type ArticleGalleryProps = {
  title?: string;
  items: GalleryItem[];
};

const ArticleGallery = ({ title, items }: ArticleGalleryProps) => {
  if (!items.length) return null;

  return (
    <div className="my-6">
      {title ? <div className="mb-3 text-sm font-semibold text-foreground">{title}</div> : null}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((item, index) => (
          <ArticleMediaFigure
            key={`${item.src}-${index}`}
            src={item.src}
            alt={item.alt}
            caption={item.caption}
            thumbImgClassName="h-28 w-full object-cover"
          />
        ))}
      </div>
    </div>
  );
};

export default ArticleGallery;
