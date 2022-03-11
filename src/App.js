import Home from "./Pages/Home";
import New from "./Pages/New";
import Edit from "./Pages/Edit";
import Diary from "./Pages/Diary";
// Routing 할 페이지
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect, useReducer, useRef } from "react";

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기1",
    date: 1646836779054,
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기2",
    date: 1646836779055,
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기3",
    date: 1646836779056,
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기4",
    date: 1646836779057,
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기5",
    date: 1646836779058,
  },
];

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT":
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    default:
      return state;
  }
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);
  useEffect(() => {
    const localData = localStorage.getItem("diary");
    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      //local storage에 이미 저장되어 있던 데이터들을 감안하여 id를 부여해야하기 때문에 설정
      //local storage에 있던 데이터들을 id 순으로 일단 정렬하여 가장 마지막 아이디 이후부터 id를 설정할 수 있도록 한다.
      dataId.current = parseInt(diaryList[0].id) + 1;

      //local storage에서 받아온 diaryList를 App 컴포넌트의 data state의 초기값으로 설정해야 한다.
      dispatch({ type: "INIT", data: diaryList });
    }
  }, []);
  //CREATE
  const onCreate = (emotion, content, date) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        emotion,
        content,
        date: new Date(date).getTime(),
      },
    });
    dataId.current += 1;
  };
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  const onEdit = (targetId, emotion, content, date) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        emotion,
        content,
        date: new Date(date).getTime(),
      },
    });
  };
  //REMOVE
  //EDIT
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* url이 http://localhost:3000/ -> index라는 뜻 */}
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
