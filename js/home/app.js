import { Appointment } from "./Appointment.js";
import { isLoggedIn } from "../utils.js";
import {
  addAppointmentToLS,
  inputDateConfig,
  generateTimeOptions,
  disableOccupiedTimes,
} from "./utils.js";

if (!isLoggedIn()) {
  window.location.replace('/pages/login.html');
}

inputDateConfig();
generateTimeOptions();
disableOccupiedTimes();

const setAppointment = (
  petType,
  petName,
  ownerName,
  phoneNumber,
  description,
  date,
  time
) => {
  const appointment = new Appointment(
    petType,
    petName,
    ownerName,
    phoneNumber,
    description,
    date,
    time
  );

  addAppointmentToLS(appointment);
};

const $form = document.getElementById("form-appointments");
const $inputPetType = document.getElementById("input-type");
const $inputPetName = document.getElementById("input-petName");
const $inputOwnerName = document.getElementById("input-ownerName");
const $inputPhoneNumber = document.getElementById("input-phoneNumber");
const $inputDescription = document.getElementById("input-description");
const $inputDate = document.getElementById("input-date");
const $inputTime = document.getElementById("input-time");

$inputDate.addEventListener("input", () => {
  const selectedDate = $inputDate.value;
  if (selectedDate) {
    disableOccupiedTimes(selectedDate);
  }
});

$form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    !$inputPetType.value.trim() ||
    !$inputPetName.value.trim() ||
    !$inputOwnerName.value.trim() ||
    !$inputPhoneNumber.value.trim() ||
    !$inputDescription.value.trim() ||
    !$inputDate.value.trim() ||
    !$inputTime.value.trim()
  ) {
    swal.fire({
      title: 'Revise los campos',
      text: `Complete la información solicitada`,
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: false,
      confirmButtonText: 'Cerrar',
    });
    return;
  }

  const petType = $inputPetType.value;
  const petName = $inputPetName.value;
  const ownerName = $inputOwnerName.value;
  const phoneNumber = $inputPhoneNumber.value;
  const description = $inputDescription.value;
  const date = $inputDate.value;
  const time = $inputTime.value;

  setAppointment(
    petType,
    petName,
    ownerName,
    phoneNumber,
    description,
    date,
    time
  );

  $form.reset();

  swal.fire({
    title: 'Exito',
    text: `Turno agendado para ${petName}`,
    icon: 'success',
    showConfirmButton: true,
    showCancelButton: false,
    confirmButtonText: 'Cerrar',
  });
});
