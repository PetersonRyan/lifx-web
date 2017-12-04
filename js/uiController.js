function uiLight(obj){
    this.id = obj.id;
    this.name = obj.label;

    this.obj = obj;
    var light = this;


    $(".light-row").append("<div class='light-holder' id='" + this.id + "'></div>")
    this.lightHolder = $("#" + this.id);
    this.lightHolder.append("<div class='orb'></div>")
    this.lightHolder.append("<div class='light-title'>" + this.name + "</div>")
    this.orb = this.lightHolder.find(".orb");
    this.orb.append("<i class='fa fa-lightbulb-o fa-2' aria-hidden='true'></i>");

    this.updateUI();

    this.orb.click(function(){
        var power = 'on';
        if (light.obj.power == 'on') power = 'off';
        setState(light.id, { power: power });
    });
}


uiLight.prototype.setObj = function(obj){
    this.obj = obj;
    this.updateUI();
};

uiLight.prototype.updateUI = function(){
    this.updateColor();
    this.updateGlow();
};

uiLight.prototype.updateColor = function(){
    var color = "hsl(" + this.obj.color.hue + ", 100%, " + (100 - ((this.obj.color.saturation*100)/2)) + "%)";
    this.orb.css("border", "solid " + color + " 4px");
    //this.orb.css("background-color", color);
};

uiLight.prototype.updateGlow = function(){
    var glow = "hsla(" + this.obj.color.hue + ", 100%, " + (100 - ((this.obj.color.saturation*100)/2)) + "%, " + this.obj.brightness + ")";
    var shadowWidth = 0;
    var textColor = "#9d9d9d";
    console.log(this.obj.power);
    if (this.obj.power == 'on') {
        shadowWidth = 50;
        textColor = "white";
    }
    var boxShadow = "0 0 " + shadowWidth + "px " + glow;
    this.orb.css("-moz-box-shadow", boxShadow);
    this.orb.css("-webkit-box-shadow", boxShadow);
    this.orb.css("box-shadow", boxShadow);

    this.orb.css("color", textColor);
};