import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import Mybutton from "../components/MyButton";
import Myheader from "../components/MyHeader";
import { StringDate } from "../util/StringDate";
import { emotionList } from "../util/emotionList";
const Diary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const diaryList = useContext(DiaryStateContext);
  const [originData, setOriginData] = useState();

  useEffect(() => {
    if (diaryList.length >= 1) {
      //originDate를 찾는 과정 -> 공통으로 필요한 과정
      const targetDiary = diaryList.find(
        (v) => parseInt(v.id) === parseInt(id)
      );
      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!originData) {
    // originData 가 없으면 Home으로 넘어감
    return <div className="DiaryPage">loading...</div>;
  } else {
    const findCurrEmotion = emotionList.find(
      //originData의 emotion과 같은 emotion을 emotionList에서 찾아서 emotion_img와 emotion_descript 사용
      (v) => parseInt(v.emotion_id) === parseInt(originData.emotion)
    );

    //originData가 존재할 때 markup
    return (
      <div className="DiaryPage">
        <Myheader
          leftChild={
            <Mybutton text={"<뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild={
            <Mybutton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${id}`)}
            />
          }
          headText={`${StringDate(new Date(originData.date))} 기록`}
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_emotion${originData.emotion}`,
              ].join(" ")}
            >
              <img src={findCurrEmotion.emotion_img} />
              <div className="emotion_descript">
                {findCurrEmotion.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_cotent_wrapper ">
              <p>{originData.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};
export default Diary;
