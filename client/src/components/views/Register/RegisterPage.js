import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";
import { Form, Input, Button } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault(); // event.preventDefault()를 해주지 않으면 login 버튼을 클릭하면 페이지가 아예 refresh되서 다음 코드가 실행이 안된다. 그래서 넣준다.

    // 한번 찍어보면 server로 보낼 값들이 state에 있다.
    // console.log("Email", Email);
    // console.log("pw", Password);

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 패스워드는 같아야합니다.");
    }

    let body = {
      email: Email,
      password: Password,
      name: Name,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push("/login");
      } else {
        alert("Failed to Sign Up cause Your password is too short");
      }
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          label="Email"
          name="Email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input type="email" value={Email} onChange={onEmailHandler} />
        </Form.Item>

        <Form.Item
          label="name"
          name="Text"
          rules={[
            {
              required: true,
              message: "Please input your Name",
            },
          ]}
        >
          <Input type="text" value={Name} onChange={onNameHandler} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            type="password"
            value={Password}
            onChange={onPasswordHandler}
          />
        </Form.Item>

        <Form.Item
          label="Check Password"
          name="checkpassword"
          rules={[
            {
              required: true,
              message: "Please input your checkpassword!",
            },
          ]}
        >
          <Input.Password
            type="password"
            value={ConfirmPassword}
            onChange={onConfirmPasswordHandler}
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" onClick={onSubmitHandler}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default withRouter(RegisterPage);
