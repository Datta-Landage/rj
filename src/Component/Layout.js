import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import '../Pages/Css/All.css'

function Layout({children, title}){
    return (
      <div>
        <Header />
        <main className="py-5" style={{ minHeight: "100vh", backgroundColor: "whitesmoke" }}>
          <Toaster />
          {children}
        </main>
        <Footer />
      </div>
    );
}

export default Layout;