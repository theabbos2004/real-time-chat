import React, { memo } from "react";
import { Formik } from "formik";
import useAuth from "../../../Hook/useAuth";
import style from "./index.module.css"
import { useNavigate } from "react-router-dom";
const SignUpForm = ({ setIsSignUp }) => {
  const { signUp, isLoading, error } = useAuth()
  const navigate = useNavigate()
  return (
    <Formik
      initialValues={{ firstname:"",lastname:"", username: "", email: "", password: ""}}
      onSubmit={async (values, actions) => {
        let {firstname,lastname,username,email,password}=values
        if (firstname?.length && lastname?.length && username?.length && email?.length && password?.length) {
          let { auth } = await signUp(values)
          if(auth){
            actions.resetForm({ values: { firstname:"",lastname:"",username: "", email: "", password: ""} })
            navigate("/")
          }
        }
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="p-3 col-8 col-sm-6 col-md-4 card d-flex flex-column align-items-center justify-content-center"
          style={{backgroundColor:"var(--form-bg-color)"}}
        >
          <h3 className="text-light fw-bold">Sign Up</h3>
          <h6 className="text-danger">{error ? error : ""}</h6>
          <div className="mb-3 w-100 d-flex justify-content-between">
            <div className="col-5">
              <label htmlFor="firstname" className="form-label text-secondary mb-0 d-flex" style={{ fontSize: "0.8rem" }}>
                First name
              </label>
              <input
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstname}
                name="firstname"
                type="text"
                minLength='1'
                className={`${style.signIn} form-control text-light`}
              style={{backgroundColor:"var(--form-input-bg-color)",border:"none"}}
                id="firstname"
                placeholder="first name"
                autoComplete="on"
              />
            </div>
            <div className="col-5">
              <label htmlFor="lastname" className="form-label text-secondary mb-0 d-flex" style={{ fontSize: "0.8rem" }}>
                <div>Last name</div>
              </label>
              <input
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastname}
                name="lastname"
                type="text"
                minLength='1'
                className={`${style.signIn} form-control text-light`}
              style={{backgroundColor:"var(--form-input-bg-color)",border:"none"}}
                id="lastname"
                placeholder="last name"
                autoComplete="on"
              />
            </div>
          </div>
          <div className="mb-3 w-100">
            <label htmlFor="username" className="form-label text-secondary mb-0 d-flex" style={{ fontSize: "0.8rem" }}>
              <div>User name</div>
            </label>
            <input
              required
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              name="username"
              type="text"
              minLength='1'
              className={`${style.signIn} form-control text-light`}
              style={{backgroundColor:"var(--form-input-bg-color)",border:"none"}}
              id="username"
              placeholder="user name"
              autoComplete="on"
            />
          </div>
          <div className="mb-3 w-100">
            <label htmlFor="email" className="form-label text-secondary mb-0 d-flex" style={{ fontSize: "0.8rem" }}>
              <div>Email address </div>
            </label>
            <input
              required
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              name="email"
              type="email"
              className={`${style.signIn} form-control text-light`}
              style={{backgroundColor:"var(--form-input-bg-color)",border:"none"}}
              id="email"
              placeholder="email@example.com"
              autoComplete="on"
            />
          </div>
          <div className="mb-3 w-100">
            <label htmlFor="password" className="form-label text-secondary mb-0 d-flex" style={{ fontSize: "0.8rem" }}>
              <div>Password</div>
            </label>
            <input
              required
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              name="password"
              type="password"
              minLength="8"
              className={`${style.signIn} form-control text-light`}
              style={{backgroundColor:"var(--form-input-bg-color)",border:"none"}}
              id="password"
              placeholder="min 8"
              autoComplete="on"
            />
          </div>
          <input type="submit" className="w-100 btn text-white" style={{backgroundColor:"var(--blue-color)"}} disabled={isLoading} value={isLoading ? "... Loading" : "Sign Up"} />
          <div className="w-100 d-flex m-2" style={{ fontSize: "0.8rem" }}>
            <div className="fw-medium text-secondary">If you've account</div>
            <div
              className="ms-2 cursor-pointer text-primary"
              onClick={() => setIsSignUp(false)}
            >I've account</div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default memo(SignUpForm);
