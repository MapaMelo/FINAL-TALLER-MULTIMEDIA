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
    "medalla/video1.MP4",
    "medalla/video2.mp4",
    "medalla/video3.mp4",
    "medalla/video4.mp4",
    "medalla/video5.mp4",
    "medalla/video6.mp4",
    "medalla/video7.mp4",
    "medalla/video8.mp4",
    "medalla/video9.mp4",
    "medalla/video10.mp4",
    "medalla/video11.mp4",

    "medalla/f1.jpg",
    "medalla/f2.PNG",
    "medalla/f3.JPG",
    "medalla/f4.JPG",
    "medalla/f5.JPG",
    "medalla/f6.JPG",
    "medalla/f7.JPG",
    "medalla/f8.JPG",
    "medalla/f9.JPG",
    "medalla/f10.JPG",

    "medalla/a1.mp3",
    "medalla/a2.mp3",
    "medalla/a3.mp3",
    "medalla/a4.mp3",
    "medalla/a6.mp3",
    "medalla/a7.mp3",
    "medalla/a999.mp3"
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