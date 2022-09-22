"use strict";

const { pool } = require("../../config/database");
const { logger } = require("../../config/winston");
const jwt = require("jsonwebtoken");
const secret = require("../../config/secret");

const DB = require("../database/index");

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

// 회원가입
exports.createUsers = async function (req, res) {
    const { userID, password, nickname } = req.body;

    // 1. 유저 데이터 검증
    const userIDRegExp = /^[a-z]+[a-z0-9]{5,19}$/; // 아이디 정규식 영문자로 시작하는 영문자 또는 숫자 6-20
    const passwordRegExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/; // 비밀번호 정규식 8-16 문자, 숫자 조합
    const nicknameRegExp = /^[가-힣|a-z|A-Z|0-9|]{2,10}$/; // 닉네임 정규식 2-10 한글, 숫자 또는 영문

    if (!userIDRegExp.test(userID)) {
        return res.send({
            isSuccess: false,
            code: 400, // 요청 실패시 400번대 코드
            message: "아이디 정규식 영문자로 시작하는 영문자 또는 숫자 6-20",
        });
    }

    if (!passwordRegExp.test(password)) {
        return res.send({
            isSuccess: false,
            code: 400, // 요청 실패시 400번대 코드
            message: "비밀번호 정규식 8-16 문자, 숫자 조합",
        });
    }

    if (!nicknameRegExp.test(nickname)) {
        return res.send({
            isSuccess: false,
            code: 400, // 요청 실패시 400번대 코드
            message: "닉네임 정규식 2-10 한글, 숫자 또는 영문",
        });
    }

    try {
        const connection = await pool.getConnection(async (conn) => conn);
        try {
            // 아이디 중복 검사가 필요. 직접 구현해보기.

            // 2. DB 입력
            const [rows] = await DB.insertUsers(connection, userID, password, nickname);

            // 입력된 유저 인덱스
            const userIdx = rows.userIdx;

            // 3. JWT 발급
            const token = jwt.sign(
                { userIdx: userIdx, nickname: nickname }, // payload 정의
                secret.jwtsecret // 서버 비밀키
            );

            return res.send({
                result: { jwt: token },
                isSuccess: true,
                code: 200, // 요청 실패시 400번대 코드
                message: "회원가입 성공",
            });
        } catch (err) {
            logger.error(`createUsers Query error\n: ${JSON.stringify(err)}`);
            return false;
        } finally {
            connection.release();
        }
    } catch (err) {
        logger.error(`createUsers DB Connection error\n: ${JSON.stringify(err)}`);
        return false;
    }
};
