function uiLight(lightObj){
    this.id = lightObj.id;
    this.name = lightObj.label;
    this.color = lightObj.color;

    this.lightObj = lightObj;
    var light = this;


    $(".light-row").append("<div class='light-holder' id='" + this.id + "'></div>")
    this.lightHolder = $("#" + this.id);
    this.lightHolder.append("<div class='orb'></div>")
    this.lightHolder.append("<div class='light-title'>" + this.name + "</div>")
    this.orb = this.lightHolder.find(".orb");

    this.setColor();
    this.glow();

    this.orb.click(function(){
        console.log(light.lightObj);
        var power = 'on';
        if (light.lightObj.power == 'on') power = 'off';
        setState(light.id, 'power', power, function(data){
            light.lightObj.power = power;
            light.glow();
        });
    });


    return;
    $.ajax(url + "all/state" , {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        contentType: "application/x-www-form-urlencoded",
        success: function(response){
            var data = response.responseText;
            console.log(response);
        },
        error: function(response){
            var data = response.responseText;
            console.log(data);
        },
        data: {
            power: 'off'
        }
    })




}

uiLight.prototype.setColor = function(){
    var color = "hsl(" + this.color.hue + ", 100%, " + (100 - ((this.color.saturation*100)/2)) + "%)";
    this.orb.css("background-color", color);
};

uiLight.prototype.glow = function(){
    var glow = "hsla(" + this.color.hue + ", 100%, " + (100 - ((this.color.saturation*100)/2)) + "%, " + this.lightObj.brightness + ")";
    var shadowWidth = 0;
    if (this.lightObj.power == 'on') shadowWidth = 50
    var boxShadow = "0 0 " + shadowWidth + "px " + glow;
    this.orb.css("-moz-box-shadow", boxShadow);
    this.orb.css("-webkit-box-shadow", boxShadow);
    this.orb.css("box-shadow", boxShadow);
};