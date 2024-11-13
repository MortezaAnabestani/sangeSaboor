import React from "react";
import { useSelector } from "react-redux";
import WordFrequency from "../components/WordFrequency";

function TextFrequency() {
  const data = useSelector((state) => state.newText);

  return (
    <table>
      <tr>
        <th>واژه</th>
        <th>فراوانی</th>
      </tr>
      {WordFrequency(data).map((item) => (
        <tr>
          <td>{item.word}</td>
          <td>{item.count}</td>
        </tr>
      ))}
    </table>
  );
}

export default TextFrequency;
