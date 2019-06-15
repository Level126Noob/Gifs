$(document).ready(function () {
    


var animals = ['dog', 'cat', 'rabbit', 'hamster', 'skunk', 'goldfish',
    'bird', 'ferret', 'turtle', 'sugar glider', 'chinchilla', 'hedgehog', 'hermit crab',
    'gerbil', 'pygmy goat', 'chicken', 'capybara', 'teacup pig', 'serval', 'salamander', 'frog'
]

function displayAnimalInfo() {
    var animal = $(this).attr('data-name');
    var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=FyOiNZxGZwCSwKje0YUf34Lxw8P8OmCn&q=' + animal + '&limit=10&offset=0&rating=G&lang=en'
    var animalResponse = [];
    var count = 0;

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        animalResponse = response.data;
        console.log(response);

        // TO DO: create foreach loop loop here going through each individual animalResponse
        for (var i = 0; i < animalResponse.length; i++) {

            if (animalResponse[i].rating !== "r" && animalResponse.rating !== "pg-13") {
                var GifImage = animalResponse[i].images.fixed_width_small_still.url
                var GifHolder = $('<img>').attr('src', GifImage).attr('data-animate', animalResponse[i].images.fixed_width_small.url).attr('data-state', 'still').attr('data-still', GifImage);
                var GIF = $('<div id ="GIF">')
                var p = $("<p>").text("Rating: " + animalResponse[i].rating);
                $(GIF).append(p);
                $(GIF).append(GifHolder);
                $('#gif-view').append(GIF);
                count++;
            } if (count === 1) {
                $('#gif-view').empty
            }
            console.log(animalResponse[i].slug);
            console.log(animalResponse[i]);
        }
    });
}

function renderButtons() {

    $('#buttons-view').empty();

    for (var i = 0; i < animals.length; i++) {
        var a = $('<button>');
        a.addClass('animal-btn');
        a.attr('data-name', animals[i]);
        a.text(animals[i]);
        $('#buttons-view').append(a);
    };
}

$('#add-gif').on('click', function (event) {
    event.preventDefault();

    var animal = $('#search-input').val().trim();
    animals.push(animal);

    renderButtons();
});

renderButtons();
$(document).on('click', '.animal-btn', displayAnimalInfo);
$(document).on("click", 'img', Animate);

  //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
  function Animate() {
  	 var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  }
}

});