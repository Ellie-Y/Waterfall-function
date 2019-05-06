(function() {
    var page = 1;
    var oLi = $('li');
    var oDivWidth = $('.item').eq(0).width();
    var isAllData = false;
    function getData() {
        getDataByAjax('GET', 'data.json', 'page='+page, showData, true);
    }

    function showData(data) {
        if(!data.length || page == 3) {
            isAllData = true;
        }
        var jsonData = JSON.parse(data);
        jsonData.forEach(function(ele, index) {
            var oDiv = $('<div class="item"></div>');
            var oDivContent = $('<img src="'+ ele.image +'"></img><p>'+ ele.title +'</p>');
            var minIndex = findMin().minLiIndex;
            $('img').eq(index).css('height', ele.height / ele.width * oDivWidth);
            oDivContent.appendTo(oDiv);
            oLi.eq(minIndex).append(oDiv);
        });
    }

    //To find the shortest length of 'li' label, and return the index and height
    // Pitures will insert into the first 'li' label even though two equally shortest 'li' exsit
    function findMin() {
        var minLiIndex = 0;
        var minLiHeight = oLi.eq(0).height();
        oLi.each(function(index, ele) {
            if( minLiHeight > oLi.eq(index).height() ) {
                minLiHeight = oLi.eq(index).height();
                minLiIndex = index;
            }
        });
        return {
            minLiIndex,
            minLiHeight,
            //equal to return {minLiIndex: minLiIndex, minLiHeight: minLiHeight}
        }
    }
    getData();

    window.onscroll = function() {
        var scrollTop = document.documentElement.scrollTop;
        var clientHeight = document.documentElement.clientHeight;
        var minHeight = findMin().minLiHeight;
        if(minHeight < scrollTop + clientHeight) {
            if(!isAllData) {
                getData();
                page++;
            }
        }
    }

})()
