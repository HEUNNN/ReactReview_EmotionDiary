import Home from "./Pages/Home";
import New from "./Pages/New";
import Edit from "./Pages/Edit";
import Diary from "./Pages/Diary";
// Routing 할 페이지
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//공통 컴포넌트
import Mybutton from "./components/MyButton";
//Header
import Myheader from "./components/Myheader";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Myheader
          headText={"App head text"}
          leftChild={
            <Mybutton
              text={"왼쪽 버튼"}
              onClick={() => alert("왼쪽 버튼 클릭")}
              type={"default"}
            />
          }
          rightChild={
            <Mybutton
              text={"오른쪽 버튼"}
              onClick={() => alert("오른쪽 버튼 클릭")}
              type={"negative"}
            />
          }
        />
        <h2>Emotion Diary </h2>
        <Mybutton
          text={"버튼"}
          onClick={() => alert("버튼 클릭")}
          type={"positive"}
        ></Mybutton>
        <Mybutton
          text={"버튼"}
          onClick={() => alert("버튼 클릭")}
          type={"negative"}
        ></Mybutton>
        <Mybutton
          text={"버튼"}
          onClick={() => alert("버튼 클릭")}
          type={"default"}
        ></Mybutton>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* url이 http://localhost:3000/ -> index라는 뜻 */}
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
