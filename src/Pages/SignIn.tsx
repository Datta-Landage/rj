import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Layout from "../Component/Layout";
import "./Css/Sign.css";
import "./Css/All.css";
import { validateEmail, validatePassword } from "./Validation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "../store/useUserStore";

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const setUser = useUserStore((state) => state.setUser);

  async function loginUser(e) {
    e.preventDefault();

    if (!email || !password) {
      setError(true);
      return;
    }

    if (!validateEmail(email)) {
      setError(true);
      return;
    }

    if (!validatePassword(password)) {
      setError(true);
      return;
    }

    try {
      console.warn({ email, password });
      let data = { email, password };

      const response = await fetch(
        `https://api-backend-plum.vercel.app/signIn`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const apiData = await response.json();
        toast.success("Welcome to Connecting ID's !", {
          position: "top-center",
        });
        localStorage.setItem("userData", JSON.stringify(apiData.data));
        setUser(apiData.data);
        navigate("/myaccount");
      } else {
        toast.warning("Wrong Credential !", {
          position: "top-center",
          theme: "light",
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.warning("An error occurred while processing your request.", {
        position: "top-center",
      });
    }
    setEmail("");
    setPassword("");
  }

  return (
    <Layout title={"SignUp Page"}>
      <div className="d-flex justify-content-center">
        <div className="py-4 rounded sign-box bg-warning d-flex justify-content-between align-items-center">
          <div className="mx-4 form-info">
            <h6>Welcome to</h6>
            <h1>Connecting IDs</h1>
          </div>
          <div className="rounded form">
            <div className="pb-4 Signing-optn d-flex justify-content-between">
              <Link
                to="/signup"
                className="text-decoration-none text-secondary"
              >
                <h4>Sign Up</h4>
              </Link>
              <Link to="/signin" className="text-decoration-none">
                <h5>Sign In</h5>
              </Link>
            </div>
            <div>
              <form>
                <div
                  className={` my-2 ${
                    error && !validateEmail(email) ? "error-border" : "inputbox"
                  }`}
                >
                  <label className="cid-label">Email</label>
                  <br />
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    name="email"
                    placeholder="Email Id"
                    required
                  />
                  {error && !validateEmail(email) && (
                    <small>
                      <span className="error-text text-danger">
                        Invalid email
                      </span>
                    </small>
                  )}
                </div>
                <div
                  className={` my-2 ${
                    error && !validatePassword(password)
                      ? "error-border"
                      : "inputbox"
                  }`}
                >
                  <label className="cid-label">Password</label>
                  <br />
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    name="password"
                    required
                  />
                  {error && !validatePassword(password) && (
                    <small>
                      <span className="error-text text-danger">
                        Password must contain 1 number 1 uppercase & lowercase
                        and 8 characters
                      </span>
                    </small>
                  )}
                </div>
                <div className="forget-box">
                  <Link to="/changepassword" className="my-4 text-end">
                    <p>Forgot Password</p>
                  </Link>
                </div>
                <button
                  id="sign"
                  className="p-2 my-3 btn-primary-cidblue w-100"
                  onClick={loginUser}
                >
                  Sign In
                </button>
              </form>
              <p className="my-3">or sign up with</p>
              <div className="signing-options d-flex justify-content-between">
                <button id="sign-option">Linkedin</button>
                <button id="sign-option">Google</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}

export default SignIn;
