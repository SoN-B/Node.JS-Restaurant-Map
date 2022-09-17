"use strict";

exports.selectRestaurants = async function (connection, category) {
    const selectAllRestaurantsQuery = `SELECT title, address, category, videoUrl FROM Restaurants where status = 'A';`;
    const selectCategorizedRestaurantsQuery = `SELECT title, address, category, videoUrl FROM Restaurants where status = 'A' and category = ?;`;
    const Params = [category];

    const Query = category ? selectCategorizedRestaurantsQuery : selectAllRestaurantsQuery;

    const rows = await connection.query(Query, Params);

    return rows;
};

// 예시
// exports.selectStudents = async function (connection, studentName) {
//     const selectAllStudentsQuery = `SELECT * FROM Students;`;
//     const selectStudentsByNameQuery = `SELECT * FROM Students where studentName = ?;`;
//     const Params = [studentName];

//     let Query;

//     if (!studentName) {
//         Query = selectAllStudentsQuery;
//     } else {
//         Query = selectStudentsByNameQuery;
//     }

//     const rows = await connection.query(Query, Params);

//     return rows;
// };
