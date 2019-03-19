//点击开始游戏 动态生成100个小格子  

var startBtn = document.getElementsByClassName('but')[0];
var box = document.getElementsByClassName('box')[0];
var flagBox = document.getElementsByClassName('flagBox')[0];
var alertBox = document.getElementsByClassName('alertBox')[0];
var alertImg = document.getElementsByClassName('alertImg')[0];
var close = document.getElementsByClassName('close')[0];
var score = document.getElementsByClassName('score')[0];

var no1 = document.getElementsByClassName('no1')[0];
var no2 = document.getElementsByClassName('no2')[0];
var sum = 10;
var sjs = 100;
var minesNum;
var mineOver;
var number = 10;
var block;
var mineMap = [];
var startKey = true;



bindEvent();

//绑定事件函数
function bindEvent() {

    //开始
    startBtn.onclick = function () {
        if (startKey) {
            box.style.display = 'block';
            flagBox.style.display = 'block';
            init();
            startKey = false;

        }
    }
    //清除右键点击事件
    box.oncontextmenu = function () {
        return false;
    }
    //鼠标左右键的事件
    box.onmousedown = function (e) {
        var event = e.target;
        if (e.which == 1) {
            leftClick(event);
        } else if (e.which == 3) {
            rightClick(event);
        }
    }
    //关闭并从新开始
    close.onclick = function () {
        alertBox.style.display = 'none';
        flagBox.style.display = 'none';
        box.style.display = 'none';
        box.innerHTML = '';
        startKey = true;
    }
    //简单模式
    no1.onclick = function () {
        sum = 10;
        number = 10;
        sjs = 100;
        box.style.width = '500px';
        box.style.height = '500px';
        box.style.transform = 'perspective(800px) rotateX(45deg)';
        // startKey=true;    
    }
    //困难模式
    no2.onclick = function () {
        sum = 30;
        number = 15;
        sjs = 225;
        box.style.width = '750px';
        box.style.height = '750px';
        box.style.transform = 'perspective(800px) rotateX(15deg)';
        startKey = true;
    }
}

//初始化
function init() {
    minesNum = sum;
    mineOver = sum;
    score.innerHTML = mineOver;
    for (var i = 0; i < number; i++) {
        for (var j = 0; j < number; j++) {
            var con = document.createElement('div');
            con.classList.add('block');
            con.setAttribute('id', i + '-' + j);
            box.appendChild(con);
            mineMap.push({ mine: 0 });

        }
    }
    block = document.getElementsByClassName('block');
    while (minesNum) {
        var mineIndex = Math.floor(Math.random() * sjs);
        if (mineMap[mineIndex].mine === 0) {
            mineMap[mineIndex].mine = 1;
            block[mineIndex].classList.add('isLei');
            minesNum--;
        }
    }

}
//左击事件
function leftClick(dom) {
    
    //标记旗子了不能左击
    if (dom.classList.contains('flag')) {
        return;
    }
    var isLei = document.getElementsByClassName('isLei');
    if (dom && dom.classList.contains('isLei')) {
        for (var i = 0; i < isLei.length; i++) {
            isLei[i].classList.add('show');
        }
        setTimeout(function () {
            alertBox.style.display = 'block';
            alertImg.style.backgroundImage = 'url("./img/0.jpg")';
        }, 800)
    } else {
        var n = 0;
        var posArr = dom && dom.getAttribute('id').split('-');
        var posX = posArr && +posArr[0];
        var posY = posArr && +posArr[1];
        dom && dom.classList.add('num');
        for (var i = posX - 1; i <= posX + 1; i++) {
            for (var j = posY - 1; j <= posY + 1; j++) {
                var aroundBox = document.getElementById(i + '-' + j);
                if (aroundBox && aroundBox.classList.contains('isLei')) {
                    n++
                }
            }
        }
        dom && (dom.innerHTML = n);
        if (n == 0) {
            for (var i = posX - 1; i <= posX + 1; i++) {
                for (var j = posY - 1; j <= posY + 1; j++) {
                    var nearBox = document.getElementById(i + '-' + j);
                    if (nearBox && nearBox.length != 0) {//nearBox.length!=0感觉没有用
                        if (!nearBox.classList.contains('check')) {
                            nearBox.classList.add('check')
                            leftClick(nearBox);
                        }
                    }
                }
            }
        }

    }
    if ((number * number - document.getElementsByClassName('num').length) == sum) {
        setTimeout(function () {
            alertBox.style.display = 'block';
            alertImg.style.backgroundImage = 'url("./img/1.jpg")';
        }, 800);
    }
}
//右击事件
function rightClick(dom) {
    
    if (dom.classList.contains('num')) {
        return;
    }
    //
    dom.classList.toggle('flag');

    if (dom.classList.contains('isLei') && dom.classList.contains('flag')) {
        mineOver--;
    }
    if (dom.classList.contains('isLei') && !dom.classList.contains('flag')) {
        mineOver++;
    }
    var xx = document.getElementsByClassName('flag').length; 
       
    if (mineOver == 0 && xx == sum) {
        setTimeout(function () {
            alertBox.style.display = 'block';
            alertImg.style.backgroundImage = 'url("./img/1.jpg")';
        }, 800);
    }
   
    
}
       
        // }
       // score.innerHTML = mineOver;




