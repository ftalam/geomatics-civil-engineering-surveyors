import cardBackground from "@/assets/geoshop-layout.png";

export default function AuthLayout({ title, subtitle, children, footer }) {
  const isLogin = title.toLowerCase().includes("login");

  return (
    <div className="min-h-50vh bg-slate-100 px-4 py-4">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl items-center">
        <div className="w-full overflow-hidden rounded-3xl bg-white shadow-lg lg:flex">
          <div className="relative w-full p-8 md:p-10 lg:w-1/2">
            {isLogin && (
              <>
                <img
                  src={cardBackground}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover opacity-15"
                />
                <div className="absolute inset-0 bg-white/90" />
              </>
            )}

            <div className="relative z-10">
              

              <div className="mb-8 mt-6">
                <h1 className="text-2xl font-semibold text-gray-800">
                  {isLogin ? "Welcome back" : "Create account"}
                </h1>
                {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
              </div>

              {children}

              {footer && <div className="mt-6 text-center text-sm">{footer}</div>}
            </div>
          </div>

          <div className="relative hidden bg-cyan-50 lg:block lg:w-1/2">
            <img
              src={cardBackground}
              alt="Geoshop layout"
              className="absolute inset-0 h-full w-full object-fit-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-10 text-white">
              <h2 className="mb-3 text-3xl font-bold">
                {isLogin ? "Welcome Back" : "Welcome to geoshop"}
              </h2>
              <p className="mb-5">
                Access your surveying projects and tools for accurate leveling and
                precision measurements.
              </p>
              <div className="flex space-x-2">
                <div className="h-2 w-2 rounded-full bg-white" />
                <div className="h-2 w-2 rounded-full bg-white/50" />
                <div className="h-2 w-2 rounded-full bg-white/50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}