var token = "";
var lights = new Object();


$(document).ready(function(){

    var modalToken = $("#modal-token");
    modalToken.modal({ show: false});
    if (!localStorage.token || localStorage.token == null) {
        modalToken.modal('show');
    }
    else {
        token = localStorage.token;
        initiate();
    }

    //On click, validate the token, if valid continue with initialization, otherwise prompt for token again.
    modalToken.find('button').click(function(){
        var field = $("#token-input");
        localStorage.token = field.val();

        token = localStorage.token;
        getLights("all", function(data){
            modalToken.modal('hide');
            initiate();
        }, function(status, data){
            if (status == 401) {
                //alert("Token not valid.");
                if (field.parent().find('.error-message').length == 0){
                    field.parent().append("<div class='error-message has-danger'>" + "Token not valid" + "</div>");
                }
                field.parent().find(".error-message").show();
                field.parent().addClass('has-danger');
            }
            else {
                console.log(status)
                console.log(data);
            }
        });

    });
});


function initiate(){
    //Get all lights, create a new ui element for them and new object
    getLights("all", function(data){
        console.log(data);
        var lightArr = JSON.parse(data)
        $.each(lightArr, function(k,v){
            console.log(k);
            console.log(v);
            lights[v.id] = new uiLight(v);
        });
    });
    return;
    //Not doing this right now. Will fix later
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
}