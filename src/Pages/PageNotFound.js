import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Component/Layout";

const PageNotFound = () => {
  return (
    <Layout title={"Go back - Oops Page Not Found"}>
      <div className="pnf container">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops! Page Not Found</h2>
        <Link to="/" className="pnf-btn">
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
