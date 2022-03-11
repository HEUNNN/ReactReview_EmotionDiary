import Mybutton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import DiaryList from "../components/DiaryList";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);
  const [currDate, setCurrDate] = useState(new Date());
  const headText = `${currDate.getFullYear()}년 ${currDate.getMonth() + 1}월`;

  const [data, setData] = useState([]); //년/월 조건에 따라 가공된 data를 관리하기 위해 사용할 data state

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        currDate.getFullYear(),
        currDate.getMonth(),
        1
      ).getTime();
      const lastDay = new Date(
        currDate.getFullYear(),
        currDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();
      setData(diaryList.filter((v) => v.date >= firstDay && v.date <= lastDay));
    }
  }, [diaryList, currDate]);

  const increaseMonth = () => {
    setCurrDate(
      new Date(
        currDate.getFullYear(),
        currDate.getMonth() + 1,
        currDate.getDate()
      )
    );
  };
  const decreaseMonth = () => {
    setCurrDate(
      new Date(
        currDate.getFullYear(),
        currDate.getMonth() - 1,
        currDate.getDate()
      )
    );
  };
  return (
    <div className="Home">
      <MyHeader
        leftChild={<Mybutton text={"<"} onClick={decreaseMonth} />}
        rightChild={<Mybutton text={">"} onClick={increaseMonth} />}
        headText={headText}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};
export default Home;
