$(document).ready(function(){
    $('.color-picker').mousemove(function(e){

        console.log(e.pageX - this.getBoundingClientRect().left)
        if (mouseDownFlag){
            var newOffset = e.pageX - this.getBoundingClientRect().left;
            var width = $('.slider').css('width').substring(0, $('.slider').css('width').toString().indexOf('px'));
            if( (newOffset + $(this).css("width")) < $(this).css("width")) return;
            console.log(width);
            $(".slider").css("left",  newOffset - (width/2) + "px");
        }

        console.log(mousePos);
    });
    var mouseDownFlag = false;
    $(".slider").mousedown(function(){
        mouseDownFlag = true;
    })
    $(".slider").mouseup(function(){
        mouseDownFlag = false;
    })
});