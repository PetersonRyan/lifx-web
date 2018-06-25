function uiLight(obj){
    this.id = obj.id;
    this.name = obj.label;

    this.obj = obj;
    var light = this;

    var orb = this.orb;

    var lightTemplate = "<div class='light-holder col-md-4' id='" + this.id + "'>" +
        "<div class='row'>" +
            "<div class='col-sm-3'>" +
                "<div class='lightness-picker'></div>" +
                "<p class='lightness-percent'><span class='percent-span'>" + Math.round(this.obj.brightness * 100) + "</span>%</p>" +
            "</div>" +

            "<div class='col-sm-6 light-and-title text-center'>" +
                "<div class='orb'>" +
                    "<i class='fa fa-lightbulb-o fa-2 light-bulb' aria-hidden='true'></i>" +
                "</div>" +
                "<div class='light-title'>" + this.name + "</div>" +
                "<button type='button' class='apply-button btn btn-primary'>Apply</button>" +
            "</div>" +

            "<div class='col-sm-3'>" +
                "<div class='other-picker'></div>" +
            "</div>" +
        "</div>" +
        "<div class='row'><div class='color-picker'></div></div>" +
        "</div>";
    $(".light-row").append(lightTemplate);
    this.jobj = $("#" + this.id);


    this.updateUI();

    $(this.jobj).find('.orb').click(function(){
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
    $('#' + this.id).find('i.fa').css('color','white');
};

uiLight.prototype.updateColor = function(){
    var color = "hsl(" + this.obj.color.hue + ", 100%, " + (100 - ((this.obj.color.saturation*100)/2)) + "%)";
    $(this.jobj).find('.orb').css("border", "solid " + color + " 4px");
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
    $(this.jobj).find('.orb').css("-moz-box-shadow", boxShadow);
    $(this.jobj).find('.orb').css("-webkit-box-shadow", boxShadow);
    $(this.jobj).find('.orb').css("box-shadow", boxShadow);

    $(this.jobj).find('.orb').css("color", textColor);
};

$('.light-row').on('click', '.light-title, .color-picker', function(e){
    e.stopPropagation(); //stop document.click from closing it
    var currentColorPicker = $(this).closest('.light-holder').find('.color-picker');
    console.log(currentColorPicker);

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