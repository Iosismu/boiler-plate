import React from "react";
import NavBar from "../NavBar/index";

function LandingPage() {
  // const { store } = props;
  // console.log(store);
  return (
    <>
      <>
        <NavBar></NavBar>
      </>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <h2>시작페이지</h2>
      </div>
    </>
  );
}

export default LandingPage;
