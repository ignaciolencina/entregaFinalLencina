// =========================================================================================== RECUPERAR DEL LOCAL STORAGE
export const getAppointmentsFromLS = () => {
  return JSON.parse(localStorage.getItem("appointments")) || [];
};

// =========================================================================================== AGREGAR AL LOCAL STORAGE
export const addAppointmentToLS = (appointment) => {
  const appointments = getAppointmentsFromLS();
  appointments.push(appointment);
  localStorage.setItem("appointments", JSON.stringify(appointments));
};

// =========================================================================================== CONFIGURACION DEL INPUT DE FECHAS
const appointmentDate = document.getElementById("input-date");

const disableSunday = (date) => {
  const weekDay = date.getDay();
  return weekDay === 0;
};

export const inputDateConfig = () => {
  const today = new Date();
  const todayISO = today.toISOString().split("T")[0];

  appointmentDate.setAttribute("min", todayISO);

  appointmentDate.addEventListener("input", (e) => {
    const [year, month, day] = e.target.value.split("-");
    const selectedDate = new Date(year, month - 1, day);
    console.log(selectedDate);

    if (disableSunday(selectedDate)) {
      swal.fire({
        title: 'Lo sentimos',
        text: `No antendemos en la clínca los dias Domingo`,
        icon: 'error',
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: 'Cerrar',
      });
      e.target.value = "";
    }
  });
};

// =========================================================================================== GENERADOR DE HORARIOS PARA TURNOS
const selectTime = document.getElementById("input-time");

export const generateTimeOptions = () => {
  selectTime.innerHTML =
    '<option value="" disabled selected>Elige un horario</option>';
  for (let time = 8; time <= 20; time++) {
    const apointTime = `${time.toString().padStart(2, "0")}:00`;
    const option = document.createElement("option");
    option.value = apointTime;
    option.textContent = apointTime;
    selectTime.appendChild(option);
  }
};

// =========================================================================================== DESHABILITAR HORARIOS OCUPADOS
export const disableOccupiedTimes = (date) => {
  const appointments = getAppointmentsFromLS();
  const timesForDate = appointments
    .filter((appointment) => appointment.date === date)
    .map((appointment) => appointment.time);

  const options = selectTime.options;
  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    if (timesForDate.includes(option.value)) {
      option.disabled = true;
    } else {
      option.disabled = false;
    }
  }
};
