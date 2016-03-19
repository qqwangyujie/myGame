//数字的背景色
function getNumBackground(num) {
    switch (num) {
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e3b";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#33b5e5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6c";
            break;
        case 8192:
            return "#93c";
            break;
        default :
            return "black";
    }
}
//数字的前景色
function getNumBackColor(num) {
    if (num <= 4) {
        return "#776e65";
    }
    return "#fff";
}

//文字
function getNumText( number ){
    switch( number ){
        case 2:return "小白";break;
        case 4:return "实习生";break;
        case 8:return "程序猿";break;
        case 16:return "项目经理";break;
        case 32:return "架构师";break;
        case 64:return "技术经理";break;
        case 128:return "高级经理";break;
        case 256:return "技术总监";break;
        case 512:return "副总裁";break;
        case 1024:return "CTO";break;
        case 2048:return "总裁";break;
        case 4096:return "人生巅峰";break;
        case 8192:return "天国";break;
    }

    return "#fff";
}
