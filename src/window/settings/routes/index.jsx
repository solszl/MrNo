import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const GeneralPage = lazy(() => import("../pages/general"));
const AboutPage = lazy(() => import("../pages/about"));
const TranslatePage = lazy(() => import("../pages/translate"));
const ShortcutPage = lazy(() => import("../pages/shortcut"));
const routes = [
  {
    path: "/general",
    element: (
      <Suspense fallback="loading...">
        <GeneralPage />
      </Suspense>
    ),
  },
  {
    path: "/about",
    element: (
      <Suspense fallback="loading...">
        <AboutPage />
      </Suspense>
    ),
  },
  {
    path: "/translate",
    element: (
      <Suspense fallback="loading">
        <TranslatePage />
      </Suspense>
    ),
  },
  {
    path: "/shortcut",
    element: (
      <Suspense fallback="loading...">
        <ShortcutPage />
      </Suspense>
    ),
  },
  {
    path: "/settings.html",
    element: <Navigate to="/general" />,
  },
  {
    path: "/",
    element: <Navigate to="/general" />,
  },
];

export default routes;
