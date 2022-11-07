let formData = {};
const entradas = document.querySelectorAll(".inputText");
const url = "https://graceful-octagonal-perigee.glitch.me/api";
const addProduct = async (url, data) => {
  console.log(data);

  const response = await fetch(url + "/productos", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: data,
  });
};

entradas.forEach((entrada) =>
  entrada.addEventListener("change", (evento) => {
    if (evento.target.name === "price")
      formData = {
        ...formData,
        [evento.target.name]: parseInt(evento.target.value),
      };
    else formData = { ...formData, [evento.target.name]: evento.target.value };
    console.log(formData);
    console.log(evento);
  })
);
const enviar = document.querySelector(".botonAgregar");
const formulario = document.querySelector(".formulario");
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
});
enviar.addEventListener("click", (evento) => {
  console.log(evento);
  evento.preventDefault();
  const data = JSON.stringify(formData);
  addProduct(url, data);
});
