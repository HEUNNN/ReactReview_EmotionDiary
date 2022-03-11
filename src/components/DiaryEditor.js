import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmotionItem from "./EmotionItem";
import Mybutton from "./MyButton";
import Myheader from "./MyHeader";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import { emotionList } from "../util/emotionList";
import { StringDate } from "../util/StringDate";

const DiaryEditor = ({ isEdit, originData }) => {
  const [date, setDate] = useState(StringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState("");

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  const navigate = useNavigate();

  const contentRef = useRef();

  const handleClickEmotion = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);
  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    } else {
      if (
        window.confirm(
          isEdit
            ? "일기를 수정하시겠습니까?"
            : "새로운 일기를 저장하시겠습니까?"
        )
      ) {
        if (isEdit) {
          onEdit(originData.id, emotion, content, date);
          console.log(date);
        } else onCreate(emotion, content, date);
        navigate(-1, { replace: true });
      }
    }
  };

  const handleRemove = (targetId) => {
    if (window.confirm("일기를 삭제하시겠습니까?")) {
      onRemove(targetId);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(StringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <Myheader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={<Mybutton text={"<뒤로가기"} onClick={() => navigate(-1)} />}
        rightChild={
          isEdit && (
            <Mybutton
              text={"삭제하기"}
              type={"negative"}
              onClick={() => handleRemove(originData.id)}
            />
          )
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
                isSelected={parseInt(v.emotion_id) === parseInt(emotion)}
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
