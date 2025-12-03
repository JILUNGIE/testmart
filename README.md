# emily mart (ver 0.1.8)

### 개선점

<ol>
    <li>두번째 모니터가 있을 경우 두 번째 모니터를 찾아가도록 바뀜</li>
    <li>어떤 페이지든 하단 히든 버튼 누를수 있도록 수정</li>
</ol>

### Todo

<ol>
    <li>코드 정리 및 주석 추가</li>
    <li>api 매소드 방식 추가 (현제 get만 가능)</li>
    <li>dotenv 추가</li>
    <li>영상 불러오는 알고리즘 수정 했으나 안되서 보안 꺼버림 ㅠ</li>
</ol>

### 아래는 테스트 한 API 서버 코드

```js
import express from "express";

const PORT = 8080;
const app = express();

app.use(express.json());

app.get("/", (req, res, next) =>
  res.json({
    hi: "hidl",
    dkds: "kdkd",
  })
);
app.get("/api/hi", (req, res) =>
  res.json({
    hi: "hi",
  })
);

app.listen(8080, () => console.log(`http://www.localhost:${PORT}`));
```
