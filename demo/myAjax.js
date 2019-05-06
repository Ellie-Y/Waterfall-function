
function getDataByAjax(type, url, data, callback, flag){
    var ajaxObj = null;  
    if(window.XMLHttpRequest) {
        ajaxObj = new XMLHttpRequest();
    }else {
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
        ajaxObj.open(type, url, flag);  
        ajaxObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        ajaxObj.send(data);
    }else if(type == 'GET') {
        ajaxObj.open(type, url + '?' + data, flag);
        ajaxObj.send();
    }else {
        console.log('No that method yet');
    }
}
