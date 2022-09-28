/* 
로그인 API 연동

1. #signin 클릭
2. #userID, #password 값 확인 (두 값이 모두 입력 되어 있지 않으면 return)
3. 로그인 API 요청
4. 요청이 성공적이지 않다면, alert message
5. 요청이 성공하면, jwt를 localstorage에 저장하고 main page 이동

*/

//let url = "http://127.0.0.1:3000";
let url = "https://www.restaurantmap.site";

const btnSignIn = document.querySelector("#signin");

// 1. #signin 클릭
btnSignIn.addEventListener("click", signIn);

async function signIn(event) {
    const userID = document.querySelector("#userID").value;
    const password = document.querySelector("#password").value;

    // 2. #email, #password 값 확인 (두 값이 모두 입력 되어 있지 않으면 return)
    if (!userID || !password) {
        return alert("회원 정보를 입력해주세요.");
    }

    // 3. 로그인 API 요청
    const signInReturn = await axios({
        method: "post", // http method
        url: url + "/sign-in",
        headers: {}, // packet header
        data: { userID: userID, password: password }, // packet body
    });

    // 4. 요청이 성공적이지 않다면, alert message
    const isValidSignIn = signInReturn.data.code == 200;

    if (!isValidSignIn) {
        return alert("요청에 문제가 생겼습니다.");
    }

    // 5. 요청이 성공하면, jwt를 localstorage에 저장하고 main page 이동
    const jwt = signInReturn.data.result.jwt;
    localStorage.setItem("x-access-token", jwt);
    alert(signInReturn.data.message);

    return location.replace("./index.html");
}
