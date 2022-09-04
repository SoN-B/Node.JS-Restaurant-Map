// **********************************************************
// 1. 지도 생성 & 확대 축소 컨트롤러

var container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
var options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(37.54, 126.96), // 지도의 중심좌표. 서울 한가운데
    level: 8, // 지도의 레벨(확대, 축소 정도) 3에서 8레벨로 확대
};

var map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

// 지도에 확대 축소 컨트롤을 생성
let zoomControl = new kakao.maps.ZoomControl();

// 지도의 우측에 확대 축소 컨트롤을 추가
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

// **********************************************************
// 2. 더미데이터 준비하기 (제목, 주소, url, 카테고리)
const dataSet = [
    {
        title: "희락돈까스",
        address: "서울 영등포구 양산로 210",
        url: "https://www.youtube.com/watch?v=1YOJbOUR4vw&t=88s",
        category: "양식",
    },
    {
        title: "즉석우동짜장",
        address: "서울 영등포구 대방천로 260",
        url: "https://www.youtube.com/watch?v=1YOJbOUR4vw&t=88s",
        category: "한식",
    },
    {
        title: "아카사카",
        address: "서울 서초구 서초대로74길 23",
        url: "https://www.youtube.com/watch?v=1YOJbOUR4vw&t=88s",
        category: "일식",
    },
];

// **********************************************************
// 3. 여러개 마커 찍기 주소 - 좌표 변환
var geocoder = new kakao.maps.services.Geocoder();

function getCoordsByAddress(address) {
    // promise 형태로 반환
    return new Promise((resolve, reject) => {
        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(address, function (result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                return resolve(coords);
            }
            reject(new Error("getCoordsByAddress Error: not valid Address"));
        });
    });
}

async function setMap() {
    for (var i = 0; i < dataSet.length; i++) {
        let position = await getCoordsByAddress(dataSet[i].address);

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            // position: positions[i].latlng, // 마커를 표시할 위치
            position: position,
            // title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        });
    }
}

setMap();
