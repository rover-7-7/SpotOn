/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars

// eslint-disable-next-line no-unused-vars

import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Glowing from "./Glowing";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../firebase.js";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faGithub,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const LoginBox = styled.div`
  position: absolute;
  width: 400px;
  form {
    width: 100%;
    padding: 0 50px;
  }
  h2 {
    font-size: 2em;
    color: #00fffc;
    text-align: center;
  }
`;

const InputBox = styled.div`
  position: relative;
  margin: 25px 0;
  input {
    width: 100%;
    height: 50px;
    background: transparent;
    border: 2px solid #2c4766;
    outline: none;
    border-radius: 40px;
    font-size: 1em;
    color: #fff;
    padding: 0 20px;
    transition: 0.5s;
    &:focus,
    &:valid {
      border-color: #00fffc;
    }
  }
  label {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    font-size: 1em;
    color: #fff;
    pointer-events: none;
    transition: 0.5s ease;
    &:focus-within {
      top: 1px;
      font-size: 0.8em;
      background-color: #1f293a;
      padding: 0 6px;
      color: #00fffc;
    }
  }
`;

const ForgotPassword = styled.div`
  margin: -15px 0 10px;
  text-align: center;
  a {
    font-size: 0.85em;
    color: #fff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Button = styled.button`
  width: 100%;
  height: 45px;
  border-radius: 45px;
  background: #00fffc;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1em;
  color: #1f293a;
  font-weight: 600;
`;

const SignupLink = styled.div`
  margin: 20px 0 10px;
  text-align: center;
  a {
    font-size: 1em;
    color: #00fffc;
    text-decoration: none;
    font-weight: 600;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const animateBlink = keyframes`
  0% {
    background: #00fffc;
  }
  25% {
    background: #2c4766;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  min-height: 100vh;
`;

const BlinkingSpan = styled.span`
  position: absolute;
  margin-left: -15%;
  width: 3%;
  height: 5px;
  background: #2c4766;
  border-radius: 8px;
  transform-origin: 128px;
  transform: scale(2.2) rotate(${(props) => props.index * (360 / 50)}deg);
  animation: ${animateBlink} 1s linear infinite;
  animation-delay: ${(props) => props.index * (3 / 50)}s;
`;

const Wrapper = styled.ul`
  display: inline-flex;
  list-style: none;
  padding: 0;
`;

const Icon = styled.li`
  position: relative;
  background: #ffffff;
  color: #000000;
  border-radius: 50%;
  padding: 15px;
  margin: 10px;
  width: 50px;
  height: 50px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  &:hover .tooltip {
    top: -45px;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  &:hover span,
  &:hover .tooltip {
    text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
  }

  &.facebook:hover,
  &.facebook:hover .tooltip,
  &.facebook:hover .tooltip::before {
    background: #1877f2;
    color: #ffffff;
  }

  &.twitter:hover,
  &.twitter:hover .tooltip,
  &.twitter:hover .tooltip::before {
    background: #1da1f2;
    color: #ffffff;
  }

  &.instagram:hover,
  &.instagram:hover .tooltip,
  &.instagram:hover .tooltip::before {
    background: #e4405f;
    color: #ffffff;
  }

  &.github:hover,
  &.github:hover .tooltip,
  &.github:hover .tooltip::before {
    background: #333333;
    color: #ffffff;
  }

  &.youtube:hover,
  &.youtube:hover .tooltip,
  &.youtube:hover .tooltip::before {
    background: #cd201f;
    color: #ffffff;
  }
`;

const Tooltip = styled.span`
  position: absolute;
  top: 0;
  font-size: 14px;
  background: #ffffff;
  color: #ffffff;
  padding: 5px 8px;
  border-radius: 5px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  &::before {
    position: absolute;
    content: "";
    height: 8px;
    width: 8px;
    background: #ffffff;
    bottom: -3px;
    left: 50%;
    transform: translate(-50%) rotate(45deg);
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
`;

const Signup = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("email");
    if (user) {
      navigate("/Homescr");
    }
  }, [navigate]);

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        localStorage.setItem("email", data.user.email);
        navigate("/Homescr");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/Homescr");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div style={{ display: "inline-flex", gap: "30%", flexWrap: "wrap" }}>
      {" "}
      <div className="content h-auto mr-12 mt-28">
        <h1 className="title text-left ">
          SPOTON
          <div className="aurora">
            <div className="aurora__item"></div>

            <div className="aurora__item"></div>
            <div className="aurora__item"></div>
            <div className="aurora__item"></div>
          </div>
        </h1>
        <h1 style={{ fontSize: "200%" }}>One Stop Destination</h1>
        <br />
        <div>
          <span style={{ color: "blue" }}>Discover</span> the Magic of Soothing
          Music Welcome to our sanctuary of soothing music,
        </div>
        <p>
          {" "}
          <Link to="/login">
            {" "}
            <Glowing name="Login" />
          </Link>
          <Glowing name="Learn More" />
        </p>
      </div>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;800&display=swap");

        :root {
          --bg: #000000;
          --clr-1: #00c2ff;
          --clr-2: #33ff8c;
          --clr-3: #ffc640;
          --clr-4: #e54cff;
          --blur: 1rem;
          --fs: clamp(3rem, 8vw, 7rem);
          --ls: clamp(-1.75px, -0.25vw, -3.5px);
        }

        body {
          min-height: 100vh;
          display: grid;
          background-color: var(--bg);
          color: #fff;
          font-family: "Inter", "DM Sans", Arial, sans-serif;
        }

        *,
        *::before,
        *::after {
          font-family: inherit;
          box-sizing: border-box;
        }

        .content {
          text-align: left;
        }

        .title {
          font-size: var(--fs);
          font-weight: 800;
          letter-spacing: var(--ls);
          position: relative;
          overflow: hidden;
          background: var(--bg);
          margin: 0;
        }

        .subtitle {
        }

        .aurora {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          mix-blend-mode: darken;
          pointer-events: none;
        }

        .aurora__item {
          overflow: hidden;
          position: absolute;
          width: 60vw;
          height: 60vw;
          background-color: var(--clr-1);
          border-radius: 37% 29% 27% 27% / 28% 25% 41% 37%;
          filter: blur(var(--blur));
          mix-blend-mode: overlay;
        }

        .aurora__item:nth-of-type(1) {
          top: -50%;
          animation: aurora-border 6s ease-in-out infinite,
            aurora-1 5s ease-in-out infinite alternate;
        }

        .aurora__item:nth-of-type(2) {
          background-color: var(--clr-3);
          right: 0;
          top: 0;
          animation: aurora-border 6s ease-in-out infinite,
            aurora-2 5s ease-in-out infinite alternate;
        }

        .aurora__item:nth-of-type(3) {
          background-color: var(--clr-2);
          left: 0;
          bottom: 0;
          animation: aurora-border 6s ease-in-out infinite,
            aurora-3 3s ease-in-out infinite alternate;
        }

        .aurora__item:nth-of-type(4) {
          background-color: var(--clr-4);
          right: 0;
          bottom: -50%;
          animation: aurora-border 6s ease-in-out infinite,
            aurora-4 13s ease-in-out infinite alternate;
        }

        @keyframes aurora-1 {
          0% {
            top: 0;
            right: 0;
          }
          50% {
            top: 100%;
            right: 75%;
          }
          75% {
            top: 100%;
            right: 25%;
          }
          100% {
            top: 0;
            right: 0;
          }
        }

        @keyframes aurora-2 {
          0% {
            top: -50%;
            left: 0%;
          }
          60% {
            top: 100%;
            left: 75%;
          }
          85% {
            top: 100%;
            left: 25%;
          }
          100% {
            top: -50%;
            left: 0%;
          }
        }

        @keyframes aurora-3 {
          0% {
            bottom: 0;
            left: 0;
          }
          40% {
            bottom: 100%;
            left: 75%;
          }
          65% {
            bottom: 40%;
            left: 50%;
          }
          100% {
            bottom: 0;
            left: 0;
          }
        }

        @keyframes aurora-4 {
          0% {
            bottom: -50%;
            right: 0;
          }
          50% {
            bottom: 0%;
            right: 40%;
          }
          90% {
            bottom: 50%;
            right: 25%;
          }
          100% {
            bottom: -50%;
            right: 0;
          }
        }

        @keyframes aurora-border {
          0% {
            border-radius: 37% 29% 27% 27% / 28% 25% 41% 37%;
          }
          25% {
            border-radius: 47% 29% 39% 49% / 61% 19% 66% 26%;
          }
          50% {
            border-radius: 57% 23% 47% 72% / 63% 17% 66% 33%;
          }
          75% {
            border-radius: 28% 49% 29% 100% / 93% 20% 64% 25%;
          }
          100% {
            border-radius: 37% 29% 27% 27% / 28% 25% 41% 37%;
          }
        }

        /* -- YouTube Link Styles -- */

        #source-link {
          top: 60px;
        }

        #source-link > i {
          color: rgb(94, 106, 210);
        }

        #yt-link {
          top: 10px;
        }

        #yt-link > i {
          color: rgb(219, 31, 106);
        }

        .meta-link {
          align-items: center;
          backdrop-filter: blur(3px);
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          display: inline-flex;
          gap: 5px;
          left: 10px;
          padding: 10px 20px;
          position: fixed;
          text-decoration: none;
          transition: background-color 600ms, border-color 600ms;
          z-index: 10000;
        }

        .meta-link:hover {
          background-color: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .meta-link > i,
        .meta-link > span {
          height: 20px;
          line-height: 20px;
        }

        .meta-link > span {
          color: white;
          font-family: "Rubik", sans-serif;
          transition: color 600ms;
        }
      `}</style>
      <Container className="ml-12">
        <LoginBox>
          <h2>Signup</h2>
          <form action="#">
            <InputBox>
              <input
                type="string"
                required
                label="Name"
                placeholder="Name"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, name: event.target.value }))
                }
              />
            </InputBox>
            <InputBox>
              <input
                type="email"
                required
                placeholder="Email"
                label="Email"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, email: event.target.value }))
                }
              />
            </InputBox>
            <InputBox>
              <input
                type="password"
                required
                placeholder="Password"
                label="Password"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, pass: event.target.value }))
                }
              />
            </InputBox>

            <button
              type="submit"
              onClick={handleSubmission}
              disabled={submitButtonDisabled}
            >
              Signup
            </button>
            <SignupLink>
              <a href="/login">Login</a>
            </SignupLink>
            <img
              src="google.png"
              alt=""
              style={{ height: "50px", width: "250px", borderRadius: "10px" }}
              onClick={handleClick}
            />
          </form>
        </LoginBox>
        {[...Array(50)].map((_, i) => (
          <BlinkingSpan key={i} index={i} />
        ))}
      </Container>
      <div
        style={{
          background: "#000",
          height: "100vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Wrapper>
          <Icon className="facebook">
            <Tooltip>Facebook</Tooltip>
            <FontAwesomeIcon icon={faFacebookF} />
          </Icon>
          <Icon className="twitter">
            <Tooltip>Twitter</Tooltip>
            <FontAwesomeIcon icon={faTwitter} />
          </Icon>
          <Icon className="instagram">
            <Tooltip>Instagram</Tooltip>
            <FontAwesomeIcon icon={faInstagram} />
          </Icon>
          <Icon className="github">
            <Tooltip>Github</Tooltip>
            <FontAwesomeIcon icon={faGithub} />
          </Icon>
          <Icon className="youtube">
            <Tooltip>Youtube</Tooltip>
            <FontAwesomeIcon icon={faYoutube} />
          </Icon>
        </Wrapper>
      </div>
    </div>
  );
};

export default Signup;
