const { User } = require("../models/User");

// 인증 처리를 하는 곳
let auth = (req, res, next) => {
  // 클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies.x_auth;

  // 토큰을 복호화(Decode) 한후 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;
    next(); // next()가 없으면 auth Middleware에 개속 머무르고 다음으로 넘어가지 않는다.
  });

  // 유저가 있으면 인증 OK!
  // 유저가 없으면 인증 NO!
};

module.exports = { auth };
