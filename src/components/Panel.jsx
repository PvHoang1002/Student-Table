import React, { useState } from "react";

import "./Panel.css";

const ID_LENGTH = 8;

export const Panel = ({
  rows,
  closePanel,
  onSubmit,
  defaultValue,
  onEditId,
}) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      id: "",
      name: "",
      dob: "",
      home: "",
    }
  );

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let idErrorMsg = "";
    let nameErrorMsg = "";
    let dobErrorMsg = "";
    let homeErrorMsg = "";

    if (formState.id === "") {
      idErrorMsg = "Không được để trống Mã sinh viên!";
    } else {
      const numReg = /^\d+$/;
      if (!numReg.test(formState.id)) {
        idErrorMsg = "Mã sinh viên chỉ được chứa các kí tự số!";
      } else {
        if (formState.id.length !== ID_LENGTH) {
          idErrorMsg = "Mã sinh viên phải có 8 chữ số!";
        } else {
          rows.forEach((row) => {
            if (row.id === formState.id && !onEditId) {
              idErrorMsg = "Mã sinh viên đã tồn tại!";
            }
          });
        }
      }
    }

    if (formState.name === "") {
      nameErrorMsg = "Không được để trống Họ và tên!";
    } else {
      const numReg = /\d/;
      if (numReg.test(formState.name)) {
        nameErrorMsg = "Tên sinh viên chỉ được chứa các ký tự chữ!";
      }
    }

    if (formState.dob === "") {
      dobErrorMsg = "Không được để trống Ngày sinh!";
    } else {
      if (!checkDate(formState.dob)) {
        dobErrorMsg = "Ngày sinh không hợp lệ!";
      }
    }

    if (formState.home === "") {
      homeErrorMsg = "Không được để trống Quê quán!";
    }

    if (
      idErrorMsg !== "" ||
      nameErrorMsg !== "" ||
      dobErrorMsg !== "" ||
      homeErrorMsg !== ""
    ) {
      setIdErrorMsg(idErrorMsg);
      setNameErrorMsg(nameErrorMsg);
      setDobErrorMsg(dobErrorMsg);
      setHomeErrorMsg(homeErrorMsg);
    } else {
      onSubmit(formState);
      closePanel();
    }
  };

  const [idErrorMsg, setIdErrorMsg] = useState("");
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [dobErrorMsg, setDobErrorMsg] = useState("");
  const [homeErrorMsg, setHomeErrorMsg] = useState("");

  const toggleClick = (e) => {
    if (e.target.className === "panel-container") {
      closePanel();
    }
  };

  const handleKeyUp = (e) => {
    let inputDate = formState.dob;
    let formattedDate = inputDate
      .replace(/^(\d\d)(\d)$/g, "$1/$2")
      .replace(/^(\d\d\/\d\d)(\d+)$/g, "$1/$2")
      .replace(/[^\d\/]/g, "");
    setFormState({
      ...formState,
      [e.target.name]: formattedDate,
    });
  };

  const checkDate = (date) => {
    let [day, month, year] = date.split("/");
    month = parseInt(month, 10) - 1;
    let validDate = new Date(year, month, day);
    let isValidDate =
      validDate.getDate() == day &&
      validDate.getMonth() == month &&
      validDate.getFullYear() == year;
    if (isValidDate) {
      return true;
    }
    return false;
  };

  return (
    <div className="panel-container" onClick={toggleClick}>
      <div className="panel">
        <form>
          <div className="group">
            <div className="category">
              <label htmlFor="id">Mã sinh viên:</label>
              <input
                name="id"
                value={formState.id}
                onChange={handleChange}
                autoComplete="off"
                maxLength={8}
                readOnly={onEditId}
              />
            </div>

            {idErrorMsg && (
              <div className="error" id="id-error">
                {`${idErrorMsg}`}
              </div>
            )}
          </div>

          <div className="group">
            <div className="category">
              <label htmlFor="name">Họ và tên:</label>
              <input
                name="name"
                value={formState.name}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            {nameErrorMsg && (
              <div className="error" id="name-error">
                {`${nameErrorMsg}`}
              </div>
            )}
          </div>

          <div className="group">
            <div className="category">
              <label htmlFor="dob">Ngày sinh:</label>
              <input
                name="dob"
                value={formState.dob}
                onChange={handleChange}
                autoComplete="off"
                onKeyUp={handleKeyUp}
                placeholder="dd/mm/yyyy"
              />
            </div>

            {dobErrorMsg && (
              <div className="error" id="dob-error">
                {`${dobErrorMsg}`}
              </div>
            )}
          </div>

          <div className="group">
            <div className="category">
              <label htmlFor="home">Quê quán:</label>
              <input
                name="home"
                value={formState.home}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            {homeErrorMsg && (
              <div className="error" id="home-error">
                {`${homeErrorMsg}`}
              </div>
            )}
          </div>

          <div className="buttons">
            <button type="submit" className="submit" onClick={handleSubmit}>
              Xác nhận
            </button>

            <button type="submit" className="cancel" onClick={closePanel}>
              Hủy bỏ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
