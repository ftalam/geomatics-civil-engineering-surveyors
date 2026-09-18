geomatics-civil-engineering-surveyors-main/
│
├── src/
│   ├── main.jsx                              ✅ Application entry point
│   ├── App.jsx                               ✅ Providers and route registry
│   ├── App.css                               ✅ Global application styles
│   ├── index.css                             ✅ Tailwind/global styles
│   │
│   ├── pages/                                ✅ Route-level screens
│   │   ├── Index.jsx                          ✅ Homepage
│   │   ├── About.jsx                          ✅ Marketing page
│   │   ├── AboutUs.jsx                        ✅ Geoshop about page
│   │   ├── Industries.jsx                     ✅ Industries page
│   │   ├── Services.jsx                       ✅ Services listing
│   │   ├── ServiceDetail.tsx                  ✅ Service details
│   │   ├── Products.tsx                       ✅ Product catalogue
│   │   ├── Geoshop.jsx                        ✅ Commerce application
│   │   ├── Login.jsx                          ✅ Supabase login
│   │   ├── Register.jsx                       ⚠️ OTP flow needs alignment
│   │   ├── MyOrders.jsx                       ✅ Protected orders page
│   │   ├── AdminDashboard.jsx                 ✅ Admin order management
│   │   ├── Contact.jsx                        ✅ Contact page
│   │   ├── Privacy.jsx                        ✅ Privacy page
│   │   ├── Terms.jsx                          ✅ Terms page
│   │   └── NotFound.tsx                       ✅ Catch-all route
│   │
│   ├── components/                            ✅ Shared application components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   │   ├── AuthLayout.jsx
│   │   ├── CartDrawer.jsx
│   │   ├── ProfileSheet.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── AdminRoute.jsx
│   │   └── ui/                               ✅ Radix/shadcn UI primitives
│   │
│   ├── context/
│   │   └── AuthContext.jsx                    ✅ Auth/session/profile state
│   │
│   ├── hooks/
│   │   ├── useOrderHistory.js                 ✅ Order fetching/realtime updates
│   │   ├── use-mobile.tsx                     ✅ Responsive breakpoint helper
│   │   └── use-toast.ts                       ✅ Toast helper
│   │
│   ├── lib/
│   │   ├── supabaseClient.js                  ✅ Main Supabase client
│   │   ├── supabaseRetry.js                   ✅ Auth/session retry handling
│   │   └── utils.ts                           ✅ Shared utilities
│   │
│   ├── integrations/supabase/
│   │   ├── client.ts                          ⚠️ Duplicate Supabase client
│   │   └── types.ts                           ⚠️ Database types are empty
│   │
│   ├── data/
│   │   └── services.ts                        ✅ Static service definitions
│   │
│   ├── utils/
│   │   └── cart.js                            ✅ localStorage cart handling
│   │
│   └── test/
│       ├── example.test.ts                    ✅ Test setup
│       └── services.test.ts                   ✅ Service tests
│
├── functions/                                ⚠️ OTP/serverless code
│   ├── send-otp/index.js                     ⚠️ Deno/Supabase Edge style
│   └── verify-otp/index.js                   ⚠️ Environment mismatch
│
├── supabase/
│   ├── config.toml                            ✅ Supabase project reference
│   ├── reconcile-orders-profiles.sql         ⚠️ Schema/RLS setup script
│   ├── products-details.sql                   ⚠️ Product schema extension
│   └── order-special-requests.sql             ⚠️ Order schema extension
│
├── public/
│   ├── _redirects                             ✅ SPA fallback, Netlify-style
│   ├── robots.txt                             ✅ Crawler configuration
│   ├── catalogue/                             ✅ Product/catalogue assets
│   └── profiles/                              ✅ Profile assets
│
├── package.json                               ✅ Scripts and dependencies
├── vite.config.ts                             ✅ Vite configuration
├── vitest.config.ts                           ✅ Test configuration
├── tsconfig*.json                             ✅ TypeScript configuration
├── tailwind.config.ts                         ✅ Tailwind configuration
├── postcss.config.js                          ✅ PostCSS configuration
└── .env                                       ⚠️ Local environment configuration (Partial)