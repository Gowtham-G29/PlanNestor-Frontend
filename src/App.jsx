import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./pages/Navbar/Navbar";
import ProjectDetailsPage from "./pages/Project details/ProjectDetailsPage";
import IssueDetailsPage from "./pages/Issues/IssueDetailsPage";
import SubscriptionPage from "./pages/Subscription/SubscriptionPage";
import Auth from "./pages/AuthPages/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./Redux/Auth/Action";
import { fetchProjects } from "./Redux/Project/Action";
import UpgradeSuccessPage from "./pages/Subscription/UpgradeSuccessPage";
import AcceptInvitationPage from "./pages/Project/AcceptInvitationPage";
import LandPage from "./pages/Home/LandPage";

function App() {
  const dispatch = useDispatch();

  const { auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchProjects({ category: "fullstack" }));
  }, [auth.jwt]);

  auth;

  return (
    <>
      {auth.user ? (
        <div>
          <BrowserRouter>
            <Navbar />
            <div className="pt-18 hidden lg:block">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project/:id" element={<ProjectDetailsPage />} />
                <Route
                  path="/project/:projectId/issue/:issueId"
                  element={<IssueDetailsPage />}
                />
                <Route path="/upgrade_plan" element={<SubscriptionPage />} />
                <Route
                  path="/upgrade_plan/success"
                  element={<UpgradeSuccessPage />}
                />
                <Route
                  path="/upgrade_plan/success"
                  element={<UpgradeSuccessPage />}
                />

                <Route
                  path="/accept_invitation"
                  element={<AcceptInvitationPage />}
                />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      ) : (
        <LandPage />
      )}
    </>
  );
}

export default App;
