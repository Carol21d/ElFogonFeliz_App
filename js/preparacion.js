document.addEventListener("DOMContentLoaded", () =>{
      const pasos = document.querySelectorAll(".preparacion-pasos");
      pasos.forEach(paso => {
        paso.addEventListener("click", () =>{
         paso.classList.toggle("completado");
        });
      });
});