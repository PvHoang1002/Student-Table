import { useState, useEffect } from "react";

import "./App.css";

import { Table } from "./components/Table";
import { Panel } from "./components/Panel";

function App() {
  const [panelOpen, setPanelOpen] = useState(false);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:3001/api/v1/students")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRows(data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const [rowEdit, setRowEdit] = useState(null);
  const [editId, setEditId] = useState(false);

  const handleDelete = (targetRow) => {
    setRows(rows.filter((_, rowIdx) => rowIdx !== targetRow));

    const deletedId = rows[targetRow].id;
    fetch(`http://127.0.0.1:3001/api/v1/students/${deletedId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(() => console.log("Deleted successfully!"))
      .catch((error) => console.error(error));
  };

  const handleEdit = (idx) => {
    setRowEdit(idx);
    setPanelOpen(true);
    if (idx !== null) {
      setEditId(true);
    }
  };

  const handleSubmit = (newRow) => {
    rowEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowEdit) {
              return currRow;
            }
            return newRow;
          })
        );

    if (!editId) {
      const newRowWithoutId = { ...newRow };
      delete newRowWithoutId.id;

      fetch(`http://127.0.0.1:3001/api/v1/students/${newRow.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRowWithoutId),
      })
        .then(() => console.log("Add successfully!"))
        .catch((error) => console.error(error));
    } else {
      fetch(`http://127.0.0.1:3001/api/v1/students/${newRow.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRow),
      })
        .then(() => console.log("Update successfully!"))
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="App">
      <Table rows={rows} deleteRow={handleDelete} editRow={handleEdit} />
      <button
        id="add"
        onClick={() => {
          setPanelOpen(true);
        }}
      >
        Thêm mới
      </button>

      {panelOpen && (
        <Panel
          rows={rows}
          closePanel={() => {
            setPanelOpen(false);
            setRowEdit(null);
            setEditId(false);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowEdit !== null && rows[rowEdit]}
          onEditId={editId}
        />
      )}
    </div>
  );
}

export default App;
