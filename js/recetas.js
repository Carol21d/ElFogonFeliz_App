document.addEventListener('DOMContentLoaded', obtenerRecetas);


async function obtenerRecetas(){
    const ingredientsString = new URLSearchParams(window.location.search).get('ingredientes');
    console.log('Ingredientes desde la URL:', ingredientsString);
    
    if(!ingredientsString) {
        console.error('No se encontron ingredientes en la URL');
        mostrarMensajeNoRecetas('<p>No se proporcionaron ingredientes. Por favor, seleccione los ingredientes.</p>');
        return;

}

// con esta url apuntamos a vercel a su funcion serveless
const url = `/api/serveless?ingredients=${ingredientsString}&number=3&ranking=2`;


try{
    const response = await fetch(url);
    console.log("URL obtenida: ",url);
    
        if(!response.ok){
            throw new Error(`Error en la peticion: ${response.statusText}`);
        } 
        
    const data = await response.json();
    console.log('Datos recibidos de la API:', data);
    
        // Verifica si los datos son un array antes de intentar mostrar las recetas
        if (Array.isArray(data) && data.length > 0) {
            mostrarRecetas(data);
        } else if (data.status === 'failure' || data.code === 401) {
            // Maneja específicamente el error de autenticación de la API
            mostrarMensajeError('Hubo un problema con la API. Por favor, verifique su clave API.');
        } else {
            // Muestra un mensaje si no se encontraron recetas o si el formato es inesperado
            mostrarMensajeNoRecetas('<p>No se encontraron recetas para los ingredientes seleccionados.</p>');
        }

    } catch(error) {
        console.error('Error al obtener las recetas: ', error);
        mostrarMensajeError('Hubo un error al obtener las recetas. Por favor, intente nuevamente más tarde.');
    }
}

// Mensaje en el contenedor de recetas para cuando no se arrojen recetas
function mostrarMensajeNoRecetas(mensaje) {
    const contenedor = document.getElementById('recetas-container');
    if (contenedor) {
        contenedor.innerHTML = `<p class="aviso">${mensaje}</p>`;
    }else{
        console.error('El contenedor de recetas no se encontro 1');
    }
        
}

// Mensaje de cuando hay un error en la peticion
function mostrarMensajeError() {
    const contenedor = document.getElementById('recetas-container');
    if (contenedor) {
        contenedor.innerHTML = `<p class="aviso">Hubo un error al obtener las recetas. Por favor, intente nuevamente más tarde.</p>`;
    }else{
        console.log('El contenedor de recetas no se encontro 2');
    }
        
}

// nos muestras las recetas que hemos obtenido de la API 
function mostrarRecetas(recetas) {
    const contenedor = document.getElementById('recetas-container');
   if (!contenedor) {
    console.error('El contenedor de recetas no se encontro 3');
    return;
   }


// limpiamos el contenedor
contenedor.innerHTML = '';

recetas.forEach(receta => {
    const tarjetaReceta = document.createElement('div');
    tarjetaReceta.classList.add('tarjeta-receta');

    const imagen = document.createElement('img');
    imagen.src = receta.image;
    imagen.alt = receta.title;
    tarjetaReceta.appendChild(imagen);

    const titulo = document.createElement('h3');
    titulo.textContent = receta.title;      
    tarjetaReceta.appendChild(titulo);
    contenedor.appendChild(tarjetaReceta);
    
});
}