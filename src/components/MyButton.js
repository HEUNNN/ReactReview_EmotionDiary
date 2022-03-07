const Mybutton = ({ text, type, onClick }) => {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";
  //type으로 positive, negative, defaul가 아닌 문자열이 주어졌을 때 무조건 default로 바꾸어주는 코드
  return (
    <button
      className={["Mybutton", `Mybutton_${type}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
Mybutton.defaultProps = {
  type: "default",
};
export default Mybutton;
