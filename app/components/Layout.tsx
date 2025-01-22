import React from "react";
import Header from "./header";


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Contenu de la page */}
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;