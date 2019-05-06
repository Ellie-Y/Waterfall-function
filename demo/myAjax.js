/* 流程
 1. 浏览器
 2. ajax 对象
 3. ajax.open(method, url, true)
 4. ajax.send()
 5. onreadystatechange -> 4
 6. status == 200 (200是获取成功)
*/

function getDataByAjax(type, url, data, callback, flag){
    var ajaxObj = null;  //用来存储和请求响应的信息
    if(window.XMLHttpRequest) {
        ajaxObj = new XMLHttpRequest();
    }else {
        //兼容 ie
        ajaxObj = new ActiveXObject('Microsoft.XMLHttp');
    }

    ajaxObj.onreadystatechange = function() {
        if(ajaxObj.readyState == 4) {
            if(ajaxObj.status == 200) {
                callback(ajaxObj.responseText);
            }else {
                console.log('error');
            }
        }
    }

    // ajaxObj.open(type, url, flag);
    type = type.toUpperCase()
    if(type == 'POST') {
        ajaxObj.open(type, url, flag);  //flag 是否异步
        ajaxObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        ajaxObj.send(data);
    }else if(type == 'GET') {
        //get请求里默认有setRequestHeader
        ajaxObj.open(type, url + '?' + data, flag);
        ajaxObj.send();
    }else {
        console.log('No that method yet');
    }
}
