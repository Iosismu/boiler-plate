const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000", // client에서 타켓을 줄때 5000번으로 주겠다는 말
      changeOrigin: true,
    })
  );
};
