$(document).ready(function(){

        $(".color-picker").slider({
            orientation: "horizontal",
            range: "min",
            max: 360,
            value: 127,
            slide: refresh,
            change: refresh
        });
});

function refresh(light){

    if (!$(light).hasClass()) light = this;

    var hue = $(light).slider("value"); //hue
    var max = $(light).slider("option", "max");
    //console.log(hue)
    //return;
    var rgb = hsvtorgb(hue,1,1);
    $('.orb i').css('color', '#' +  fullColorHex(rgb[0],rgb[1],rgb[2]))

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