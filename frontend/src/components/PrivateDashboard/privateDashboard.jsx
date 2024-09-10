import React from "react";
import { Outlet, Navigate } from "react-router-dom";
export default function PrivateDashboard() {
  if (!localStorage.getItem("userData")) alert("Please Sign In to Blog First");
  return localStorage.getItem("userData") ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" />
  );
}
