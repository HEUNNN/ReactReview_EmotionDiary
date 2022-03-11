import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
import Mybutton from "./MyButton";

const sortOptionList = [
  { selectValue: "latest", selectName: "최신순" },
  { selectValue: "oldest", selectName: "오래된 순" },
];

const filterOptionList = [
  { selectValue: "all", selectName: "전부다" },
  { selectValue: "good", selectName: "좋은 감정만" },
  { selectValue: "bad", selectName: "안좋은 감정만" },
];

const ControlMenu = ({ selectValue, onChange, optionList }) => {
  return (
    //sort select 부분
    <select
      className="ControlMenu"
      value={selectValue}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((v, idx) => (
        <option key={idx} value={v.selectValue}>
          {v.selectName}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  //Home.js에서 diaryList 전달 받음
  const [sortType, setSortType] = useState("latest"); //정렬 기준을 관리할 state
  const [filterType, setFilterType] = useState("all"); //filter를 관리할 state

  const navigate = useNavigate();

  const compareObj = (a, b) => {
    if (sortType === "latest") {
      return parseInt(b.date) - parseInt(a.date);
    } else {
      return parseInt(a.date) - parseInt(b.date);
    }
  };
  const filteredDiaryList = (list) => {
    if (filterType === "all") {
      return list;
    } else if (filterType === "good") {
      return list.filter((v) => parseInt(v.emotion) <= 3);
    } else {
      return list.filter((v) => parseInt(v.emotion) > 3);
    }
  };

  const getProcessedDiaryList = () => {
    //sort 조건에 따라 diarylist 정렬
    //원본 diaryList는 지켜야 한다.
    const copyList = JSON.parse(JSON.stringify(diaryList)); //깊은 복사

    const sortedList = filteredDiaryList(copyList).sort(compareObj);

    return sortedList;
  };
  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            selectValue={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu onChange={setFilterType} optionList={filterOptionList} />
        </div>
        <div className="right_col">
          <Mybutton
            text={"새 일기쓰기"}
            type={"positive"}
            onClick={() => {
              navigate("/new");
            }}
          />
        </div>
      </div>

      {getProcessedDiaryList().map((v) => (
        <DiaryItem key={v.id} {...v} />
      ))}
    </div>
  );
};
DiaryList.defaultProps = {
  diaryList: [],
};
export default DiaryList;
