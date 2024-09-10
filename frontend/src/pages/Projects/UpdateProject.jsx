import React from "react";
import { useParams } from "react-router-dom";
import SetProject from "../../components/SetProjects/SetProject.jsx";

export default function UpdateProject() {
  const { id } = useParams();

  return (
    <>
      <SetProject
        title="Update Project"
        requestType={"PATCH"}
        url={`update-project/${id}`}
        required={false}
      />
    </>
  );
}
