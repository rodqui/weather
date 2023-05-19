$(function(){


    $("#cardWeather").hide();


    $("#cityForm").on("submit", function(e){
        e.preventDefault();

        var city = $("#cityName");
        var data = {};
        data.cityName = city.val();
        
        $("#windCard").html("<i class='fa-solid fa-wind'></i>");
        $("#humidityCard").html("<i class='fa-solid fa-water'></i>");
        $("#pressureCard").html("<i class='fa-solid fa-circle-exclamation'></i>");

        

        $.ajax({
            url: "/new",
            type: "post",
            
            data: JSON.stringify(data),
            cache: false,
            contentType: 'application/json',
            success: function(data){
             
              
                if(data.cod!==200){
                    $("#errorCard").show().fadeIn();
                    $("#card").hide();
                    $("#cardWeather").hide().fadeIn();
                   
                }else{

                    $("#cityNameCard").html(data.name);
                    $("#degreesCard").html(data.main.temp+"ºC");

                    var today = new Date();
                    var now = today.toLocaleDateString("es-ES");
                    
                    $("#hourCard").html(now);



                    var icon = data.weather[0].icon;
                    $("#imgCard").attr("src","http://openweathermap.org/img/wn/"+icon+"@2x.png");

                    $("#descriptionCard").html(data.weather[0].description);

                    $("#windCard").append("&nbsp;&nbsp;&nbsp;"+data.wind.speed);
                    $("#humidityCard").append("&nbsp;&nbsp;&nbsp;"+data.main.humidity);
                    $("#pressureCard").append("&nbsp;&nbsp;&nbsp;"+data.main.pressure);
                    $("#errorCard").hide();
                    $("#cardWeather").hide().fadeIn();
                    $("#card").show().fadeIn();
                }
            }
        })

        

    });

});
