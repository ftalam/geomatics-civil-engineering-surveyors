import React, { useEffect, useId, useState } from "react";
import { Expand, X } from "lucide-react";

type ArticleMediaFigureProps = {
  src: string;
  alt: string;
  caption?: React.ReactNode;
  figureClassName?: string;
  imgClassName?: string;
  thumbImgClassName?: string;
};

const ArticleMediaFigure = ({
  src,
  alt,
  caption,
  figureClassName = "",
  imgClassName = "w-full h-auto",
  thumbImgClassName = "w-full h-auto",
}: ArticleMediaFigureProps) => {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <figure
        className={`relative rounded-md border border-border/50 bg-transparent overflow-hidden ${figureClassName}`}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative block w-full text-left"
          aria-label="Expand image"
        >
          <img
            src={src}
            alt={alt}
            className={thumbImgClassName}
            loading="lazy"
          />
          <span className="pointer-events-none absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-md border border-border/50 bg-background/70 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
            <Expand className="h-4 w-4" />
          </span>
        </button>
        {caption ? (
          <figcaption className="p-2 text-xs text-muted-foreground">
            {caption}
          </figcaption>
        ) : null}
      </figure>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute -top-12 right-0 inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-black/40 text-white hover:bg-black/60 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="rounded-xl overflow-hidden border border-white/10 bg-black">
              <img
                src={src}
                alt={alt}
                className={`${imgClassName} max-h-[80vh] w-full object-contain`}
              />
            </div>

            <div id={titleId} className="mt-3 text-sm text-white/90">
              {caption ?? alt}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ArticleMediaFigure;
