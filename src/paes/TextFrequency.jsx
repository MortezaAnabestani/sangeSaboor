import React from "react";
import getWordFrequency from "../components/WordFrequency";

function TextFrequency() {
  return (
    <table>
      <tr>
        <th>واژه</th>
        <th>فراوانی</th>
      </tr>
      {getWordFrequency().map((item) => (
        <tr>
          <td>{item.word}</td>
          <td>{item.count}</td>
        </tr>
      ))}
    </table>
  );
}

export default TextFrequency;
