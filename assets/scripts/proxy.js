const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Cấu hình middleware để chuyển tiếp các yêu cầu từ '/api' tới máy chủ backend
app.use('/api', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));

// Khởi chạy máy chủ tại cổng 8080
app.listen(8080, () => {
    console.log('Proxy server is running on port 8080');
});
