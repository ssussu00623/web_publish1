// 
import {kobisBoxOffice as boxOffice, searchMoviePoster, kmdbMovieDetail} from './1_kobisCommons.js'; 

/* 
    함수 이름이 너무 길다 느낄 때 as를 사용하여 이 파일 내에서만 활용할 수 있다. 
    import {kobisBoxOffice} from './1_kobisCommons.js'; < - 원문은 이쪽 ! 
*/

initForm();

function initForm (){
    const output = `
        <h1>KOBIS 박스 오피스</h1>
        <div id="search">
            <select id="type">
                <option value="default">선택</option>
                <option value="Daily">일별</option>
                <option value="Weekly">주간/주말</option>
            </select>
            <input type="text" id="searchDt" placeholder="예) 20241122">
            <button type="button" id="searchBtn">Search</button>
        </div>
        <div id="result"></div>

        <div id="imageModal" class="modal" style=" display:none">
            <div class="modal-content">
                <span id="closeModal" class="close">&times;</span>
                <img id="modalImage" src="" alt="Modal Image" style="width:40%"/>
            </div>
        </div>
        
    `;// function searchBoxOffice(searchDt) 내용이 div 에 들어가게 된다.

    document.querySelector("body").innerHTML = output;
    // 이벤트는 실행한 다음에 주어야한다. 브라우저 내부의 틀이 만들어지기 나올 수 없음 
    // 기본 박스 오피스 화면 출력: 20240101
    searchBoxOffice('Daily','20240101');


    /**서치 버튼 이벤트를 추가 */
    /*
    document.querySelector("#searchBtn").addEventListener();
    */
    let searchButton = document.querySelector("#searchBtn");
    searchButton.addEventListener('click', ()=> {
        //searchDt입력창 박스오피스 타입의 유효성 체크
        let type = document.querySelector('#type');
        let searchDt = document.querySelector('#searchDt');
        
        if(type.value === 'default'){
            alert('박스오피스 타입을 설정해주세요.')
            type.focus();
        } 
        else if(searchDt.value === '') {
            alert('날짜를 입력해주세요.');
            searchDt.focus();     
        }  else {
        //일별&주간/주말 박스오피스 정보 화면 출력
        searchBoxOffice(type.value, searchDt.value);
        }
    });
} // end of initForm

function searchBoxOffice(ktype, searchDt) {
    boxOffice(ktype, searchDt) // Promise 객체로 리턴
        .then((result) => {
            // const rankType = ktype.toLowerCase();
            const type = result.boxOfficeResult.boxofficeType;
            const range = result.boxOfficeResult.showRange;            
            let rankList = null; //ktype을 체크하여 Daily, Weekly
            let posterList = [];

            if(ktype === 'Daily'){
                rankList = result.boxOfficeResult.dailyBoxOfficeList;
            } else if(ktype === 'Weekly'){
                rankList = result.boxOfficeResult.weeklyBoxOfficeList;
            }


            rankList.forEach((element) => console.log(element.movieNm));


            //영화 포스터 가져오기 - KMDB
            rankList.forEach((element) => {
                let movieNm = element.movieNm;
                let openDt = element.openDt.replaceAll('-','');

                posterList.push(getPoster(movieNm, openDt));                
            });


            Promise.all(posterList)  //비동기식 처리는 모두 종료가 되도록 실행
            .then((poster) => {

                    let output = `            
                        <h5>박스오피스 타입 : ${type}</h5>
                        <h5>박스오피스 일자 : ${range}</h5>
                        <table border=1>
                            <tr>
                                <th>순위</th>
                                <th>제목</th>
                                <th>개봉일</th>
                                <th>당일관객수</th>
                                <th>누적관객수</th>
                            </tr>`;
                    
                    rankList.forEach((element, i) => {
                                output += `
                                <tr>
                                    <td>${element.rank}</td>
                                    <td>
                                        <img src=${poster[i]} width="100px" class="poster"
                                            id="${element.movieNm},${element.openDt.replaceAll('-','')}" >
                                        ${element.movieNm}</td>
                                    <td>${element.openDt}</td>
                                    <td>${element.audiCnt}</td>
                                    <td>${element.audiAcc}</td>
                                </tr>                    
                            `;

                    });  
                                    
                    output += `</table>`;
                    
                    // 테이블 화면 출력            
                    document.querySelector("#result").innerHTML = output;


                    //이미지 클릭 이벤트
                    const images = document.querySelectorAll(".poster");
                    images.forEach((image) => image.addEventListener('click', onMovieDetail));


            }).catch(); //Promise.all()

        })
        .catch(); //
}

/** 이미지 이벤트 처리 함수 */
function onMovieDetail(event) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModalBtn = document.getElementById('closeModal');

    let [movieNm, openDt] = event.target.id.split(",");

    kmdbMovieDetail(movieNm, openDt)
        .then((result) => {
            // console.log(result.Data[0].Result[0].title);
            const imageSrc = event.target.src; // 클릭한 이미지의 src를 가져옴
            modalImage.src = imageSrc; // 모달 창에 이미지 넣기
            modal.style.display = 'block'; // 모달 창을 표시
            
        })
        .catch((error) => console.log(error) );


    
        // 모달 닫기 버튼 클릭 시 모달 닫기
        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none'; // 모달 창 닫기
        });

        // 모달 바깥쪽 클릭 시 모달 닫기
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none'; // 모달 창 닫기
            }
        });
    
}//onMovirDetail

async function getPoster(movieNm, openDt) {
    return await searchMoviePoster(movieNm, openDt);
}
// 입력된 날짜를... fetch의 파라미터로 보내서 출력할 수 있도록.
