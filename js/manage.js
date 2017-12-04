var token = "";
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
