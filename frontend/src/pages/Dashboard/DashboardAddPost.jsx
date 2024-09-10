import React from "react";
import SetProject from "../../components/SetProjects/SetProject.jsx";
export default function DashboardAddPost() {
  return (
    <>
      <SetProject title="Add Project" url="add-project" requestType="POST" />
    </>
  );
}
