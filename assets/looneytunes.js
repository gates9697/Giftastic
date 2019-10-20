var LooneyTunes = ["Bugs Bunny","Daffy Duck","Tazmanian Devil","Sylvester","Lola Bunny","Granny","Petunia Pig"];
var gifbuttons = $(".gifbuttons");
var showgif = $(".showgifs")

function createButtons(){

    for(var i = 0; i < LooneyTunes.length; i++){

        var buttonDiv = $(`<button> ${LooneyTunes[i]} </button>`)
        gifbuttons.append(buttonDiv);
      buttonDiv.attr({"class":"looneytunes", "character-data": LooneyTunes[i]})

    }
}

      $(document).on("click", ".looneytunes", function(){
    
    var charName = $(this).attr("character-data");
    console.log(charName)
    var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=0xFktjux4y5AZ5SZKyOTr3oiKfIm7hhj&q=${charName}&limit=10`;
   
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      var results = response.data;
      console.log(results)

      $(showgif).empty()

      for(var i = 0; i < results.length; i++){
        var rating = $("<h3>")
        showgif.append(rating);
        rating.append(results[i].rating)
        var img = $("<img>").attr({ src: results[i].images.fixed_height_still.url, 
                                    "data-still": results[i].images.fixed_height_still.url,
                                    "data-animate": results[i].images.fixed_height.url,
                                    class:"LooneyTunesImg", 
                                    "data-state":"still"
                                  });
        showgif.append(img);
      }
      $(".LooneyTunesImg").on("click",function(){
				var state = $(this).attr("data-state");
				console.log(state);
				if(state === "still") {
					$(this).attr("src", $(this).data("animate"));
					$(this).attr("data-state","animate");
				} else {
					$(this).attr("src", $(this).data("still"));
					$(this).attr("data-state", "still");
                }
            });
        });
    })

    function addToArray(){
  
        $("#submit").on("click", function(e){
          e.preventDefault();
          var newLooneyTune = $("#addLooneyTune").val().trim();
    
          console.log(newLooneyTune)
          LooneyTunes.push(newLooneyTune);
          var userButton = $("<button>");
          userButton.text(newLooneyTune); 
          userButton.addClass("looneytunes");
          userButton.attr("character-data", newLooneyTune);
          $(gifbuttons).append(userButton);
        })
      }
    
      createButtons();
      addToArray();
