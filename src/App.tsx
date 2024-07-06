import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./router/Layout";
import { lazy, Suspense } from "react";
import { theme } from "./theme";
import { ThemeProvider } from "@emotion/react";
import DataProvider from "./Contexts/QuizContext";
import NotFound from "./router/Pages/NotFound";
import { ErrorBoundary } from "react-error-boundary";
import Error from "./components/Error";

const LazyCreate = lazy(() => import("./components/CreateCustomQuiz"));
const LazyQuizies = lazy(() => import("./router/Pages/Quizies"));
const LazyQuizDetail = lazy(() => import("./components/QuizDetail"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/Quiz" element={<Layout />}>
      <Route
        index
        element={
          <Suspense fallback={<></>}>
            <LazyQuizies />
          </Suspense>
        }
      />
      <Route
        path="detail/:quizID"
        element={
          <Suspense fallback={<></>}>
            <LazyQuizDetail />
          </Suspense>
        }
      />
      <Route
        path="create"
        element={
          <Suspense fallback={<></>}>
            <LazyCreate />
          </Suspense>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={Error}
      onReset={() => (window.location.href = "/Quiz")}
    >
      <DataProvider>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </DataProvider>
    </ErrorBoundary>
  );
}

export default App;
