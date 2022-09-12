"use strict";

const { pool } = require("../../config/database");
const { logger } = require("../../config/winston");

const DB = require("../database/index");

// 예시 코드
exports.test = async function (req, res) {
    try {
        const connection = await pool.getConnection(async (conn) => conn); // 연결
        try {
            const [rows] = await DB.query(connection); // 쿼리전달
            // 비구조 할당 : const [a,b,c] = [1,2,3]

            return res.send({
                result: rows,
                code: 200, // 요청 실패시 400번대 코드
                message: "Request success.",
            });
        } catch (err) {
            logger.error(`example Query error\n: ${JSON.stringify(err)}`);
            return false;
        } finally {
            connection.release();
            // release를 해주어 커넥션이 pool로 되돌아 갈 수 있도록 해줍니다.
            // 이제 이 커넥션은 pool로 돌아가 다른 주체가 사용 할 수 있도록 준비합니다.
        }
    } catch (err) {
        logger.error(`example DB Connection error\n: ${JSON.stringify(err)}`);
        return false;
    }
};

exports.readStudents = async function (req, res) {
    const { studentName } = req.query;
    // 비구조 할당

    try {
        const connection = await pool.getConnection(async (conn) => conn); // 연결
        try {
            const [rows] = await DB.selectStudents(connection, studentName); // 쿼리전달
            // 비구조 할당 : const [a,b,c] = [1,2,3]

            return res.send({
                result: rows,
                code: 200, // 요청 실패시 400번대 코드
                message: "Request success.",
            });
        } catch (err) {
            logger.error(`readStudents Query error\n: ${JSON.stringify(err)}`);
            return false;
        } finally {
            connection.release();
            // release를 해주어 커넥션이 pool로 되돌아 갈 수 있도록 해줍니다.
            // 이제 이 커넥션은 pool로 돌아가 다른 주체가 사용 할 수 있도록 준비합니다.
        }
    } catch (err) {
        logger.error(`readStudents DB Connection error\n: ${JSON.stringify(err)}`);
        return false;
    }
};

// exports.createStudents = async function (req, res) {
//     const { studentName, major, birth, address } = req.body;
// };
