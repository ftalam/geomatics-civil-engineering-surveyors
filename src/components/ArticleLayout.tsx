import React, { useCallback, useMemo, useState } from "react";
import Layout from "@/components/Layout.jsx";
import { ArrowLeft, List, PanelRightClose, PanelRightOpen, X } from "lucide-react";
import { Link } from "react-router-dom";
import ArticleMediaFigure from "@/components/ArticleMediaFigure";

export type InfoboxItem = {
  label: string;
  value: React.ReactNode;
};

export type InfoboxImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type TocItem = {
  id: string;
  label: string;
};

type ArticleLayoutProps = {
  title: string;
  tagline?: string;
  hatnote?: React.ReactNode;
  backHref?: string;
  backLabel?: string;
  toc?: TocItem[];
  infobox?: {
    title?: string;
    images?: InfoboxImage[];
    items?: InfoboxItem[];
  };
  children: React.ReactNode;
};

const ArticleLayout = ({
  title,
  tagline,
  hatnote,
  backHref = "/services",
  backLabel = "Back to Services",
  toc = [],
  infobox,
  children,
}: ArticleLayoutProps) => {
  const hasToc = toc.length > 0;
  const [tocCollapsed, setTocCollapsed] = useState(() => toc.length > 0);
  const [tocDrawerOpen, setTocDrawerOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const tocItems = useMemo(() => toc.filter((item) => item.id && item.label), [toc]);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    try {
      window.history.replaceState(null, "", `#${id}`);
    } catch {
      // ignore
    }
  }, []);

  return (
    <Layout footerCollapsible footerDefaultOpen={false}>
      <main id="content" className="mw-body py-10 md:py-14">
        <div className="mw-page-container">
          <div className="mw-page-container-inner">
            <div className="w-full max-w-7xl px-4 mx-auto">
              <div className="flex gap-6">
                <div className="min-w-0 flex-1">
                  <Link
                    to={backHref}
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={backLabel}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {backLabel}
                  </Link>

                  <header className="mt-6 border-b border-border/60 pb-4">
                    <div className="flex items-start gap-3">
                      {hasToc ? (
                        <button
                          type="button"
                          onClick={() => setTocDrawerOpen(true)}
                          className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/60 bg-card/40 text-muted-foreground hover:text-foreground transition-colors lg:hidden"
                          aria-label="Toggle table of contents"
                          title="Table of contents"
                        >
                          <List className="h-4 w-4" />
                        </button>
                      ) : null}

                      <div className="min-w-0">
                        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                          {title}
                        </h1>
                        {tagline ? (
                          <p className="mt-2 text-sm text-muted-foreground">{tagline}</p>
                        ) : null}
                        {hatnote ? (
                          <div className="mt-3 text-sm italic text-muted-foreground">
                            {hatnote}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </header>

                  <div className="mt-6">
                    <article
                      className="min-w-0 space-y-6 leading-relaxed"
                      style={{ fontFamily: '"Times New Roman", Times, serif' }}
                    >
                      {infobox ? (
                        <aside className="w-full md:w-80 md:float-right md:ml-6 md:mb-4 rounded-md border border-border/50 bg-transparent overflow-hidden">
                          {infobox.title ? (
                            <div className="px-3 py-2 text-sm font-semibold border-b border-border/50">
                              {infobox.title}
                            </div>
                          ) : null}

                          {infobox.images?.length ? (
                            <div className="p-3 space-y-3">
                              {infobox.images.map((img) => (
                                <ArticleMediaFigure
                                  key={`${img.src}-${img.caption ?? ""}`}
                                  src={img.src}
                                  alt={img.alt}
                                  caption={img.caption}
                                  thumbImgClassName="w-full h-44 object-cover"
                                />
                              ))}
                            </div>
                          ) : null}

                          {infobox.description && (
                            <div className="mt-3">
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {expanded
                                  ? infobox.description
                                  : infobox.description.slice(0, 140) + "..."}
                              </p>

                              {infobox.description.length > 140 && (
                                <button
                                  onClick={() => setExpanded(!expanded)}
                                  className="text-primary text-sm mt-1 hover:underline"
                                >
                                  {expanded ? "Read less" : "Read more"}
                                </button>
                              )}
                            </div>
                          )}  

                          {infobox.items?.length ? (
                            <dl className="px-3 pb-3 text-sm">
                              {infobox.items.map((row) => (
                                <div
                                  key={row.label}
                                  className="grid grid-cols-[110px_1fr] gap-3 py-2 border-t border-border/40"
                                >
                                  <dt className="text-muted-foreground">{row.label}</dt>
                                  <dd className="text-foreground">{row.value}</dd>
                                </div>
                              ))}
                            </dl>
                          ) : null}
                        </aside>
                      ) : null}

                      {children}
                    </article>
                  </div>
                </div>

                {hasToc ? (
                  <aside className="hidden lg:block shrink-0">
                    <div
                      className={`sticky top-24 transition-[width] duration-200 ${
                        tocCollapsed ? "w-12" : "w-72"
                      }`}
                    >
                      <div className="rounded-md border border-border/50 bg-card/20 overflow-hidden">
                        <div className="flex items-center justify-between px-3 py-2 border-b border-border/50">
                          <div className={tocCollapsed ? "sr-only" : "text-sm font-semibold"}>
                            Contents
                          </div>
                          <button
                            type="button"
                            onClick={() => setTocCollapsed((prev) => !prev)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border/50 bg-background/60 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label={tocCollapsed ? "Show contents" : "Hide contents"}
                            title={tocCollapsed ? "Show contents" : "Hide contents"}
                          >
                            {tocCollapsed ? (
                              <PanelRightOpen className="h-4 w-4" />
                            ) : (
                              <PanelRightClose className="h-4 w-4" />
                            )}
                          </button>
                        </div>

                        {!tocCollapsed ? (
                          <nav aria-label="Contents" className="p-3">
                            <ol className="space-y-2 text-sm">
                              {tocItems.map((item, index) => (
                                <li key={item.id}>
                                  <button
                                    type="button"
                                    onClick={() => scrollToSection(item.id)}
                                    className="w-full text-left rounded-sm px-2 py-1 hover:bg-accent/10 transition-colors"
                                  >
                                    <span className="mr-2 text-muted-foreground">
                                      {index + 1}
                                    </span>
                                    <span className="text-foreground">{item.label}</span>
                                  </button>
                                </li>
                              ))}
                            </ol>
                          </nav>
                        ) : null}
                      </div>
                    </div>
                  </aside>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {hasToc && tocDrawerOpen ? (
          <div
            className="fixed inset-0 z-[90] bg-black/60 px-4 py-6 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Table of contents"
            onClick={() => setTocDrawerOpen(false)}
          >
            <div
              className="mx-auto w-full max-w-md rounded-xl border border-white/10 bg-background p-4 shadow-card"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Contents</div>
                <button
                  type="button"
                  onClick={() => setTocDrawerOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/60 bg-card/40 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-3">
                <ol className="space-y-2 text-sm">
                  {tocItems.map((item, index) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setTocDrawerOpen(false);
                          scrollToSection(item.id);
                        }}
                        className="w-full text-left rounded-md border border-border/60 bg-card/20 px-3 py-2 hover:bg-accent/10 transition-colors"
                      >
                        <span className="mr-2 text-muted-foreground">{index + 1}</span>
                        <span className="text-foreground">{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </Layout>
  );
};

export default ArticleLayout;
