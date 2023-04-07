var listdiv = document.getElementById("itemlist")
var $ = mdui.$


function copy(content) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(content).then()
    }
}
function message(text) {
    mdui.snackbar({
        message: text,
        position: "top"
    })
}
function command(itemname) {
    var comma = "give " + document.getElementById("en").value + " " + itemname + " " + document.getElementById("sl").value
    return comma
}
function ans() {
    document.getElementById("main").className = "mdui-drawer-body-left mdui-loaded mdui-theme-layout-dark"
}
function liangs() {
    document.getElementById("main").className = "mdui-drawer-body-left mdui-loaded"
}
function mcmodurl(rname) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/modid");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // 请求成功时解析响应数据并返回
                    const response = xhr.responseText;
                    resolve(response);
                } else {
                    // 请求失败时返回错误信息
                    reject(new Error("请求失败"));
                }
            }
        };
        xhr.send(JSON.stringify({ "rname": rname }));
    });
}



function makeitem(iteminfo) {
    var i = iteminfo
    var li = document.createElement('li');
    li.setAttribute('class', 'mdui-list-item  mdui-ripple mdui-hoverable mdui-panel-item mdui-panel-popout')
    //divph
    var div_ph = document.createElement('div');
    div_ph.setAttribute('class', 'mdui-panel-item-header')
    var itemimage = document.createElement('img');
    itemimage.setAttribute('src', 'data:image/png;base64,' + i.smallIcon)
    var namei = document.createElement('div')
    namei.textContent = i.name + '(' + i.englishName + ')'
    div_ph.appendChild(itemimage)
    div_ph.appendChild(namei)
    li.appendChild(div_ph)

    //divpb
    var div_pb = document.createElement('div');
    div_pb.setAttribute('class', 'mdui-panel-item-body')
    //b1
    var button1 = document.createElement('button')
    button1.setAttribute('class', 'mdui-btn mdui-btn-icon')
    var i1 = document.createElement('i')
    i1.setAttribute('class', 'mdui-icon material-icons')
    i1.setAttribute('onclick', 'mcmodurl("{}").then(function(url) {location.assign(String(url));}).catch(function(error) {console.error(error);});'.replace('{}', i.registerName))
    i1.setAttribute('mdui-tooltip', '{content: "mcmod网址"}')
    i1.innerHTML = 'insert_link'
    button1.appendChild(i1)
    //b2
    var button2 = document.createElement('button')
    button2.setAttribute('class', 'mdui-btn mdui-btn-icon')
    button2.setAttribute('href', 'javascript:;')
    var i2 = document.createElement('i')
    i2.setAttribute('class', 'mdui-icon material-icons')
    i2.setAttribute('href', 'javascript:;')
    i2.setAttribute('onclick', 'copy(command("{}"));message("已复制命令")'.replace('{}', i.registerName))
    i2.setAttribute('mdui-tooltip', "{content: '复制命令方块命令'}")
    i2.innerHTML = 'code'
    button2.appendChild(i2)

    div_pb.appendChild(button1)
    div_pb.appendChild(button2)

    li.appendChild(div_pb)

    document.getElementById('itemlist').appendChild(li)

}

function additem(a) {
    a.forEach(function (currentValue) {
        makeitem(currentValue)
    });
}


fetch(loadfile, {
    method: 'GET',
    headers: {
    }
}).then(response => response.json()).then(data => additem(data)).catch(error => console.error(error));

function updateScreenSize() {
    var ul = document.getElementById('ul1')
    ul.style.height = (window.innerHeight - 80) + 'px'
}

window.addEventListener('resize', function () {
    updateScreenSize();
});

window.addEventListener('load', function () {
    updateScreenSize();
});