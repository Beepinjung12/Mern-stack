"use client";

import Header from "./Header";
import Footer from "./Footer";

export default function ClientLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
