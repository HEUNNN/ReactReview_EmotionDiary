import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import EmotionItem from "./EmotionItem";
import Mybutton from "./MyButton";
import Myheader from "./MyHeader";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion/emotion1.png`,
    emotion_descript: "완전 좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion/emotion2.png`,
    emotion_descript: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion/emotion3.png`,
    emotion_descript: "그저그럼",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion/emotion4.png`,
    emotion_descript: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion/emotion5.png`,
    emotion_descript: "끔찍함",
  },
];
const getStringDate = (date) => {
  //new component가 렌더링 될때 사용할것이다.
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState("");
  const { onCreate } = useContext(DiaryDispatchContext);
  const contentRef = useRef();

  const handleClickEmotion = (emotion) => {
    setEmotion(emotion);
  };
  const handleSubmit = () => {
    if (content.length >= 1) {
      onCreate(emotion, content, date);
      navigate("/", { replace: true });
    } else {
      contentRef.current.focus();
    }
  };

  return (
    <div className="DiaryEditor">
      <Myheader
        headText={"새 일기쓰기"}
        leftChild={
          <Mybutton
            text={"<뒤로가기"}
            onClick={() => {
              navigate(-1);
            }}
          />
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date "
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((v) => (
              <EmotionItem
                key={v.emotion_id}
                {...v}
                onClick={handleClickEmotion}
                isSelected={v.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              ref={contentRef}
              placeholder="오늘은 어땠나요?"
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <Mybutton
              onClick={() => {
                navigate(-1, { replace: true });
              }}
              text={"취소하기"}
            />
            <Mybutton
              text={"저장하기"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};
export default DiaryEditor;
