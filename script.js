
boton.addEventListener("click", (event) => {
    event.preventDefault();
    let id = document.getElementById("id").value;
    console.log(id);
    const url = `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${id}`;
    console.log(url);
    // este bloque es lo que estoy probando, y usar url1/2
    let full = $('#full').is(":checked");
//let full = document.getElementById("full").value;
console.log(full);
let remote = $('#remote').is(":checked");
//let remote = document.getElementById("remote").value;
console.log(remote);
if (full==true) {var url1 = url + `&full_time=on`} else {var url1 = url};
console.log(url1);
if (remote==true) {var url2 = url1 + `&location=remote`} else {var url2 = url1};
console.log(url2);

    fetch(url2)
        .then(respuesta => {
            return respuesta.json();
                        
        })
        .then(json => {
            console.log(json);
            $('#flexcontainer').html('');
            json.forEach(function(json) {
               
                let structure = `
                <div id="pega">
                <table class="pegaInfo">
                <tr> 
                <td><img class="pega_img" src=${json.company_logo} alt="Company Logo"></td>
                <td><a class="pega_url" href="${json.url}" target="_blank">${json.title}</a><br>
                Tipo: ${json.type}<br>
                Ubicación: ${json.location}
                </td></tr></table>
                </div>
                `;
                $('#flexcontainer').html(
                    $('#flexcontainer').html() + structure
                );
                
        });
    })
        .catch(err => {
            $('#flexcontainer').html('');
            console.error(err);
            $('#flexcontainer').html(`Hubo un problema con la petición Fetch: ${err.message}`);
        });
});
/* 
$(function () {
    $('form').on('submit', function (evento) {
        evento.preventDefault(); // evita que se mande solo
        
        var id = $("#pokeId").val();
        console.log(id);
        $.get(`https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?title=${id}`, function (result) {
            $('#respuesta__contenido').html('');
            result.forEach(function(data) {
                console.log(data.title);
                console.log(data.url);
            let structure = `
                    <a class="respuesta__descripcion" href="${data.url}" target="_blank">
                        <div class="respuesta__descripcion_img">
                            <img src=${data.company_logo} alt="Company Logo">
                        </div>
                        <div class="respuesta__descripcion_texto">
                            <h2 class="respuesta__titulo">${data.title}</h2>
                            <div class="respuesta__detalles">
                                <h3 class="respuesta__tipo">${data.type}</h3>
                                <h4 class="respuesta__locacion">${data.location}</h4>
                            </div>
                        </div>
                    </a>`;
                $('#respuesta__contenido').html(
                    $('#respuesta__contenido').html() + structure
                );
            });
        }); 
            /*console.log(data);
            //var pokeName = pega[0].title;
            //var pokeSprite = pega[0].company_logo;
            //document.getElementById("nombrePokemon").innerHTML = `Pega ${data.title} - ${data.type}`;
            //document.getElementById("spritePokemon").src = data.company_logo;
            
            
           
        };
        


        

    });
});
*/ 