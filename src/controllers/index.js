"use strict";

const { pool } = require("../../config/database");
const { logger } = require("../../config/winston");

const DB = require("../database/index");

// 예시 코드
// exports.test = async function (req, res) {
//     try {
//         const connection = await pool.getConnection(async (conn) => conn); // 연결
//         try {
//             const [rows] = await DB.query(connection); // 쿼리전달
//             // 비구조 할당 : const [a,b,c] = [1,2,3]

//             return res.send({
//                 result: rows,
//                 code: 200, // 요청 실패시 400번대 코드
//                 message: "Request success.",
//             });
//         } catch (err) {
//             logger.error(`example Query error\n: ${JSON.stringify(err)}`);
//             return false;
//         } finally {
//             connection.release();
//             // release를 해주어 커넥션이 pool로 되돌아 갈 수 있도록 해줍니다.
//             // 이제 이 커넥션은 pool로 돌아가 다른 주체가 사용 할 수 있도록 준비합니다.
//         }
//     } catch (err) {
//         logger.error(`example DB Connection error\n: ${JSON.stringify(err)}`);
//         return false;
//     }
// };

exports.readRestaurants = async function (req, res) {
    const { category } = req.query;

    // 카테고리 값이 넘어 왔다면, 유효한 값인지 체크
    if (category) {
        const validCategory = ["한식", "중식", "일식", "양식", "분식", "구이", "회/초밥", "기타"];

        if (!validCategory.includes(category)) {
            return res.send({
                isSuccess: false,
                code: 400, // 요청 실패시 400번대 코드
                message: "유효한 카테고리가 아닙니다.",
            });
        }
    }

    try {
        const connection = await pool.getConnection(async (conn) => conn);
        try {
            const [rows] = await DB.selectRestaurants(connection, category);

            return res.send({
                result: rows,
                isSuccess: true,
                code: 200, // 요청 실패시 400번대 코드
                message: "식당 목록 요청 성공",
            });
        } catch (err) {
            logger.error(`readRestaurants Query error\n: ${JSON.stringify(err)}`);
            return false;
        } finally {
            connection.release();
        }
    } catch (err) {
        logger.error(`readRestaurants DB Connection error\n: ${JSON.stringify(err)}`);
        return false;
    }
};
