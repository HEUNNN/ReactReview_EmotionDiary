import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const mode = searchParams.get("mode");
  console.log(`id: ${id}, mode: ${mode}`);

  const navigate = useNavigate();

  return (
    <div className="Edit">
      <h2>Edit</h2>
      <p>이곳은 Edit 입니다.</p>
      <button onClick={() => setSearchParams({ who: "hyeeun" })}>
        Query String 바꾸기
      </button>
      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        Home으로 이동
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로 이동
      </button>
    </div>
  );
};
export default Edit;
