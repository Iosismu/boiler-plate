# MERN Project

## ๐ ํ๋ก์ ํธ ์๊ฐ(Boiler Plate)

### React๋ฅผ ํ์ฉํ ๋ก๊ทธ์ธ, ๋ก๊ทธ์์, ํ์๊ฐ์ ๊ธฐ๋ฅ ๊ตฌํ

### ๋ฐฐํฌ: [https://fathomless-savannah-85923.herokuapp.com/](https://fathomless-savannah-85923.herokuapp.com/)

### <๊ธฐ์  ์คํ>

|  ํฌ์ง์  |                     ์คํฌ                     | ์ฌ์ฉ |
| :------: | :------------------------------------------: | :--: |
| FrontEnd | React, Redux, antd, styled-components, axios |  O   |
| BackEnd  |           Node.js, Express, bcrypt           |  O   |
|    DB    |              MongoDB, mongoose               |  O   |
|  Deploy  |              Heroku, Heroku CLI              |  O   |

# <ํ๋ก ํธ์๋ ๊ธฐ๋ฅ>

## 1. ์ํ ๊ด๋ฆฌ, Redux, Redux-Middleware

- redux๋ก์ํ๊ด๋ฆฌ
- redux-thunk, redux-Promise Middelware๋ฅผ ์ฌ์ฉํจ์ผ๋ก์จ function, Promiseํํ์ action๋ ๋ฐ์์ฌ ์ ์๊ฒ ํ๋ค.

```javascript
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App />
  </Provider>,
  document.getElementById("root")
);
```

<!-- store๋ ๊ฐ์ฒด(plain object)ํํ์ action์ผ๋ก ๋ฐ๋๋ฐ
store๋ ํญ์ ๊ฐ์ฒด ํํ์ action๋ง ๋ฐ๋๊ฑด ์๋๋ค.
์ด์ฉ๋๋ Promise ๋๋ functionํํ๋ก ๋ฐ๋ ๊ฒฝ์ฐ๋ ์๋ค.
redux-thunk - ์ด๋กํด function์ ๋ฐ์์ง ์๋ ค์ฃผ๋ ๊ฒ
redux-promise - ์ด๋กํด Promiseํํ๋ก ๋ฐ๋์ง ์๋ ค์ฃผ๋ ๊ฒ -->

## 2. Axios , ์๋ฒ๋ก ๋ฐ์ดํฐ ์์ฒญ

actionํตํด์ axios๋ก ์๋ฒ์ ์์ฒญ ์ Error(\*์๋ ํ์ธ)

```javascript
import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";

export async function loginUser(dataToSubmit) {
  const request = await axios
    .post("/api/users/login", dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}
```

## 3. HTTPS , Proxy ์ค์  (์์ ๋ฌธ์  ํด๊ฒฐ)

client์ port๋ 3000์ด๊ณ  server์ port๋ 5000์ด๋ผ์ proxy ์ค์ 

```javascript
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000", // client์์ ํ์ผ์ ์ค๋ 5000๋ฒ์ผ๋ก ์ฃผ๊ฒ ๋ค๋ ๋ง
      changeOrigin: true,
    })
  );
};
```

## 4. ํ๋ก ํธ์๋ ๋์์ธ (Ant Design, Styled-Components)

### <Styled-Components - NavBar ๋์์ธ>

์์๋ค์ ๊ฐ์ง๊ณ  ์์ ์ฌ์ฉ

- NavBar
  ![NAV](./server/image/nav.PNG)

Elements๋ฅผ design ํ ํ

```javascript
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background-color: pink;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
  /* Third Nav */
  /* justify-content: flex-start; */
```

```javascript
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

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
          <NavBtnLink to="/login">๋ก๊ทธ์ธ</NavBtnLink>
        </NavBtn>

        <NavBtn>
          <NavBtnLink to="/register">ํ์๊ฐ์</NavBtnLink>
        </NavBtn>
      </>
    ) : (
      <>
        <NavBtn>
          <NavBtnLink onClick={onClickHandler}>๋ก๊ทธ์์</NavBtnLink>
        </NavBtn>
      </>
    )}
  </>
</Nav>;
```

### <Ant Design - ๋ก๊ทธ์ธ, ํ์๊ฐ์ Form ์คํ์ผ ์ถ๊ฐ>

- ๋ก๊ทธ์ธ
  ![login](./server/image/login.PNG)
- ํ์๊ฐ์
  ![register](./server/image/logout.PNG)

```javascript
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

  <Form.Item {...tailLayout}>
    <Button type="primary" htmlType="submit" onClick={onSubmitHandler}>
      Submit
    </Button>
  </Form.Item>
</Form>;
```

# <๋ฐฑ์๋ ๊ธฐ๋ฅ>

## 1. ๋น๋ฐ๋ฒํธ ์ํธํ, bcrypt

