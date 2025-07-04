// src/components/common/ProtectedRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactElement;
  role?: "Admin" | "User";
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Jika belum login, arahkan ke halaman login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user?.role !== role) {
    // Jika sudah login tapi rolenya tidak sesuai, arahkan ke halaman utama
    // Anda bisa juga membuat halaman khusus "Tidak Diizinkan" (403 Forbidden)
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
