


//生成随机数字的动画
function showNumAnimation(x, y, num) {
    var number = $('#number-' + x + '-' + y);
    number.css({
        backgroundColor: getNumBackground(num),
        color: getNumBackColor(num)
    });
    number.text(getNumText(num));
    number.animate({
        width: cellWidht,
        height: cellHeight,
        top: cellMargin + x * cellMargin + x * cellWidht,
        left: cellMargin + y * cellMargin + y * cellWidht
    }, 200)
}

function moveAnimation(fromX,fromY,toX,toY){
    var num = $('#number-' + fromX + '-' + fromY);
    num.animate({
        top: cellMargin + toX * cellMargin + toX * cellWidht,
        left: cellMargin + toY * cellMargin + toY * cellHeight

    },200)
}
function updateScore(){
    $('#score').text(score)
}