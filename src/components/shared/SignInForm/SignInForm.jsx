import React from "react";
import { Formik } from "formik";
import useAuth from "../../../Hook/useAuth";
import style from "./index.module.css"
const SignInForm = ({ setIsSignUp }) => {
  const { signIn, isLoading, error } = useAuth()
  return (
    <Formik
      initialValues={{ username: "John_1", email: "john@gmail.com", password: "aaaaaaaa" }}
      onSubmit={async (values, actions) => {
        let { auth } = await signIn(values)
        auth && actions.resetForm({ values: { username: "", email: "", password: "" } })
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit
      }) => (
        <form
          onSubmit={handleSubmit}
          className="p-3 card d-flex flex-column align-items-center justify-content-center"
          style={{ backgroundColor:"var(--form-bg-color)"}}
        >
          <h3 className="text-light fw-bold">Sign In</h3>
          <h6 className="text-danger">{error ? error : ""}</h6>
          <div className="mb-3 w-100">
            <label htmlFor="username" className="form-label mb-0 d-flex text-secondary" style={{ fontSize: "0.8rem" }}>
              <div>User Name</div>
            </label>
            <input
              required
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              name="username"
              type="text"
              minLength='1'
              className={`${signIn} form-control text-light`}
              style={{ backgroundColor: "var(--form-input-bg-color)", border: "none" }}
              id="username"
              placeholder="John"
              autoComplete="on"
            />
          </div>
          <div className="mb-3 w-100">
            <label htmlFor="email" className="form-label mb-0 d-flex text-secondary" style={{ fontSize: "0.8rem" }}>
              <div>Email address </div>
            </label>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              name="email"
              type="email"
              className={`${signIn} form-control text-light`}
              style={{ backgroundColor: "var(--form-input-bg-color)", border: "none" }}
              id="email"
              minLength='1'
              placeholder="email@example.com"
              autoComplete="on"
            />
          </div>
          <div className="mb-3 w-100">
            <label htmlFor="password" className="form-label mb-0 d-flex text-secondary" style={{ fontSize: "0.8rem" }}>
              <div>Password</div>
            </label>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              name="password"
              type="password"
              minLength="8"
              className={`${signIn} form-control text-light`}
              style={{ backgroundColor: "var(--form-input-bg-color)", border: "none" }}
              id="password"
              placeholder="min 8"
            />
          </div>
          <input type="submit" className="w-100 btn text-white" style={{ backgroundColor: "var(--blue-color)" }} disabled={isLoading} value="Sign In" />
          <div className="w-100 d-flex mt-2" style={{ fontSize: "0.8rem" }}>
            <div className="fw-medium text-secondary">Not yet account</div>
            <div
              className="mx-1 cursor-pointer text-primary"
              onClick={() => setIsSignUp(true)}
            >Create an account</div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default SignInForm;
