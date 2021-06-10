const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://fathomless-savannah-85923.herokuapp.com/", // client에서 타켓을 줄때 5000번으로 주겠다는 말
      changeOrigin: true,
    })
  );
};
