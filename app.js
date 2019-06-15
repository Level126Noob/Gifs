var animals = ['dog', 'cat', 'rabbit', 'hamster', 'skunk', 'goldfish',
'bird', 'ferret', 'turtle', 'sugar glider', 'chinchilla', 'hedgehog', 'hermit crab',
'gerbil', 'pygmy goat', 'chicken', 'capybara', 'teacup pig', 'serval', 'salamander', 'frog']

function displayAnimalInfo() {
    var animal = $(this).attr('data-name');
    var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=FyOiNZxGZwCSwKje0YUf34Lxw8P8OmCn&q=' + animal + '&limit=10&offset=0&rating=G&lang=en'

    $.ajax({
        url: queryURL, 
        method: 'GET'
    }).then(function(response) {
    console.log(response);

    var GifImage = data.images.preview_webp;
    var GifHolder = $('<img>').attr('src', GifImage);

    ('#gif-view').append(GifHolder);
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
$('#add-gif').on('click', function (event){
    event.preventDefault();

    var animal = $('#search-input').val().trim();
    animals.push(animal);

    renderButtons();
});

$(document).on('click', '.animal-btn', displayAnimalInfo);
renderButtons();