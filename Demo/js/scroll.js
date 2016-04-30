/**
 * Created by Administrator on 2016/4/21 0021.
 */
var silder = document.getElementById("left");
var a = silder.getElementsByTagName("a");
var aDiv = document.getElementsByClassName("ov");
console.log("aDiv.length:" +aDiv.length);
console.log("a.length:"+a.length);

for (var i = 0; i < aDiv.length; i++) {
    a[i].index = i;
    a[i].onclick = function () {
        for(var j = 0; j < a.length; j++){
            a[j].style.color = "rgb(173,173,173)";
        }
        if(timer){clearInterval(timer)}
        console.log("this.index:"+this.index);
        a[this.index].style.color="rgb(228,57,60)";

        console.log(offset(aDiv[this.index]).t-76);
        change(offset(aDiv[this.index]).t-76);
    }

}
window.onscroll=function(){
    var winh = document.documentElement.scrollTop||document.body.scrollTop;
    if(winh>500){
        silder.style.display = "block";
        silder.style.position = 'fixed';
        silder.style.top = 300+"px";
    }else{
        silder.style.display = "none";
        silder.style.position = 'absolute';
    }
    for (var i = 0; i < a.length; i++) {

        console.log(">>>1:" + document.documentElement.scrollTop || document.body.scrollTop)
        console.log(">>>2:" + document.documentElement.clientHeight || document.body.clientHeight)
        //console.log("offset(aDiv[i]).t + aDiv[i+1].clientHeight/2:" + offset(aDiv[i]).t + aDiv[i+1].clientHeight/2)
        if (i == 0) {
            if (winh < (offset(aDiv[i + 1]).t - 80 ) && winh > (offset(aDiv[i]).t) - 560) {
                a[i].style.color = "rgb(228,57,60)";
            } else {
                a[i].style.color = "rgb(173,173,173)";
            }
        } else if (i > 0 && i < a.length - 1) {
            if (winh < (offset(aDiv[i + 1]).t - 80 ) && winh > offset(aDiv[i]).t - 80) {
                a[i].style.color = "rgb(228,57,60)";
            } else {
                a[i].style.color = "rgb(173,173,173)";
            }

        } else if (i == a.length - 1) {
            if (winh <= offset(aDiv[i]).t + 500 && winh>offset(aDiv[i]).t - 80) {
                a[i].style.color = "rgb(228,57,60)";
            } else {
                a[i].style.color = "rgb(173,173,173)";
            }
        }
    }
};
var timer;

function change(target) {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var cur = parseInt(scrollTop);
    clearInterval(timer);
    timer = setInterval(function () {
        if (target > cur) {
            cur += Math.ceil((target - cur) / 10);
        } else {
            cur -= -Math.floor((target - cur) / 10);
        }
        if (cur == 0) {
            clearInterval(timer);
        }
        document.documentElement.scrollTop = document.body.scrollTop = cur;
        if(cur==target)clearInterval(timer)
    }, 15)
}

function offset(ele){
    var left = ele.offsetLeft;
    var top = ele.offsetTop;
    var p = ele.offsetParent;
    while(p){
        if(navigator.userAgent.indexOf("MSIE 8.0")==-1){
            left+=p.clientLeft;
            top+=p.clientTop;
        }
        left+= p.offsetLeft;
        top+= p.offsetTop;
        p = p.offsetParent;
    }
    return {l:left,t:top};
}
