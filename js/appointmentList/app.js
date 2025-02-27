import { getAppointmentsFromLS } from "../home/utils.js";
import { isLoggedIn } from "../utils.js";

if (!isLoggedIn()) {
  window.location.replace('/pages/login.html');
}

const addAppointmentCard = (appointment) => {
  const $container = document.getElementById("scheduled-appointments");

  const $col = document.createElement("div");
  $col.classList.add("col-lg-4", "col-md-6", "col-sm-12", "mb-4");

  // Crear el elemento principal de la card
  const $card = document.createElement("div");
  $card.classList.add("card");

  // Agregar imagen
  const $icon = document.createElement("img");
  $icon.classList.add("card-img-top");
  switch (appointment.petType.toLowerCase()) {
    case "gato":
      $icon.src = "../../assets/cat.svg";
      break;
    case "perro":
      $icon.src = "../../assets/dog.svg";
      break;
    default:
      $icon.src = "../../assets/other.svg";
  }
  $icon.alt = `Icono de ${appointment.petType}`;
  $card.appendChild($icon);

  // Cuerpo de la tarjeta
  const $cardBody = document.createElement("div");
  $cardBody.classList.add("card-body");

  const $title = document.createElement("h5");
  $title.classList.add("card-title", "text-center");
  $title.textContent = `${appointment.petName} (${appointment.petType})`;

  const $description = document.createElement("p");
  $description.classList.add("card-text");
  $description.textContent = `Síntomas: ${appointment.description}`;

  $cardBody.appendChild($title);
  $cardBody.appendChild($description);
  $card.appendChild($cardBody);

  // Lista de información adicional
  const $listGroup = document.createElement("ul");
  $listGroup.classList.add("list-group", "list-group-flush");

  const $ownerItem = document.createElement("li");
  $ownerItem.classList.add("list-group-item");
  $ownerItem.textContent = `Dueño: ${appointment.ownerName}`;

  const $phoneItem = document.createElement("li");
  $phoneItem.classList.add("list-group-item");
  $phoneItem.textContent = `Teléfono: ${appointment.phoneNumber}`;

  const $dateItem = document.createElement("li");
  $dateItem.classList.add("list-group-item", "text-center");
  $dateItem.textContent = `Fecha: ${appointment.date} - Hora: ${appointment.time}`;

  $listGroup.appendChild($ownerItem);
  $listGroup.appendChild($phoneItem);
  $listGroup.appendChild($dateItem);
  $card.appendChild($listGroup);

  // Agregar la tarjeta al contenedor
  $col.appendChild($card);
  $container.appendChild($col);
};

const appointments = getAppointmentsFromLS();

appointments.sort((a, b) => {
  const dateA = new Date(`${a.date} ${a.time}`);
  const dateB = new Date(`${b.date} ${b.time}`);
  return dateA - dateB;
});

appointments.forEach((appointment) => {
  addAppointmentCard(appointment);
});
