"use strict";

exports.query = async function (connection, params) {
    const Query = `SELECT * FROM Lectures;`;
    const Params = [];

    const rows = await connection.query(Query, Params);

    return rows;
};

exports.selectStudents = async function (connection, studentName) {
    const selectAllStudentsQuery = `SELECT * FROM Students;`;
    const selectStudentsByNameQuery = `SELECT * FROM Students where studentName = ?;`;
    const Params = [studentName];

    let Query;

    if (!studentName) {
        Query = selectAllStudentsQuery;
    } else {
        Query = selectStudentsByNameQuery;
    }

    const rows = await connection.query(Query, Params);

    return rows;
};
