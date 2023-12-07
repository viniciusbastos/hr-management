import { useState, useEffect } from "react";
import "../main.css";
import Table from "../components/table";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      {/* <button
          className="bg-stone-500 hover:bg-stone-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={() => {
            navigate("/formUser");
          }}
        >
          New User
        </button> */}
      <Table />
    </>
  );
}

export default Home;
