import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";
import axios from "axios";
import { withRouter } from "react-router-dom";
// import { getCookieValue } from "../../../utils/getCookieValue";

const Navbar = (props) => {
  const firstRender = JSON.parse(window.localStorage.getItem("firstRender"));

  // useEffect(() => {
  //   window.localStorage.setItem("firstRender", true);
  // }, []);

  const onClickHandler = () => {
    axios.get("/api/users/logout").then((response) => {
      console.log(response.data.success);
      if (response.data.success) {
        window.localStorage.setItem("firstRender", false);
        // withRouter이 있어야지만 아래 코드를 쓸 수 있다.
        props.history.push("/");
      } else {
        alert("로그아웃 실패");
      }
    });
  };

  return (
    <div>
      <Nav>
        <NavLink to="/">
          <h1>LOGO</h1>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/" activestyle="true">
            About
          </NavLink>
          <NavLink to="/" activestyle="true">
            Services
          </NavLink>
          <NavLink to="/" activestyle="true">
            Contact Us
          </NavLink>
          <NavLink to="/" activestyle="true">
            Sign Up
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>

        <>
          {!firstRender ? (
            <>
              <NavBtn style={{ margin: "0 0 0 50px" }}>
                <NavBtnLink to="/login">로그인</NavBtnLink>
              </NavBtn>

              <NavBtn>
                <NavBtnLink to="/register">회원가입</NavBtnLink>
              </NavBtn>
            </>
          ) : (
            <>
              <NavBtn>
                <NavBtnLink onClick={onClickHandler}>로그아웃</NavBtnLink>
              </NavBtn>
            </>
          )}
        </>
      </Nav>
    </div>
  );
};

export default withRouter(Navbar);
