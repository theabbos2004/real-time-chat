import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import useAuth from "../../../Hook/useAuth";
import style from "./index.css";
import { Link } from "react-router-dom";
import { deleteUser, getUsers, updateUser } from "../../../Hook/Api/ChatApi";
import { useDispatch, useSelector } from "react-redux";
import { userReducer } from "../../../Reducer/authReducer";

const UpdateProfileForm = () => {
  const username = useSelector((store) => store?.authStore?.user?.username);
  const uid = useSelector((store) => store?.authStore?.user?.uid);
  const [user, setUser] = useState();
  const [isSendEmailForPassword, setIsSendEmailForPassword] = useState();
  const [isUpdateUser, setIsUpdateUser] = useState();
  const { error, updatePassword, logOut, deleteUserfirebase} = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    getUsers().then((users) =>
      users.forEach((user) => username === user?.username && setUser(user))
    );
  }, [username]);

  if (user) {
    return (
      <Formik
        initialValues={{
          firstname: user?.first_name,
          lastname: user?.last_name,
          username: user?.username,
          email: user?.email,
          password: "",
        }}
        onSubmit={(values) => {
          let { firstname, lastname, username } = values;
          setIsUpdateUser(false);
          updateUser({ userId: user?.id, username, firstname, lastname })
            .then((res) => {
              setIsUpdateUser(false);
              localStorage.setItem(
                "chat_engine",
                JSON.stringify({ id: res?.id, uid, username: res?.username })
              );
              dispatch(
                userReducer({ id: res?.id, uid, username: res?.username })
              );
            })
            .catch(() => setIsUpdateUser(false));
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className="p-3 col-8 col-sm-6 col-md-4 card d-flex flex-column align-items-center justify-content-center text-secondary"
            style={{ backgroundColor: "var(--form-bg-color)" }}
          >
            <div className="w-100 row justify-content-between align-items-center position-relative">
              <div className="col-sm-4 col-12 py-1 position-relative d-flex justify-content-center d-sm-block">
                <img
                  src={
                    user?.avatar
                      ? user?.avatar
                      : require("../../../assets/img/profile-anonim.png")
                  }
                  title="profile"
                  className="rounded-5 object-fit-cover"
                  style={{ width: "2rem", height: "2rem" }}
                  alt="img"
                />
              </div>
              <div className="col-12 col-sm-8 p-0 d-flex align-items-center justify-content-between justify-content-lg-end">
                <Link to="/" className="text-decoration-none fw-bold">
                  Go to back
                </Link>
              </div>
            </div>
            <h6 className="text-danger">{error ? error : ""}</h6>
            <div className="mb-3 w-100 d-flex justify-content-between">
              <div className="col-5">
                <label
                  htmlFor="firstname"
                  className="form-label mb-0 d-flex"
                  style={{ fontSize: "0.8rem", color:"var(--input-label-color)"}}
                >
                  First name
                </label>
                <input
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstname}
                  name="firstname"
                  type="text"
                  minLength="1"
                  className={`${style.signIn} form-control text-light`}
                  style={{ backgroundColor: "var(--form-input-bg-color)", border: "none"}}
                  id="firstname"
                  placeholder="first name"
                />
              </div>
              <div className="col-5">
                <label
                  htmlFor="lastname"
                  className="form-label mb-0 d-flex"
                  style={{ fontSize: "0.8rem", color:"var(--input-label-color)"}}
                >
                  <div>Last name</div>
                </label>
                <input
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastname}
                  name="lastname"
                  type="text"
                  minLength="1"
                  className={`${style.signIn} form-control text-light`}
                  style={{ backgroundColor: "var(--form-input-bg-color)", border: "none" }}
                  id="lastname"
                  placeholder="last name"
                />
              </div>
            </div>
            <div className="mb-3 w-100">
              <label
                htmlFor="username"
                className="form-label mb-0 d-flex"
                style={{ fontSize: "0.8rem" ,color:"var(--input-label-color)"}}
              >
                <div>User name</div>
              </label>
              <input
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                name="username"
                type="text"
                minLength="1"
                className={`${style.signIn} form-control text-light`}
                style={{ backgroundColor: "var(--form-input-bg-color)", border: "none" }}
                id="username"
                placeholder="user name"
                autoComplete="on"
              />
            </div>
            <div className="mb-3 w-100">
              <label
                htmlFor="email"
                className="form-label mb-0 d-flex"
                style={{ fontSize: "0.8rem" ,color:"var(--input-label-color)"}}
              >
                <div>Email address </div>
              </label>
              <input
                disabled
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                name="email"
                type="email"
                className={`${style.signIn} form-control`}
                style={{
                  backgroundColor: "var(--form-input-bg-color)",
                  color: "rgb(150,150,150)",
                  border: "none",
                }}
                id="email"
                placeholder="email@example.com"
                autoComplete="on"
              />
            </div>
            <div className="mb-3 w-100 d-flex justify-content-between pb-3">
              <input
                type="submit"
                className="col-5 btn fw-bold text-white text-wrap"
                style={{background:"var(--blue-color)"}}
                disabled={isUpdateUser}
                value={isUpdateUser ? "... Loading" : "Change Profile"}
              />
              <button
                type="button"
                className="col-5 btn fw-bold text-white"
                style={{background:"var(--blue-color)"}}
                onClick={() => {
                  setIsSendEmailForPassword(true);
                  updatePassword({ email: values?.email });
                }}
              >
                {isSendEmailForPassword
                  ? "we Send Email message"
                  : "Change password"}
              </button>
            </div>
            <div 
              className="d-flex w-100 justify-content-between border-top pt-3"
            >
              <button
                type="button"
                onClick={logOut}
                to="/"
                className="btn col-5 btn-outline-warning border-2 fw-semibold text-decoration-none m-0 py-sm-1 px-sm-2 py-1 px-2"
              >
                Log Out
              </button>
              <button
                type="button"
                onClick={()=> user?.id && deleteUserfirebase()
                      .then(res=>res?.type ? deleteUser({userId:user?.id}) : alert(res?.result))}
                to="/"
                className="btn col-5 btn-outline-danger border-2 text-decoration-none fw-semibold m-0 py-sm-1 px-sm-2 py-1 px-2"
              >
                Delete acount
              </button>
            </div>
          </form>
        )}
      </Formik>
    );
  }
};

export default UpdateProfileForm;
