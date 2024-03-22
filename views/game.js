let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let expectedOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9];




const one=document.getElementById('1');
const two=document.getElementById('2');
const three=document.getElementById('3'); 
const four=document.getElementById('4');
const five=document.getElementById('5'); 
const six=document.getElementById('6');
const seven=document.getElementById('7'); 
const eight =document.getElementById('8');
const nine=document.getElementById('9');
const startGame=document.getElementById("startGame");

const buttons = document.querySelectorAll('button');

function number() {
    let index = Math.floor(Math.random() * numbers.length);
    let choiseNumber = numbers[index];
    numbers.splice(index, 1);
    console.log(choiseNumber);
    return choiseNumber;
}

function handleButtonClick(button) {
    let clickedNumber = parseInt(button.innerHTML); // クリックされたボタンのテキストを数値に変換

    // 期待される順番と比較
    if (clickedNumber === expectedOrder[0]) {
        // 正しい順番でクリックされた場合
        console.log("正しい順番です");
        // 期待される順番から削除
        expectedOrder.shift();
        
        // ゲームの終了判定
        if (expectedOrder.length === 0) {
            console.log("ゲームクリア！");
            StopTime();
        }
        button.innerHTML = "" // ボタンのテキストを空にする
    } else {
        console.log("不正解");
    }
}

buttons.forEach(button => {
    button.addEventListener('click', function() {
        handleButtonClick(button);
    });
});

function timeInput() {
    const ms = elapsed % 1000;
    const s = Math.floor(elapsed / 1000) % 60;
    const m = Math.floor(elapsed / (1000 * 60)) % 60;
    const h = Math.floor(elapsed / (1000 * 60 * 60));

    const msStr = ms.toString().padStart(3, '0');
    const sStr = s.toString().padStart(2, '0');
    const mStr = m.toString().padStart(2, '0');
    const hStr = h.toString().padStart(2, '0');
    // 修正: time 要素を定義し、innerHTML を更新する
    let time = document.getElementById('time');
    time.innerHTML = `${hStr}:${mStr}:${sStr}.${msStr}`;
}

let interval = null;
let elapsed = 0;

function timeSet() {
    if (interval !== null) {
        return;
    }
    let prev = new Date();
    interval = setInterval(function() {
        let now = new Date();
        elapsed += now - prev;
        prev = now;

        timeInput();
    }, 10); // 100ミリ秒ごとにログを出力
}

function StopTime() {
    
    clearInterval(interval);
    let latestTime = time;
    let record = latestTime.innerText;
    const playerName = prompt("あなたの名前を入力してください：");
    console.log(`名前: ${playerName} レコード: ${record}`);

    axios.post("submit-result",{ playerName, record })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });
    const table=document.getElementById('table');
    const end=document.getElementById('end');
    const score=document.getElementById('score');
    const ranking=document.getElementById('ranking');
    const once=document.getElementById('once');
    table.remove()

    end.innerHTML = '<a href="/">終了</a>';
    
    ranking.innerHTML='<a href="/ranking">ランキングへ移動</a>'
    once.innerHTML='<a href="/touch">もう一度行う</a>'
    //DBから配列データーを取得してからタイムを比較してそれらから順位を求めていく
    //なのでforEachで回すだけでおｋ

    const touchData=document.getElementById("touchData")
    console.log(touchData)


    score.innerHTML = `${playerName}さんは<br>${record}で$位です!!`;


}

function gameStart() {
    one.innerHTML = number();
    two.innerHTML = number();
    three.innerHTML = number();
    four.innerHTML = number();
    five.innerHTML = number();
    six.innerHTML = number();
    seven.innerHTML = number();
    eight.innerHTML = number();
    nine.innerHTML = number();
    startGame.remove();
    number();
    timeSet();
}
