const Boton = document.getElementById("Boton");
const Titulo = document.getElementById("Titulo");

Boton.addEventListener("mousedown", () => {
    Boton.style.backgroundColor="PeachPuff";
    Titulo.style.color = "PeachPuff";
})
 
Boton.addEventListener("mouseup", () => {
    Boton.style.backgroundColor="Black";
    Titulo.style.color = "Black";
})

const elementos = [
    "guitarra/video1.mp4",
    "guitarra/video2.mp4",
    "guitarra/video3.mp4",
    "guitarra/video4.mp4",
    "guitarra/video5.mp4",
    "guitarra/video6.mp4",
    "guitarra/video7.mp4",
    "guitarra/video8.mp4",
    "guitarra/video9.mp4",

    "guitarra/f1.jpg",
    "guitarra/f2.PNG",
    "guitarra/f3.JPG",
    "guitarra/f4.JPG",
    "guitarra/f5.JPG",
    "guitarra/f6.JPG",
    "guitarra/f7.JPG",
    "guitarra/f8.JPG",
    "guitarra/f9.JPG",

    "guitarra/a1.mp3",
    "guitarra/a2.mp3",
    "guitarra/a3.mp3",
    "guitarra/a4.mp3",
    "guitarra/a6.mp3",
    "guitarra/a7.mp3",
    "guitarra/a8.mp3",
    "guitarra/a9.mp3"
];

function Interaccion(elem) {
    const src = elem.src.toLowerCase();

    if (src.endsWith(".jpg") || src.endsWith(".jpeg") || src.endsWith(".png") || src.endsWith(".webp")) {
        elem.addEventListener("mouseenter", () => {
            elem.style.transform = "scale(1.3) rotate(9deg)";
        });
        elem.addEventListener("mouseleave", () => {
            elem.style.transform = "scale(1) rotate(0deg)";
        });
    }

    if (src.endsWith(".mp3") || src.endsWith(".wav")) {
        elem.style.width = "200px";
        elem.addEventListener("mouseenter", () => elem.play());
        elem.addEventListener("mouseleave", () => {
            elem.pause();
            elem.currentTime = 0;
        });
    }

    if (src.endsWith(".mp4") || src.endsWith(".mov") || src.endsWith(".avi")){
        elem.style.width = "220px";
        elem.addEventListener("mouseenter", () => elem.play());
        elem.addEventListener("mouseleave", () => elem.pause());
    }
}

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function crearElemento() {

    const indice = numeroAleatorio(0, elementos.length);
    const ruta = elementos[indice];

    let nuevo;
    const rutaBaja = ruta.toLowerCase();

    if (rutaBaja.endsWith(".mp3") || rutaBaja.endsWith(".wav")) {
        nuevo = document.createElement("audio");
        nuevo.src = ruta;
        nuevo.controls = true;
    }
    else if (rutaBaja.endsWith(".mp4")){
        nuevo = document.createElement("video");
        nuevo.src = ruta;
        nuevo.muted = true;
        nuevo.controls = false;
    }
    else if (rutaBaja.endsWith(".jpg") || rutaBaja.endsWith(".jpeg") || rutaBaja.endsWith(".png") || rutaBaja.endsWith(".webp")) {
        nuevo = document.createElement("img");
        nuevo.src = ruta;
    }
//si no es ninguno...
    else {
        console.error("Error: Tipo de archivo o extensión no reconocido para la ruta:", ruta);
        return; 
    }
    nuevo.classList.add("elementosCreados");

    const zona = document.getElementById("zonaProhibidaCentro");
    const rect = zona.getBoundingClientRect();

    const w = 180;
    const h = 180;

    let x, y;

    do {
        x = numeroAleatorio(0, window.innerWidth - w);
        y = numeroAleatorio(0, window.innerHeight - h);
    } while (
        x < rect.right &&
        x + w > rect.left &&
        y < rect.bottom &&
        y + h > rect.top
    );
    nuevo.style.left = x + "px";
    nuevo.style.top = y + "px";

    document.body.append(nuevo);

    Interaccion(nuevo);
}

Boton.addEventListener("click", crearElemento);