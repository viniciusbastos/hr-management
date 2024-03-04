import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function ButtonBack() {
  const navigate = useNavigate();

  return (
    <>
      <button
        className="bg-gray-600 text-white rounded-full p-3 align-"
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        <div className="flex align-middle">
          <IoMdArrowBack />
        </div>
      </button>
    </>
  );
}
