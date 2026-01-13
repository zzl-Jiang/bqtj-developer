import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

// 允许跨域（方便前端访问）
app.use(cors());
// 允许解析 JSON 格式的请求体
app.use(express.json());

app.get('/', (req, res) => {
  res.send('爆枪突击后端服务器已启动！');
});

app.listen(port, () => {
  console.log(`服务器运行在：http://localhost:${port}`);
});