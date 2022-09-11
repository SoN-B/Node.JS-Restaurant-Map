"use strict";

exports.query = async function (connection, params) {
    const Query = `SELECT * FROM Lectures`;
    const Params = [];

    const rows = await connection.query(Query, Params);

    return rows;
};
