import Mybutton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import { useState } from "react";

const Home = () => {
  const [currDate, setCurrDate] = useState(new Date());
  const headText = `${currDate.getFullYear()}년 ${currDate.getMonth() + 1}월`;

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
    </div>
  );
};
export default Home;