```javascript
  // ๋น๋ฐ ๋ฒํธ๋ฅผ ๋ฐ๊ฟ๋๋ง ์ํธํ๋ฅผ ํด์ผํ๋๊น isModified๋ก ์ฒดํฌํ๊ณ  ๋ง์ผ๋ฉด ์ํธํ
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        // ์ฌ๊ธฐ์ hash๋ ์ํธํ๋ ๋น๋ฐ๋ฒํธ
        if (err) return next(err);
        user.password = hash;
        next();
      });
```

---

## 2. client, server ๋์ ์คํ, concurrently

```javascript
 "dev": "concurrently \"npm run backend\" \"npm run start --prefix client\""
```

---

## 3. MongoDB์ฐ๊ฒฐ, Shema, mongoose

model User์์ Schema๋ฅผ ๋ง๋ค์ด์ค๋ค.

```javascript
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // trim์ ์๋ ์ด๋ฉ์ผ์ ๋น ๊ณต๋ฐฑ์ ์์ ์ฃผ๋ ์ญํ 
    // crosi 1157@naver.com
    unique: 1, // ์ ๋ํฌํ๊ฒ ๋๊ฐ์ ์ด๋ฉ์ผ์ ๋ชป์ฐ๊ฒ
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    // ๊ด๋ฆฌ์, ์ผ๋ฐ์ ์  ํ๋จ ๋๋ฒ๊ฐ 1์ด๋ฉด ๊ด๋ฆฌ์, 0์ด๋ฉด ์ผ๋ฐ์ ์ 
    type: Number,
    default: 0, // ๋ง์ฝ์ role์ ์ฃผ์ง์์ผ๋ฉด default๊ฐ์ผ๋ก 0์ ์ฃผ๊ฒ ๋ค.
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    // ํ ํฐ ์ ํจ๊ธฐ๊ฐ
    type: Number,
  },
});
```

mongooseํจํค์ง๋ฅผ ์ด์ฉํด์ DB์ ์ฐ๊ฒฐ

```javascript
mongoose
  .connect(config.mongoURI, {
    // ์๋ ์ฝ๋ ์์ด์ผ ์ค๋ฅ ์๋จ
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected....")) // ์ ์ฐ๊ฒฐ๋ฌ๋์ง ํ์ธ
  .catch((err) => console.log(err));
```

---

## 4. Auth๊ธฐ๋ฅ ํ ํฐ & ์ฟ ํค, jsonwebtoken, cookie-parser

์ ์  ๊ณ ์  ์์ด๋(user_id)๋ฅผ ๊ฐ์ง๊ณ  ํ ํฐ์์ฑํ๋ ํจ์์ด๊ณ  ๊ทธ๋ ๊ฒ ๋ง๋  ํ ํฐ์ DB์ ์ ์ฅํ๊ณ  callback์ผ๋ก user๋ฐ์ดํฐ๋ฅผ ๋๊ฒจ์ค๋ค.

```javascript
const jwt = require("jsonwebtoken");

userSchema.methods.generateToken = function (cb) {
  // jsonwebtoken์ ์ด์ฉํด์ token์ ์์ฑํ๊ธฐ
  var user = this;

  // ์ฌ๊ธฐ์ user._id๋ ๋ฐ์ดํฐ๋ฒ ์ด์ค์ _id์ด๋ค.
  var token = jwt.sign(user._id.toHexString(), "secretToken");

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};
```

๊ทธ๋ ๊ฒ ๋๊ฒจ ๋ฐ์ ํ ํฐ์ ์ฟ ํค์ ์ ์ฅ.

```javascript
const cookieParser = require("cookie-parser");

app.use(cookieParser());

// ๋น๋ฐ๋ฒํธ๊น์ง ๋ง๋ค๋ฉด ํ ํฐ์ ์์ฑํ๊ธฐ.
user.generateToken((err, user) => {
  if (err) return res.status(400).send(err);

  // ํ ํฐ์ ์ ์ฅํ๋ค. ์ด๋์ ? ์ฟ ํค, localStorage ๋ฑ๋ฑ ์ ์ฅํ  ๊ณณ์ ๋ง๋ค. ์ฌ๊ธฐ์๋ ์ฟ ํค
  res
    .cookie("x_auth", user.token)
    .status(200)
    .json({ loginSuccess: true, userId: user._id });
});
```

---

## 5. body-parser

```javascript
const bodyParser = require("body-parser");

// application/x-www-form-urlencoded ์ด๋ ๊ฒ ์๊ธด ๋ฐ์ดํฐ๋ฅผ ๋ถ์ํด์ ๊ฐ์ ธ์ฌ ์ ์๊ฒ ํด์ค๋ค.
app.use(bodyParser.urlencoded({ extended: true }));

// application/json JSONํํ๋ก ๋ ๋ฐ์ดํฐ๋ฅผ ๊ฐ์ ธ์ฌ ์ ์๊ฒ ํด์ฃผ๊ณ 
app.use(bodyParser.json());
```
