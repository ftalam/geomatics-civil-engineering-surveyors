import geoshopLogo from "@/assets/logo-geomatics.png";
import cardBackground from "@/assets/geoshop-layout.png";

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="products-theme min-h-screen bg-slate-950 px-4 py-20">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-auto max-w-screen-md items-center justify-center">
        <div className="relative w-auto overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(155deg, rgba(4, 9, 23, 0.9) 0%, rgba(9, 16, 33, 0.7) 52%, rgba(219, 112, 35, 0.4) 100%), url(${cardBackground})`,
            }}
          />

          <div className="relative p-5 backdrop-blur-[1px] sm:p-6">
            <div className="mb-6 flex items-center gap-3">
              <img
                src={geoshopLogo}
                alt="Geoshop Limited logo"
                className="h-12 w-12 rounded-full border border-white/25 bg-white/95 object-contain p-1"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
                  A GCES Company
                </p>
                <h1 className="text-2xl font-semibold text-white">Geoshop Limited</h1>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">{title}</h2>
              {subtitle && <p className="mt-1 text-sm text-slate-200/90">{subtitle}</p>}
            </div>

            {children}

            {footer && <div className="mt-4 text-sm text-slate-100/90">{footer}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
