let formData = {};
const entradas = document.querySelectorAll(".inputText");
const url = "https://graceful-octagonal-perigee.glitch.me/api";
let buttonToggler = false;
let products = await fetch(url + "/productos");
products = await products.json();
const addProduct = async (url, data) => {
  if (buttonToggler === false) {
    const response = await fetch(url + "/productos", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: data,
    });
    if (response.ok) {
      const data = await response.json();
      products.push(data);
      const tbodyElement = document.getElementById("cuerpo");
      const template = document.getElementById("rowTemplate").content;
      tbodyElement.appendChild(templateUpdate(template, products.length - 1));
    } else console.log("Hubo un problema");
  } else {
  }
};
const inputControlerHandler = () => {
  entradas.forEach((entrada) =>
    entrada.addEventListener("change", (evento) => {
      if (evento.target.name === "price")
        formData = {
          ...formData,
          [evento.target.name]: parseInt(evento.target.value),
        };
      else
        formData = { ...formData, [evento.target.name]: evento.target.value };
      console.log(formData);
      console.log(evento);
    })
  );
};
inputControlerHandler();
const enviar = document.querySelector(".botonAgregar");
const formulario = document.querySelector(".formulario");

enviar.addEventListener("click", (evento) => {
  console.log(evento);
  evento.preventDefault();
  const data = JSON.stringify(formData);
  addProduct(url, data);
});
const borrarElemento = async (id) => {
  const response = await fetch(url + "/productos/" + id.toString(), {
    method: "DELETE",
    mode: "cors",
  });
  console.log(response);
};
const templateUpdate = (trTemplate, contador) => {
  const tdTemplate = trTemplate.querySelectorAll("tr td");
  tdTemplate[0].innerHTML = products[contador].title;
  tdTemplate[1].innerHTML = products[contador].url;
  tdTemplate[2].innerHTML = products[contador].price;
  tdTemplate[3].innerHTML = products[contador].id;
  tdTemplate[4].setAttribute("name", products[contador].id);
  const buttonTemplate = trTemplate.querySelector(".erase");
  buttonTemplate.setAttribute("name", products[contador].id);
  const buttonModify = trTemplate.querySelector(".edit");
  buttonModify.setAttribute("name", products[contador].id);
  const templateClon = trTemplate.cloneNode(true);

  return templateClon;
};
const listBuilder = () => {
  const trTemplate = document.getElementById("rowTemplate").content;
  console.log(trTemplate);
  let contador = 0;
  const fragmento = new DocumentFragment();
  products.forEach((product, index) => {
    fragmento.appendChild(templateUpdate(trTemplate, contador));
    contador++;
  });
  document.getElementById("cuerpo").appendChild(fragmento);
  const buttonHandler = document.querySelectorAll(".erase");
  buttonHandler.forEach((buttonErase) => {
    buttonErase.addEventListener("click", (e) => {
      borrarElemento(e.target.name);
      const trActual = e.target.parentNode.parentNode;
      trActual.parentNode.removeChild(trActual);
    });
  });
  const modifyHandler = document.querySelectorAll(".edit");
  modifyHandler.forEach((buttonEdit) => {
    buttonEdit.addEventListener("click", (event) => {
      const buttonAdd = document.querySelector(".botonAgregar");
      const data = products.filter(
        (product) => product.id === event.target.name
      );
      buttonToggler = !buttonToggler;
      if (buttonToggler === false) {
        buttonAdd.innerHTML = "Agregar";
        event.target.innerHTML = "Edit";
      } else {
        buttonAdd.innerHTML = "Modificar";
        event.target.innerHTML = "Add";
      }
    });
  });
};
listBuilder();
