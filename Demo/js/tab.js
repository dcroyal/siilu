/**
 * Created by Administrator on 2016/4/17 0017.
 */

//	头部导航下拉菜单
var oUl = document.querySelector(".head-right");
var oli = oUl.getElementsByTagName("li");
var oDiv = document.querySelectorAll("li>div")
var oList = oUl.getElementsByTagName("li");
//   oUl.onmouseover = function(e){
//	   e = e||window.event;
//	   var target = e.target|| e.srcElement;
//	   var oDiv = target.nextElementSibling;
//	   if(oDiv.tagName=="DIV"){
//
//		   oDiv.style.display = "block";
//	   }
//
//	   return false;
//   }
for(var i=0;i<oli.length;i++){
    if(oli[i].children.length>0){
        oli[i].onmouseover = function(){

            this.children[1].style.display = "block";
        }
    }

}
for(var i=0;i<oli.length;i++){
    if(oli[i].children.length>0){
        oli[i].onmouseout = function(){
            this.children[1].style.display = "none";
        }
    }

}

//	menu下的多级下拉菜单
var menuUl = utils.getElementsByClass("menu-list",document)[0];
var menuDiv = utils.getElementsByClass("menu-div",menuUl)[0];
var menuDivChild =utils.children(menuDiv,"div") ;
menuUl.onmouseover = function(){
    menuDiv.style.display = "block";
};
for(var i =0;i<menuDivChild.length;i++){
    menuDivChild[i].onmouseover = function(){

        this.children[3].style.display="block"
        this.children[3].style.zIndex = 1000;
    }

}
for(var i =0;i<menuDivChild.length;i++){
    menuDivChild[i].onmouseout = function () {
        this.children[3].style.display="nine"
        this.children[3].style.zIndex = "";
    }
}
menuUl.onmouseout = function(){
    menuDiv.style.display = "none";
}

//	轮播图
var tab = utils.getElementsByClass("tab",document)[0];
var tabUl = tab.children[0];
var tabP = tab.children[1];
var tabLeft = tab.children[2];
var tabRig = tab.children[3];
var autoTimer =null;
function tabChange(ele,target){
    clearInterval(ele.timer);
    function step(){
        var nspeed = (target-ele.offsetLeft)/10;
        nspeed = nspeed>0?Math.ceil(nspeed):Math.floor(nspeed);
        if(nspeed==0){
            clearInterval(ele.timer);
        }
        ele.style.left = ele.offsetLeft+nspeed+"px";
    }
    step();
    ele.timer = setInterval(step,15);
}
var aSpan = tabP.getElementsByTagName("span");
for(var i =0; i<aSpan.length;i++){
    aSpan[i].index = i;
    aSpan[i].onclick = function(){
        clearInterval(autoTimer);
        tabChange(tabUl,-720*this.index);
        setCur(this);
        n = this.index;
        autoTimer = setInterval(autoMove,2000)


    }
}
function setCur(ele){
    //给当前点击的元素设置类名cur
    utils.addClass(ele,"hover");
    //获取所有的兄弟元素,把类名cur都去掉
    var siblings = utils.siblings(ele);
    for(var i = 0;i<siblings.length;i++){
        utils.removeClass(siblings[i],"hover");
    }
}

var first = utils.children(tabUl,"li")[0];
first = first.cloneNode(true);
tabUl.appendChild(first);
tabUl.style.width = tabUl.offsetWidth+first.offsetWidth+"px";
var n =0;

tabRig.onclick =function(){
    clearInterval(autoTimer);
    autoMove();
    autoTimer = setInterval(autoMove,2000)
};

tabLeft.onclick=function() {
    clearInterval(autoTimer);
    n--;
    if(n<0){
        tabUl.style.left=-3600+"px";
        n=4;
        setCur(aSpan[4]);
    }
    setCur(aSpan[n]);
    tabChange(tabUl,-720*n)
    autoTimer = setInterval(autoMove,2000)
};
function autoMove(){
    n++;
    if(n==6){
        tabUl.style.left=0;
        n=1;
    }
    if(n==5){
        setCur(aSpan[0]);
    }else{
        setCur(aSpan[n]);
    }
    tabChange(tabUl,-720*n)

}
autoTimer = setInterval(autoMove,2000)
//    tabUl.onmouseover=function(){
//		clearInterval(autoTimer);
//	}
//	tabUl.onmouseout=function(){
//		autoTimer = setInterval(autoMove,2000)
//	}
/*
 input 增加类名
 */
var regUl = utils.getElementsByClass("reg",document)[0];
var inputLi = utils.children(regUl,"li");
for(var i =0; i<inputLi.length;i++){
    var regInput = utils.children(inputLi[i],"input")[0];
    regInput.onfocus=function(){
        this.parentNode.className = "red-bor";
    }

    regInput.onblur=function(){
        this.parentNode.className = "";
    }

}


/*top小轮播图 */
var tabSpan = utils.getElementsByClass("span-title",document)[0];

var tabP = utils.next(tabSpan);
var topSpan = tabP.getElementsByTagName("span")[0];

function tabChange01(ele,target){
    clearInterval(ele.timers);
    function step(){
        var nspeed = (target-ele.offsetTop)/10;
        nspeed = nspeed>0?Math.ceil(nspeed):Math.floor(nspeed);
        if(nspeed==0){
            clearInterval(ele.timers);
        }
        ele.style.top = ele.offsetTop+nspeed+"px";
    }
    step();
    ele.timers = setInterval(step,15);
}

var rTime0 = 0;
var rTime1 = 0;
var rTime2 = 0;
var rTime3 = 0;
function autoMove01(rTime,divName){
    var imgCount = utils.children(divName,"img").length;
    setInterval(
        function(){
            rTime++;
            if(rTime==imgCount){
                divName.style.top=0;
                rTime=1;
            }

            tabChange01(divName,-36*rTime)
        }
        ,1200);
}

var roundSpan = utils.getElementsByClass("roundRunSpan",document);
autoMove01(rTime0,roundSpan[0]);
autoMove01(rTime1,roundSpan[1]);
autoMove01(rTime2,roundSpan[2]);
autoMove01(rTime3,roundSpan[3]);

//	hotserver
var hotDiv = utils.getElementsByClass("pub-rig",document);
for(var i =0;i<hotDiv.length;i++){
    tabDl(hotDiv[i])
}
function tabDl(hotDiv){
    var aDls = hotDiv.getElementsByTagName("dl");

    for(var i =0; i<aDls.length;i++){
        //console.log(aDls[i]);

        if(i%2 != 0){
            aDls[i].index =i;
            aDls[i].onmouseover=function(){
                for(var i =0; i<aDls.length;i++){
                    if(i%2!=0){
                        aDls[i].style.display="block";
                    }else{
                        aDls[i].style.display="none";
                    }
                }
                this.style.display='none';
                //console.log(this.index);
                //console.log(this.index-1);
                aDls[this.index-1].style.display="block";
            }
        }

    }
}

//	每日精读
var readUl = utils.getElementsByClass('tab-title',document)[0];
var readLi = readUl.getElementsByTagName('li');
var readDiv = utils.getElementsByClass('change',document)[0];
var readchild = readDiv.getElementsByTagName('div');
var prev = 0;
function changeTab(n){
    readLi[n].className="bg-red";
    readchild[n].style.display="block";
    readLi[prev].className="";
    readchild[prev].style.display="none";
    prev = n;
}
for(var i = 0; i<readLi.length;i++){
    readLi[i].index = i;
    readLi[i].onclick = function(){
        changeTab(this.index)
    }
}
