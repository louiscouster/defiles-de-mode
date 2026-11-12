const cartes = document.querySelectorAll(".carte-projet");

cartes.forEach((carte) => {
  
  carte.addEventListener("mousemove", (event) => {
    
    const rect = carte.getBoundingClientRect();

  
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

  
    carte.style.setProperty("--mouse-x", x + "px");
    carte.style.setProperty("--mouse-y", y + "px");
  });
});
