var defaultURL = "https://api.lifx.com/v1/lights/";

function setState(selector, states){
    PUT(defaultURL + selector + "/state", states, function(data, b){
        console.log(data.results);
        var lightList = new Object();

        //For each light in the returned string
        $.each(data.results, function(k,v){
            if (v.status != "ok") return; //Status must be ok before continuing
            var obj = lights[v.id].obj; //Selects the light for that specific one
            $.each(states, function(k,v){ //Handles multiple state settings
                switch (k){
                    case 'power':
                        obj.power = states.power;
                        lights[selector].setObj(obj);
                        break;
                    case 'color':
                        //TODO
                        break;
                    case 'brightness':
                        obj.brightness = states.brightness;
                        lights[selector].setObj(obj);
                        break;
                }
            });
        });




    },function(status, data){
        console.log("setState went wrong :(");
        console.log(status);
        console.log(data);
    });
}

function listLights(selector){
    getLights(selector, function(data){
        var lightArr = JSON.parse(data);
        $.each(lightArr, function(k,v){
            console.log(v)
            lights[v.id].setObj(v);
        });
    })
}