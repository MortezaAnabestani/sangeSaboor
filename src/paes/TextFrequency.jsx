import React from "react";

function TextFrequency({ data }) {
  return (
    <table>
      <tr>
        <th>واژه</th>
        <th>فراوانی</th>
      </tr>
      {data.map((item) => (
        <tr>
          <td>{item.word}</td>
          <td>{item.count}</td>
        </tr>
      ))}
    </table>
  );
}

export default TextFrequency;
