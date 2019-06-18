$(document).ready(function () {
    

//making the initial array for the buttons, to be added to later.
var animals = ['dog', 'cat', 'rabbit', 'hamster', 'skunk', 'goldfish',
    'bird', 'ferret', 'turtle', 'sugar glider', 'chinchilla', 'hedgehog', 'hermit crab',
    'gerbil', 'pygmy goat', 'chicken', 'capybara', 'teacup pig', 'serval', 'salamander', 'frog'
]

//making a function to communicate with Giphy API and setting data varibales.  This also populates the page with the gifs when you click on the button
//through the for if statements.
function displayAnimalInfo() {
    var animal = $(this).attr('data-name');
    var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=FyOiNZxGZwCSwKje0YUf34Lxw8P8OmCn&q=' + animal + '&limit=11&offset=0&rating=G&lang=en'
    var animalResponse = [];
    var count = 0;

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        animalResponse = response.data;
        console.log(response);

        for (var i = 0; i < animalResponse.length; i++) {

            //if function for making sure that no one gets rated "R", or "PG-13" GIFS, and removing gifs on click of another gif button.
            if (animalResponse[i].rating !== "r" && animalResponse.rating !== "pg-13") {
                var GifImage = animalResponse[i].images.fixed_height_small_still.url
                //assinging all attributes using above variable for data-still, data-state, and data-animate. Attaching them to the img.
                var GifHolder = $('<img>').attr('src', GifImage).attr('data-animate', animalResponse[i].images.fixed_height_small.url).attr('data-state', 'still').attr('data-still', GifImage);
                //Assigning the GIF variable an ID for CSS styling purposes
                var GIF = $('<div id ="GIF">')
                var p = $("<p>").text("Rating: " + animalResponse[i].rating);
                $(GIF).append(p);
                $(GIF).append(GifHolder);
                $('#gif-view').append(GIF);
                count++;
            } if (count === 1) {
                $('#gif-view').empty();
            }
            console.log(animalResponse[i].slug);
            console.log(animalResponse[i]);
        }
    });
}

//this assigns the data to all the buttons from gify query, makes the buttons, and lists the text of the query search, then appends it to the buttons section.
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

//this moves the gif that you search into the animals array, later creating the button and query in other functions.
$('#add-gif').on('click', function (event) {
    event.preventDefault();

    var animal = $('#search-input').val().trim();
    animals.push(animal);

    renderButtons();
});

//globally calling the functions so that the App populates and does the onclick functions whenever they are triggered.
renderButtons();
$(document).on('click', '.animal-btn', displayAnimalInfo);
$(document).on("click", 'img', Animate);

  //animates the gif through a click function depending on the data-state assigned to each image.
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