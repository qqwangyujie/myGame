$(window).ready(function () {
    newGame.init();
});
//存放数据
var board = [];
//分数
var score = 0;
//新游戏
var newGame = {
    //初始化
    init: function () {
        calculation();
        //在随机2个格子里生成数字
        getRandomNum();
        getRandomNum();
        //更新视图
        boardView();
    }
};

//计算位置每个格子所在的位置
function calculation() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $('#cell' + '-' + i + '-' + j).css({
                top: 20 + i * 20 + i * 100,
                left: 20 + j * 20 + j * 100
            });
        }
    }
    for (var i = 0; i < 4; i++) {
        board[i] = [];
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0
        }
    }
}
//数据视图(将数据的变化更新到页面上)
function boardView() {
    $('.number').remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $('#box').append('<div class="number" id="number-' + i + '-' + j + '"></div>')
            var num = $('#number-' + i + '-' + j);
            num.css({
                top: 20 + i * 20 + i * 100,
                left: 20 + j * 20 + j * 100
            });
            if (board[i][j] == 0) {
                num.css({
                    width: 0,
                    height: 0
                })
            }
            else {
                num.css({
                    width: 100,
                    height: 100,
                    backgroundColor: getNumBackground(board[i][j]),
                    color: getNumBackColor(board[i][j])
                });
                num.text(getNumText(board[i][j]))
            }
        }
    }
}
//随机生成一个数字
function getRandomNum() {
    if (nospace(board)) {
        return false
    }
    //随机一个位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    //判断生成的位置是否有数字，有就重新随机一个位置
    while (true) {
        if (board[randx][randy] == 0) {
            break;
        }
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
    }
    //随机一个数字
    var randNum = Math.random() > .5 ? 2 : 4;
    //随机位置显示随机数字
    board[randx][randy] = randNum;
    showNumAnimation(randx, randy, randNum);
    return true
}
//判断是否有空间
function nospace(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false
            }
        }
    }
    return true
}
//键盘操作
$(document).keydown(function (event) {
    switch (event.keyCode) {
        //左
        case 37:
            if (move.moveLeft()) {
                getRandomNum();

            }
            isGameOver();
            break;
        //上
        case 38:
            if (move.moveUp()) {
                getRandomNum();
            }
            isGameOver();
            break;
        //右
        case 39:
            if (move.moveRight()) {
                getRandomNum();
            }
            isGameOver();
            break;
        //下
        case 40:
            if (move.moveDown()) {
                getRandomNum();
            }
            isGameOver();
            break;
        //其他
        default :
            return false;
    }
});

/*
 *上下左右移动操作
 *  1. canMove 判断是否能够移动  (return true/false)
 *      -是否有空间能移动   (return true/false)
 *  2.如果能够移动
 *      -roadBlock 移动的路径中没有障碍物
 *      -移动的数据相等或为0
 *  3.分数的叠加
 *  4.更新视图到页面
 */
