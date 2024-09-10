import React from "react";
import SetProject from "../../components/SetProjects/SetProject.jsx";

export default function AddProject() {
  return (
    <>
      <SetProject
        title={"Add New Project"}
        requestType="POST"
        url="add-project"
      />
    </>
  );
}
