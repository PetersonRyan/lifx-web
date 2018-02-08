function uiLight(obj){
    this.id = obj.id;
    this.name = obj.label;

    this.obj = obj;
    var light = this;


    $(".light-row").append("<div class='light-holder' id='" + this.id + "'></div>")
    this.lightHolder = $("#" + this.id);
    this.lightHolder.append("<div class='light-and-title'></div>")
    this.lightAndTitle = this.lightHolder.find('.light-and-title');
    this.lightAndTitle.append("<div class='orb'></div>")
    this.lightAndTitle.append("<div class='light-title'>" + this.name + "</div>")
    //this.lightHolder.append("<button type='button' class='update-light-button btn btn-primary'>Update Light</button>")
    var lightTemplate = "<div class='light-holder' id='" + this.id + "'>" +
            "<div class='row'>" +
                "<div class='col-sm-3'><div class='lightness-picker'></div></div>" +
                "<div class='col-sm-6 light-and-title'>" +
                    "<div class='orb'></div><div class='light-title'>" + this.name + "</div>" +
                "</div>" +
                "<div class='col-sm-3'><div class='other-picker'></div></div>" +
            "</div>" +
            "<div class='row'><div class='color-picker'></div></div>" +
        "</div>"
    this.lightHolder.append("<div class='color-picker'></div>")

    this.orb = this.lightHolder.find(".orb");
    this.orb.append("<i class='fa fa-lightbulb-o fa-2 light-bulb' aria-hidden='true'></i>");

    //this.updateButton = this.lightHolder.find(".update-light-button");
    var orb = this.orb;
    // this.updateButton.click(function(){
    //     var toColorrgb = $(orb).children('.fa').css('color');
    //     toColorrgb = toColorrgb.substring(4, toColorrgb.length - 1);
    //     var rgbArr = JSON.parse('[' + toColorrgb + ']')
    //     console.log(rgbArr)
    //     var hex = '#' + fullColorHex(rgbArr[0], rgbArr[1], rgbArr[2]);
    //     console.warn(hex)
    //     setState(light.id, { color: hex });
    // });

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

$('.light-row').on('click', '.light-title, .color-picker', function(e){
    e.stopPropagation(); //stop document.click from closing it
    var currentColorPicker = $(this).parent('.light-holder').find('.color-picker');

    $('.color-picker').filter(function(){
        if ($(this).css('display') !== 'none') $(this).hide();
    });

    currentColorPicker.show();
});



$(document).click(function(){
    //Closes any open
    $('.color-picker').filter(function(){
        if ($(this).css('display') !== 'none') $(this).hide();
    });
});


// (function( $ ) {
//
//     $.fn.properAnchor = function(options) {
//
//         return this;
//
//     };
//
// }( jQuery ));