var token = "";
var url = "https://api.lifx.com/v1/lights/";
var lights = [];



function initiate(){
    getLights("all", function(data){
        console.log(data);
        var lightArr = JSON.parse(data)
        $.each(lightArr, function(k,v){
            console.log(k);
            console.log(v);

            lights.push(new uiLight(v));
        });

    });
    return;
    setInterval(function(){
        getLights(function(data){
            lights = JSON.parse(data);
            $.each(lights, function(k,v){
                var hue = v.color.hue;
                var saturation = v.color.saturation;
                var kelvin = v.color.kelvin;
                var brightness = v.brightness;
                var color = "hsl(" + hue + ", 100%, " + (100 - ((saturation*100)/2)) + "%)";
                var glow = "hsla(" + hue + ", 100%, " + (100 - ((saturation*100)/2)) + "%, " + brightness + ")";
                console.log(color);
                $(".light").css("background-color", color);
                var boxShadow = "0 0 10px " + color;
                if (v.power == "on"){
                    console.log(glow)
                    boxShadow = "0 0 50px 5px " + glow;
                }
                else {
                    boxShadow = "0 0 0px " + color;
                }
                $(".light").css("-moz-box-shadow", boxShadow);
                $(".light").css("-webkit-box-shadow", boxShadow);
                $(".light").css("box-shadow", boxShadow);
                //hsla(318, 100%, 50%, 1)
            });
        });
    }, 5000);
    $(".light").click(function(){
        var i = 0;
        if (lights[i].power == "on") setState(lights[i].id, 'power', 'off', function(data){
            console.log(data);
        });
        else setState(lights[i].id, 'power', 'on', function(data){
            console.log(data);
        });
    });
}

function getLights(selector, callback, errorHandle) {
   var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url + selector, true); // false for synchronous request
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

function setState(selector, key, value, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("PUT", url + selector + "/state", true); // false for synchronous request
    xmlHttp.setRequestHeader('Authorization', 'Bearer ' + token);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.onload = function (data) {
        var status = xmlHttp.status; // HTTP response status, e.g., 200 for "200 OK"
        data = xmlHttp.responseText; // Returned data, e.g., an HTML document.

        if (status == 200 || status == 207) callback(data);
        else {
            console.log(status);
            console.log(data);
        }
    };
    xmlHttp.send(key + "=" + value);
}