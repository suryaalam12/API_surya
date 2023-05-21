
function searchMovie () {
    $('#movie-list').html('');
    $.ajax({
        url:'http://omdbapi.com',
        type:'GET',
        dataType:'json',
        data: {
            'apikey' :'eb19974c',
            's': $('#search-input').val()
        },
        success: function(result) {
            if (result.Response == "True") {
                let movie = result.Search;
                
                $.each(movie, function(i, data){
                    $('#movie-list').append(`
                    <div class="col-md-4 mb-3">
                    <div class="card">
                    <img src="`+ data.Poster +`" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">"`+ data.Title +`"</h5>
                        <h6 class="card-subtitle mb-2 text-muted">"`+ data.Year +`"</h6>
                        <a href="#" class="card-link see-detail" 
                        data-bs-toggle="modal" data-bs-target="#exampleModal" 
                        data-id="`+ data.imdbID +`">Lihat Detail</a>
                    </div>
                    </div>
                    </div>
                    `)
                })

                $('#search-input').val('');
        } else {
            $('#movie-list').html(`
            <div class="col">
            <h1 class ="text-center">`+ result.Error +`</h1>
            </div>
            `)
        }
    }
    });
}


$('#search-button').on('click', function() {
    searchMovie();
});
$('#search-input').on('keyup', function(event) {
    if (event.keyCode === 13) {
        searchMovie();
    }
});


$('#movie-list').on('click', '.see-detail', function() {
    $.ajax({
        url: 'http://omdbapi.com',
        dataType: 'json',
        type:'get',
        data: {
            'apikey' : 'eb19974c',
            'i' : $(this).data('id')
        },
        success: function (film) {
            if(film.Response === "True") {
            
                $('.modal-body').html(`
                    <div class="container-fluid">
                    <div class="row">
                    <div class="col-md-4">
                        <img src="`+ film.Poster +`" class="img-fluid">
                    </div>
    
                    <div class="col-md-8">
                    <ul class="list-group">
                    <li class="list-group-item"><h3>`+ film.Title +`</h3></li>
                    <li class="list-group-item">Tanggal Rilis : `+ film.Released +`</li>
                    <li class="list-group-item">`+ film.Genre +`</li>
                    <li class="list-group-item">`+ film.Actors +`</li>
                    </ul>
                    </div>
                    </div>
                    </div>
                `)
        }
    }
    })
});

