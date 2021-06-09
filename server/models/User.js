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
    trim: true, // trim은 아래 이메일에 빈 공백을 없애주는 역할
    // crosi 1157@naver.com
    unique: 1, // 유니크하게 똑같은 이메일은 못쓰게
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
    // 관리자, 일반유저 판단 넘버가 1이면 관리자, 0이면 일반유저
    type: Number,
    default: 0, // 만약에 role을 주지않으면 default값으로 0을 주겠다.
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    // 토큰 유효기간
    type: Number,
  },
});

// pre라는것은 index.js에서 mongoose.save하기 전에 함수 실행
userSchema.pre("save", function (next) {
  // next() 해버리면 index.js mongoose.save로 넘어간다.
  var user = this; // this === userSchema

  // 비밀 번호를 바꿀때만 암호화를 해야하니까 isModified로 체크하고 맞으면 암호화
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        // 여기서 hash는 암호화된 비밀번호
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    // 비밀번호를 변경하지 않을때는 그냥 next로 빠져나가게
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plainPassword === 1234567, 암호화된 비밀번호 $2b$10$eMyZPizejNcoAjRQPh91KOtm0R6KP9DLAfWGCDM.02Sfl.Z.oQ882 두개가 같은지 체크
  // 그래서 plainPassword를 암호화해서 체크 해야됨

  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  // jsonwebtoken을 이용해서 token을 생성하기
  var user = this;

  // 여기서 user._id는 데이터베이스의 _id이다.
  var token = jwt.sign(user._id.toHexString(), "secretToken");

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  // 토큰을 decode 한다.
  jwt.verify(token, "secretToken", function (err, decoded) {
    // 유저 아이디를 이용해서 유저를 찾은 다음에
    // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
