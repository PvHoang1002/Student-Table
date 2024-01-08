const pool = require("./../database");

exports.getAllStudents = async (req, res) => {
  const [students] = await pool.query(`SELECT * FROM student`);

  const data = await students;

  res.status(200).json({
    status: "success",
    data,
  });
};

exports.getStudent = async (req, res) => {
  const id = req.params.id;

  const [student] = await pool.query(
    `SELECT * FROM student WHERE student.id = ?`,
    [id]
  );

  const [data] = await student;

  res.status(200).json({
    status: "success",
    data,
  });
};

exports.createStudent = async (req, res) => {
  const id = req.params.id;
  const { name, dob, home } = req.body;

  const [student] = await pool.query(
    `SELECT * FROM student WHERE student.id = ?`,
    [id]
  );

  if (student.length > 0) {
    res.status(400).json({
      status: "fail",
      message: "Could not create student. This id existed.",
    });
  } else {
    await pool.query(
      `INSERT INTO student (id, name, dob, home) VALUES (?, ?, ?, ?)`,
      [id, name, dob, home]
    );

    const [student] = await pool.query(
      `SELECT * FROM student WHERE student.id = ?`,
      [id]
    );

    const [data] = await student;

    res.status(201).json({
      status: "success",
      data,
    });
  }
};

exports.deleteStudent = async (req, res) => {
  const id = req.params.id;

  const [student] = await pool.query(
    `SELECT * FROM student WHERE student.id = ?`,
    [id]
  );

  if (student.length === 0) {
    res.status(400).json({
      status: "fail",
      message: "Student not found.",
    });
  } else {
    await pool.query(`DELETE FROM student WHERE id = ?`, [id]);

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
};

exports.updateStudent = async (req, res) => {
  const id = req.params.id;
  const { newId, name, dob, home } = req.body;

  const [student] = await pool.query(
    `SELECT * FROM student WHERE student.id = ?`,
    [id]
  );

  const [newIdStudent] = await pool.query(
    `SELECT * FROM student WHERE student.id = ?`,
    [newId]
  );

  if (student.length === 0) {
    res.status(400).json({
      status: "fail",
      message: "Student not found.",
    });
  } else if (newIdStudent.length > 0 && newId !== id) {
    res.status(400).json({
      status: "fail",
      message: "This id existed.",
    });
  } else {
    await pool.query(
      `UPDATE student SET name = ?, dob = ?, home = ? WHERE id = ?`,
      [name, dob, home, id]
    );

    res.status(200).json({
      status: "success",
      data: {
        newId,
        name,
        dob,
        home,
      },
    });
  }
};
