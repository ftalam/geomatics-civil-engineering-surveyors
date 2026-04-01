import React, { useEffect, useId, useMemo, useState } from "react";
import { Play, X } from "lucide-react";

export type ArticleVideoSource = {
  src: string;
  type?: string;
};

type ArticleVideoFigureProps = {
  src?: string;
  sources?: ArticleVideoSource[];
  poster: string;
  title: string;
  caption?: React.ReactNode;
  durationLabel?: string;
  align?: "right" | "left" | "center";
  widthClassName?: string;
  outerClassName?: string;
  figureClassName?: string;
  thumbClassName?: string;
};

const ArticleVideoFigure = ({
  src,
  sources,
  poster,
  title,
  caption,
  durationLabel,
  align = "right",
  widthClassName = "md:w-[330px]",
  outerClassName = "my-4",
  figureClassName = "",
  thumbClassName = "w-full h-auto",
}: ArticleVideoFigureProps) => {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  const resolvedSources = useMemo<ArticleVideoSource[]>(() => {
    if (sources?.length) return sources;
    if (src) return [{ src }];
    return [];
  }, [sources, src]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!resolvedSources.length) return null;

  const alignmentClass =
    align === "left"
      ? "md:float-left md:mr-6"
      : align === "center"
        ? "mx-auto"
        : "md:float-right md:ml-6";

  return (
    <>
      <figure
        className={`relative w-full ${outerClassName} ${widthClassName} ${alignmentClass} rounded-md border border-border/50 bg-transparent overflow-hidden ${figureClassName}`}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative block w-full text-left"
          aria-label={`Play video: ${title}`}
        >
          <div className="relative">
            <video
              preload="none"
              poster={poster}
              className={thumbClassName}
              playsInline
              muted
              aria-hidden="true"
            />

            <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border/50 bg-background/70 text-foreground shadow-sm transition-colors group-hover:bg-background/85">
                <Play className="h-5 w-5 translate-x-[1px]" />
              </span>
            </span>

            {durationLabel ? (
              <span className="pointer-events-none absolute bottom-2 right-2 rounded-md border border-border/50 bg-background/80 px-2 py-1 text-xs text-foreground">
                <span className="sr-only">Duration:</span> {durationLabel}
              </span>
            ) : null}
          </div>
        </button>

        <figcaption className="p-2 text-xs text-muted-foreground">
          {caption ?? title}
        </figcaption>
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
              <video
                controls
                autoPlay
                playsInline
                className="max-h-[80vh] w-full"
                poster={poster}
              >
                {resolvedSources.map((source) => (
                  <source
                    key={source.src}
                    src={source.src}
                    type={source.type}
                  />
                ))}
                <p className="p-4 text-sm text-white/90">
                  Your browser cannot play this video.{" "}
                  <a
                    href={resolvedSources[0].src}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    Open video
                  </a>
                  .
                </p>
              </video>
            </div>

            <div id={titleId} className="mt-3 text-sm text-white/90">
              {caption ?? title}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ArticleVideoFigure;
