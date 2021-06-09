import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";

// 보면 admitRoute는 관리자로 들어갈때 필요한 값이고 아무것도 없으면 그냥 null로 넣는다는 뜻 ES6문법
export default function Auth(SpecificComponent, option, admintRoute = null) {
  // option의 값
  // null  => 아무나 출입이 가능한 페이지
  // true  => 로그인한 유저만 출입이 가능한 페이지
  // false => 로그인한 유저는 출입이 불가능한 페이지

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then((response) => {
        // 로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          // 로그인 한 상태
          if (admintRoute && !response.payload.isAdmin) {
            props.history.push("/");
          } else {
            if (!option) {
              props.history.push("/");
            }
          }
        }

        //console.log(response);
      });
    }, []);
    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
