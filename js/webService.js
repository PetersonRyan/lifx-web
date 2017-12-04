function PUT(url, data, success, error){
    $.ajax(url, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        contentType: "application/x-www-form-urlencoded",
        success: success,
        error: function(response){
            var data = response.responseText;
            console.log(data);
        },
        data: data
    })
}

function getLights(selector, callback, errorHandle) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://api.lifx.com/v1/lights/" + selector, true); // false for synchronous request
    xmlHttp.setRequestHeader('Authorization', 'Bearer ' + token);
    xmlHttp.onload = function (data) {
        var status = xmlHttp.status; // HTTP response status, e.g., 200 for "200 OK"
        data = xmlHttp.responseText; // Returned data, e.g., an HTML document.

        if (status == 200) callback(data);
        else if (errorHandle) errorHandle(status, data);
        else {
            console.log(status);
            console.log(data);
        }
    };
    xmlHttp.send(null);
}