window.onload = function () {
    var content = document.getElementsByClassName('content')[0]
    var wrapper = document.getElementsByClassName('wrapper')[0]
    var radius = document.getElementsByClassName('radius')[0]
    var prev = document.getElementsByClassName('prev')[0]
    var next = document.getElementsByClassName('next')[0]
    var imgWidth = wrapper.children[0].offsetWidth
    var wrapIndex = 0

    //悬停显隐
    content.onmouseover = function () {
        clearInterval(timer)
        next.style.opacity = "0.6";
        prev.style.opacity = "0.6";
    }
    content.onmouseout = function () {
        timer = setInterval(function () {
            next.onclick()
        }, 3500)
        next.style.opacity = "0";
        prev.style.opacity = "0";
    }

    //动态创建圆点指示器
    function createLi() {
        for (let i = 0; i < wrapper.children.length - 1; i++) {
            let li = document.createElement("li")
            radius.appendChild(li)
        }
        radius.children[0].className = 'radius-active'
    }
    createLi()

    //指示器响应
    function cirAction(wrapIndex) {
        for (let i = 0; i < radius.children.length; i++) {
            radius.children[i].classList.remove("radius-active")
        }
        if (wrapIndex === wrapper.children.length - 1) {
            radius.children[0].className = 'radius-active'
        } else {
            radius.children[wrapIndex].className = 'radius-active'
        }
    }

    //指示器控制
    function cirMouse() {
        for (let i = 0; i < radius.children.length; i++) {
            radius.children[i].onmouseover = function () {
                clearInterval(timer);
                animate(wrapper, -i * imgWidth);
                wrapIndex = i;
                cirAction(wrapIndex)
            }
        }
    }
    cirMouse()

    //滑动动画
    function animate(el, target) {
        clearInterval(el.timer)
        el.timer = setInterval(function () {
            let move = 25;
            let present = wrapper.offsetLeft;
            move = present > target ? -move : move;
            present += move;
            if (Math.abs(present - target) > Math.abs(move)) {
                wrapper.style.left = present + 'px'
            } else {
                clearInterval(el.timer);
                wrapper.style.left = target + 'px'
            }
        }, 16)
    }

    //next控制
    next.onclick = function () {
        if (wrapIndex === wrapper.children.length - 1) {
            wrapIndex = 0;
            wrapper.style.left = 0 + 'px';
        }
        wrapIndex++;
        animate(wrapper, -wrapIndex * imgWidth);
        cirAction(wrapIndex);
    }

    //prev控制
    prev.onclick = function () {
        if (wrapIndex === 0) {
            wrapIndex = wrapper.children.length - 1;
            wrapper.style.left = -wrapIndex * imgWidth + 'px';
        }
        wrapIndex--;
        animate(wrapper, -wrapIndex * imgWidth);
        cirAction(wrapIndex)
    }

    //自动滑动
    var timer = setInterval(function () {
        next.onclick()
    }, 3500)
}
