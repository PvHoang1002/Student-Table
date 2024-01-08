import React from "react";

import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import "./Table.css";

export const Table = ({ rows, deleteRow, editRow }) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>MSV</th>
            <th>Họ và tên</th>
            <th>Ngày sinh</th>
            <th className="expand">Quê quán</th>
            <th>Hành động</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, idx) => {
            return (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.dob}</td>
                <td>{row.home}</td>
                <td>
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete"
                      onClick={() => {
                        deleteRow(idx);
                      }}
                    />
                    <BsFillPencilFill
                      onClick={() => {
                        editRow(idx);
                      }}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
