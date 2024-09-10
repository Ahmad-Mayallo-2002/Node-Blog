import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading/loading";
import "./App.scss";
import PrivateDashboard from "./components/PrivateDashboard/privateDashboard";
import Footer from "./components/Footer/footer.jsx";

const Header = lazy(() => import("./components/Header/header.jsx"));
const Home = lazy(() => import("./pages/Home/Home.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard.jsx"));
const Projects = lazy(() => import("./pages/Projects/Projects.jsx"));
const SignIn = lazy(() => import("./pages/SignIn/SignIn.jsx"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp.jsx"));
const DashboardProfile = lazy(() =>
  import("./pages/Dashboard/DashboardProfile.jsx")
);
const DashboardCreatePost = lazy(() =>
  import("./pages/Dashboard/DashboardCreatePost.jsx")
);
const DashboardPosts = lazy(() =>
  import("./pages/Dashboard/DashboardPosts.jsx")
);
const DashboardUpdatePosts = lazy(() =>
  import("./pages/Dashboard/DashboardUpdatePost.jsx")
);
const DashboardUpdateProject = lazy(() =>
  import("./pages/Projects/UpdateProject.jsx")
);
const DashboardUpdateComment = lazy(() =>
  import("./pages/Dashboard/DashboardUpdateComment.jsx")
);
const AddProject = lazy(() => import("./pages/Projects/AddProject.jsx"));

function LoadingCenter() {
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <Loading />
    </div>
  );
}

function App() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingCenter />}>
              <Home />
            </Suspense>
          }
        />
        <Route element={<PrivateDashboard />}>
          {/* Main Link in Dashboard */}
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<LoadingCenter />}>
                <Dashboard />
              </Suspense>
            }
          >
            {/* Profile */}
            <Route
              path="/dashboard/profile"
              element={
                <Suspense fallback={<LoadingCenter />}>
                  <DashboardProfile />
                </Suspense>
              }
            />
            {/* Create Post */}
            <Route
              path="/dashboard/createPost"
              element={
                <Suspense fallback={<LoadingCenter />}>
                  <DashboardCreatePost />
                </Suspense>
              }
            />
            {/* Update Post */}
            <Route
              path="/dashboard/updatePost/:id"
              element={
                <Suspense fallback={<LoadingCenter />}>
                  <DashboardUpdatePosts />
                </Suspense>
              }
            />
            {/* All Posts */}
            <Route
              path="/dashboard/posts"
              element={
                <Suspense fallback={<LoadingCenter />}>
                  <DashboardPosts />
                </Suspense>
              }
            />
            {/* Add Project */}
            <Route
              path="/dashboard/addProject"
              element={
                <Suspense fallback={<LoadingCenter />}>
                  <AddProject />
                </Suspense>
              }
            />
            {/* Update Project */}
            <Route
              path="/dashboard/updateProject/:id"
              element={
                <Suspense fallback={<LoadingCenter />}>
                  <DashboardUpdateProject />
                </Suspense>
              }
            />
            {/* Update Comment */}
            <Route
              path="/dashboard/updateComment/:id"
              element={
                <Suspense fallback={<LoadingCenter />}>
                  <DashboardUpdateComment />
                </Suspense>
              }
            />
          </Route>
        </Route>
        {/* All Projects */}
        <Route
          path="/projects"
          element={
            <Suspense fallback={<LoadingCenter />}>
              <Projects />
            </Suspense>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Suspense fallback={<LoadingCenter />}>
              <SignIn />
            </Suspense>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Suspense fallback={<LoadingCenter />}>
              <SignUp />
            </Suspense>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
