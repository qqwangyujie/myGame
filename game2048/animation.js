
//生成随机数字的动画
function showNumAnimation(x, y, num) {
    var number = $('#number-' + x + '-' + y);
    number.css({
        backgroundColor: getNumBackground(num),
        color: getNumBackColor(num)
    });
    number.text(num);
    number.animate({
        width: 100,
        height: 100,
        top: 20 + x * 20 + x * 100,
        left: 20 + y * 20 + y * 100
    }, 200)
}

function moveAnimation(fromX,fromY,toX,toY){
    var num = $('#number-' + fromX + '-' + fromY);
    num.animate({
        top: 20 + toX * 20 + toX * 100,
        left: 20 + toY * 20 + toY * 100

    },200)
}