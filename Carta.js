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
    "carta/video1.mp4",
    "carta/video2.mp4",
    "carta/video3.mp4",
    "carta/video4.mp4",
    "carta/video5.mp4",
    "carta/video6.mp4",
    "carta/video7.mp4",
    "carta/video8.mp4",
    "carta/video9.mp4",
    "carta/video10.mp4",
    "carta/video11.mp4",
    "carta/video12.mp4",
    "carta/video13.mp4",

    "carta/f1.jpg",
    "carta/f2.jpg",
    "carta/f3.jpg",
    "carta/f4.JPG",
    "carta/f5.JPG",
    "carta/f6.JPG",
    "carta/f7.JPG",
    "carta/f8.jpeg",
    "carta/f9.JPG",
    "carta/f10.jpeg",
    "carta/f11.JPG",
    "carta/f12.JPG",
    "carta/f13.JPG",
    "carta/f14.JPG",

    "carta/a1.mp3",
    "carta/a2.mp3",
    "carta/a3.mp3",
    "carta/a4.mp3",
    "carta/a6.mp3",
    "carta/a7.mp3",
    "carta/a8.mp3",
    "carta/a9.mp3",
    "carta/a10.mp3",
    "carta/a11.mp3",
    "carta/a12.mp3",
    "carta/a13.mp3"
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