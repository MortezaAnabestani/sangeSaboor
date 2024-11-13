import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const text = useSelector((state) => state.newText);
  const [newText, setNewText] = useState(text);
  const dispath = useDispatch();
  const navigate = useNavigate();
  const formHandler = (e) => {
    e.preventDefault();
    setNewText(newText);
    try {
      dispath({ type: "FETCH_NEW_TEXT", payload: newText });
    } catch (error) {
      console.log(error);
    }
    navigate("/bar");
  };

  return (
    <>
      <h1 className="fs-4">متن خود را در زیر وارد کنید</h1>
      <form
        className="w-100 d-flex flex-column align-items-center justify-content-center"
        onSubmit={formHandler}
      >
        <textarea
          className="h-50 rounded-1 mb-4"
          style={{ minHeight: "250px" }}
          value={newText}
          placeholder="متن خود را این‌جا وارد کنید"
          onChange={(e) => setNewText(e.target.value)}
        ></textarea>
        <button className="btn btn-sm btn-warning" type="submit">
          بسامدگیری و مصورسازی
        </button>
      </form>
    </>
  );
};

export default Home;
