import React, { useRef, useState } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { useNavigate } from 'react-router-dom';
const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required!
      </div>
    )
  }
}

function Login(props) {
  const navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  }

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  }
  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password)
        .then(
          () => {
            navigate("/profile");
            window.location.reload();
          },
          (error) => {
            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            setLoading(false);
            setMessage(resMessage);
          }
        );
    }
    else {
      setLoading(false);
    }
  }
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="https://cianmaggs.github.io/google-homepage/images/loginbutton.png"
          alt="avatar logo"
          className="profile-img-top"
        />
        <Form className="form form-login" onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="from-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="text"
              className="from-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block">
              {
                loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )
              }
              <span>Login</span>
            </button>
          </div>
          {
            message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )
          }
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
}

export default Login;