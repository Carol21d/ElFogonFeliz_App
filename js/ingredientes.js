document.addEventListener('DOMContentLoaded', () =>{

    // lista de todos los ingredientes disponibles
    const ingredientes = [
        { imagenSrc: 'assets/img/aguacate.webp', name: 'Aguacate' },
        { imagenSrc: 'assets/img/brocoli.webp', name: 'Brocoli' },
        { imagenSrc: 'assets/img/carne.webp', name: 'Carne' },
        { imagenSrc: 'assets/img/cebolla.webp', name: 'Cebolla' },
        { imagenSrc: 'assets/img/coliflor.webp', name: 'Coliflor' },
        { imagenSrc: 'assets/img/patatas.webp', name: 'Patatas' },
        { imagenSrc: 'assets/img/pescado.webp', name: 'Pescado' },
        { imagenSrc: 'assets/img/pimientos.webp', name: 'Pimientos' },
        { imagenSrc: 'assets/img/queso.webp', name: 'Queso' },
        { imagenSrc: 'assets/img/tomate.webp', name: 'Tomate' },
        { imagenSrc: 'assets/img/huevos.webp', name: 'Huevos' },
        { imagenSrc: 'assets/img/arroz.webp', name: 'Arroz' },
        { imagenSrc: 'assets/img/champinones.webp', name: 'Champiñones' },
        { imagenSrc: 'assets/img/pasta.webp', name: 'Pasta' },
        { imagenSrc: 'assets/img/alubias.webp', name: 'Alubias' },
        { imagenSrc: 'assets/img/harina.webp', name: 'Harina' },
        { imagenSrc: 'assets/img/ajo.webp', name: 'Ajo' },
        { imagenSrc: 'assets/img/calabacin.webp', name: 'Calabacin' },
        { imagenSrc: 'assets/img/zanahoria.webp', name: 'Zanahoria' },
        { imagenSrc: 'assets/img/guisantes.webp', name: 'Guisantes' },
        { imagenSrc: 'assets/img/atun.webp', name: 'Atún' },
        { imagenSrc: 'assets/img/pollo.webp', name: 'Pollo' },
        { imagenSrc: 'assets/img/berenjena.webp', name: 'Berenjena' },
        { imagenSrc: 'assets/img/batatas.webp', name: 'Batatas' },
        { imagenSrc: 'assets/img/pan.webp', name: 'Pan' },
        { imagenSrc: 'assets/img/banana.webp', name: 'Banana' },
        { imagenSrc: 'assets/img/fresa.webp', name: 'Fresa' },
        { imagenSrc: 'assets/img/mantequilla.webp', name: 'Mantequilla' },
        { imagenSrc: 'assets/img/manzana.webp', name: 'Manzana' },
        { imagenSrc: 'assets/img/leche.webp', name: 'Leche' },
        { imagenSrc: 'assets/img/sandia.webp', name: 'Sandia' },
        { imagenSrc: 'assets/img/mango.webp', name: 'Mango' },
        { imagenSrc: 'assets/img/naranja.webp', name: 'Naranja' },
        { imagenSrc: 'assets/img/pina.webp', name: 'Piña' },
        { imagenSrc: 'assets/img/pera.webp', name: 'Pera' },
        { imagenSrc: 'assets/img/limon.webp', name: 'Limón' },
    ];

    // declaramos el contenedor que tendra los ingredientes

    const containerIngredientes = document.getElementById('grid-ingredientes-container');
    const btnVerRecetas = document.getElementById('recetas');
    const aviso = document.getElementById('aviso-ingredientes');
    const intrucciones = document.getElementById('intrucciones');


     // Array para almacenar los nombres de los ingredientes seleccionados
    let ingredientesSeleccionados = [];

    // desactivamos el btn  ver recetas inicialmente
    btnVerRecetas.disabled = true;

       // Itera sobre la lista de ingredientes para crear los elementos de imagen en el DOM
     ingredientes.forEach(ingrediente => {
                const img = document.createElement('img');
                img.src = ingrediente.imagenSrc;
                img.alt = ingrediente.name;
                img.classList.add('ingrediente-img');
                img.dataset.nombre = ingrediente.name;

                containerIngredientes.appendChild(img);   // Agrega la imagen al contenedor principal

                img.addEventListener('click', () => {
                    const nombreIngrediente = img.dataset.nombre;
                    const index = ingredientesSeleccionados.indexOf(nombreIngrediente);

                    if (index === -1) {    // Si el ingrediente no está en el array, lo añade
                        if (ingredientesSeleccionados.length < 5) {
                            ingredientesSeleccionados.push(nombreIngrediente);
                            img.classList.add('seleccionado');
                            aviso.classList.add('oculto');
                        } else {
                            aviso.classList.remove('oculto');   // Muestra un aviso si el límite se ha alcanzado
                            setTimeout(() => {
                                aviso.classList.add('oculto');
                            }, 3000);
                        }
                    } else {
                        ingredientesSeleccionados.splice(index, 1);   // Si el ingrediente ya está en el array, lo elimina
                        img.classList.remove('seleccionado');
                        aviso.classList.add('oculto');
                    }

                   

                    if (ingredientesSeleccionados.length === 5) {   // Habilita o deshabilita el botón "Ver Recetas" 
                        btnVerRecetas.disabled = false;
                        btnVerRecetas.classList.remove('disabled');
                    } else {
                        btnVerRecetas.disabled = true;
                        btnVerRecetas.classList.add('disabled');
                    }
                    console.log(ingredientesSeleccionados);
                });
            });
            
            //el botón  "Ver Recetas"
            btnVerRecetas.addEventListener('click', () => {
                const ingredientesURL = ingredientesSeleccionados.join(',');
                window.location.href = `recetas.html?ingredientes=${ingredientesURL}`;
            });
        });