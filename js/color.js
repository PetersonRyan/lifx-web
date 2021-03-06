$(document).ready(function(){
        var waiting = setInterval(function(){
            if (lightsLoaded === true){
                $(".color-picker").slider({
                    orientation: "horizontal",
                    range: "min",
                    max: 360,
                    value: 127,
                    slide: colorPickerChange,
                    change: colorPickerChange
                });
                $('.lightness-picker').slider({
                    orientation: "vertical",
                    range: "min",
                    max: 360,
                    value: 127,
                    slide: lightnessPickerChange,
                    change: lightnessPickerChange
                });
                clearInterval(waiting);
            }
        }, 10);

});

function colorPickerChange(light){
    var lightBulb = $(this).closest('.light-holder').find('.light-bulb');
    if (!$(light).hasClass()) light = this;
    $(this).closest('.light-holder').find('.apply-button').show();

    var hue = $(light).slider("value"); //hue
    var max = $(light).slider("option", "max");
    //console.log(hue)
    //return;
    var rgb = hsvtorgb(hue,1,1);
    var hex = '#' + fullColorHex(rgb[0],rgb[1],rgb[2]);
    lightBulb.css('color', hex);
    return hex;
}

$('body').on('click', '.apply-button', function(){
    var light = lights[$(this).closest('.light-holder').prop('id')];
    console.log(light)
    console.log(light)
    var rgb = $(this).closest('.light-holder').find('.orb i').css('color').toString().substring(4);
    rgb = JSON.parse('[' + rgb.substring(0,rgb.length-1) + ']');
    setState(light.id, { color: fullColorHex(rgb[0],rgb[1],rgb[2])});
    $(this).hide();
});

function setBrightness(light, brightness){

}

function lightnessPickerChange(light){
    var id;
    var lightBulb = $(this).closest('.light-holder').find('.light-bulb');
    id = $(this).closest('.light-holder').prop('id');
    if (!$(light).hasClass()) light = this;
    $(this).closest('.light-holder').find('.apply-button').show();
    var value = $(light).slider("value");
    var max = $(light).slider("option", "max");
    value = value/max;

    var currentColor = lightBulb.css('color');
    if (currentColor[0] == 'r' && currentColor.includes('rgb')){
        currentColor = JSON.parse('[' + currentColor.replace(/rgb\(/g,'').replace(/\)/g,'') + ']');
        currentColor = fullColorHex(currentColor[0], currentColor[1], currentColor[2]);
    }

    var currentBrightness = lights[id].obj.brightness;
    var differenceInBrightness = value - currentBrightness;

console.log(differenceInBrightness * 255);

    lightBulb.css('color', LightenDarkenColor('#' + currentColor, differenceInBrightness * 255));

}

function hsvtorgb(h, s, v){
    var x = 1 - Math.abs(((h / 60) % 2) - 1);
    var c = v * s;

    switch (Math.floor(h/60)){
        case 0:
            return [Math.floor(c * 255), Math.floor(x * 255), 0];
            break;
        case 1:
            return [Math.floor(x * 255), Math.floor(c * 255), 0];
            break;
        case 2:
            return [0, Math.floor(c * 255), Math.floor(x * 255)];
            break;
        case 3:
            return [0, Math.floor(x * 255), Math.floor(c * 255)];
            break;
        case 4:
            return [Math.floor(x * 255), 0, Math.floor(c * 255)];
            break;
        case 5:
            return [Math.floor(c * 255), 0, Math.floor(x * 255)];
            break;
        default:
            return [255,255,255];
    }
}

var rgbToHex = function (rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
};

var fullColorHex = function(r,g,b) {
    var red = rgbToHex(r);
    var green = rgbToHex(g);
    var blue = rgbToHex(b);
    return red+green+blue;
};

function LightenDarkenColor(col,amt) {
    var usePound = false;
    if ( col[0] == "#" ) {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16);

    var r = (num >> 16) + amt;

    if ( r > 255 ) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if ( b > 255 ) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if ( g > 255 ) g = 255;
    else if  ( g < 0 ) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}