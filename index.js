"strict-mode";

class Usuarios {
  constructor(nombre, apellido, libros = [], mascotas = []) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = [...libros];
    this.mascotas = [...mascotas];
  }
  getfullname = () => {
    return `${this.nombre} ${this.apellido}`;
  };
  addMascota = (mascota) => {
    this.mascotas.push(mascota);
  };
  addBook = (bookName, authorName) => {
    this.libros.push({ bookName, authorName });
  };
  getBookNames = () => {
    return this.libros.map((libro) => {
      return libro.bookName;
    });
  };
  countMascotas = () => {
    return this.mascotas.length;
  };
  allIn() {
    console.log(`El nombre del usuario es: ${this.getfullname()} 
    Sus mascotas son : ${this.countMascotas()} 
    Leyo los libros: ${this.getBookNames()}`);
  }
}

const usuario = new Usuarios("Adrian", "Abadin");
usuario.addMascota("pepa");
usuario.addMascota("Kuro");
usuario.addBook("El arte de la guerra", "Sun Tzu");
usuario.addBook("Mas alla del bien y del mal", "Friedrich Nietzsche");
usuario.addBook("El principito", "Antoine de Saint-Exupéry");

usuario.allIn();
console.log(usuario);

//la funcion allIn() al ser una funcion declarada esta en el protorype en cambio las otras al ser funciones
// expresadas se encuentran en la construccion de la clase de esta manera presentan lexical binding al objeto .