var move = {
    //左移动
    moveLeft: function () {
        if (!this.canMove.canLeft(board)) {
            return false
        }
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j < 4; j++) {
                if (board[i][j] != 0) {
                    for (var k = 0; k < j; k++) {
                        if (board[i][k] == 0 && this.roadBlock.leftRight(i, k, j, board)) {
                            moveAnimation(i, j, i, k);
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                        }
                        else if (board[i][k] == board[i][j] && this.roadBlock.leftRight(i, k, j, board)) {
                            moveAnimation(i, j, i, k);
                            board[i][k] += board[i][j];
                            board[i][j] = 0;
                            score += board[i][k];
                            updateScore(score)
                        }
                    }
                }
            }
        }
        //更新页面数据
        setTimeout(boardView, 200);
        return true
    },
    //右移动
    moveRight: function () {
        if (!this.canMove.canRight(board)) {
            return false
        }
        for (var i = 0; i < 4; i++) {
            for (var j = 2; j >= 0; j--) {
                if (board[i][j] != 0) {
                    for (var k = 3; k > j; k--) {
                        if (board[i][k] == 0 && this.roadBlock.leftRight(i, j, k, board)) {
                            moveAnimation(i, j, i, k);
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                        }
                        else if (board[i][k] == board[i][j] && this.roadBlock.leftRight(i, j, k, board)) {
                            moveAnimation(i, j, i, k);
                            board[i][k] += board[i][j];
                            board[i][j] = 0;
                            score += board[i][k];
                            updateScore(score)
                        }
                    }
                }
            }
        }
        setTimeout(boardView, 200);
        return true
    },
    //上移动
    moveUp: function () {
        if (!this.canMove.canUp(board)) {
            return false
        }
        for (var j = 0; j < 4; j++) {
            for (var i = 1; i < 4; i++) {
                if (board[i][j] != 0) {
                    for (var k = 0; k < i; k++) {
                        if (board[k][j] == 0 && this.roadBlock.upDown(j, k, i, board)) {
                            moveAnimation(i, j, k, j);
                            board[k][j] = board[i][j];
                            board[i][j] = 0;

                        }
                        else if (board[k][j] == board[i][j] && this.roadBlock.upDown(j, k, i, board)) {
                            moveAnimation(i, j, k, j);
                            board[k][j] += board[i][j];
                            board[i][j] = 0;
                            score += board[k][j];
                            updateScore(score)
                        }
                    }
                }
            }
        }
        setTimeout(boardView, 200);
        return true
    },
    //下移动
    moveDown: function () {
        if (!this.canMove.canDown(board)) {
            return false;
        }
        for (var j = 0; j < 4; j++) {
            for (var i = 2; i >= 0; i--) {
                if (board[i][j] != 0) {
                    for (var k = 3; k > i; k--) {
                        if (board[k][j] == 0 && this.roadBlock.upDown(j, i, k, board)) {
                            moveAnimation(i, j, k, j);
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                        }
                        else if (board[k][j] == board[i][j] && this.roadBlock.upDown(j, i, k, board)) {
                            moveAnimation(i, j, k, j);
                            board[k][j] += board[i][j];
                            board[i][j] = 0;
                            score += board[k][j];
                            updateScore(score)


                        }
                    }
                }
            }
        }
        setTimeout(boardView, 200);
        return true;
    },
    //是否能上下左右移动
    canMove: {
        //是否能左移
        canLeft: function (board) {
            for (var i = 0; i < 4; i++) {
                for (var j = 1; j < 4; j++) {
                    if (board[i][j] != 0) {
                        if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                            return true
                        }
                    }
                }
            }
            return false
        },
        //是否能右移动
        canRight: function (board) {
            for (var i = 0; i < 4; i++) {
                for (var j = 2; j >= 0; j--) {
                    if (board[i][j] != 0) {
                        if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) {
                            return true
                        }
                    }
                }
            }
            return false
        },
        //是否能上移动
        canUp: function (board) {
            for (var j = 0; j < 4; j++) {
                for (var i = 1; i < 4; i++) {
                    if (board[i][j] != 0) {
                        if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) {
                            return true;
                        }
                    }
                }
            }
            return false;
        },
        //是否能下移动
        canDown: function (board) {
            for (var j = 0; j < 4; j++) {
                for (var i = 2; i >= 0; i--) {
                    if (board[i][j] != 0) {
                        if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }
    },
    //移动中是否有障碍物
    roadBlock: {
        //左右移动是否有障碍物
        leftRight: function (row, col1, col2, board) {
            for (var i = col1 + 1; i < col2; i++) {
                if (board[row][i] != 0) {
                    return false
                }
            }
            return true
        },
        //上下移动是否有障碍物
        upDown: function (col, row1, row2, board) {
            for (var i = row1 + 1; i < row2; i++) {
                if (board[i][col] != 0) {
                    return false;
                }
            }
            return true;
        }

    }
};
/*
 *游戏结束：
 *  1.判断是否没有空间
 *  2.判断是否能上下左右的移动
 *  3.没有空间并且不能上下左右的移动，游戏结束
 *
 */
function isGameOver() {
    if (nospace(board) && !move.canMove.canLeft(board) && !move.canMove.canRight(board) && !move.canMove.canUp(board) && !move.canMove.canDown(board)) {
        alert('游戏结束')
    }
}
