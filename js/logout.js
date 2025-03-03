import { isLoggedIn } from "./utils.js";

const $logoutBtn = document.getElementById("logout-btn");

if (isLoggedIn()) {
  $logoutBtn.classList.remove("noShow");
}

$logoutBtn.addEventListener("click", () => {
  swal
    .fire({
      icon: "question",
      title: "Atención",
      text: "¿Estás seguro que deseas cerrar sesion?",
      confirmButtonText: "Si, cerrar",
      cancelButtonText: "No, mantenerse logueado",
      showCancelButton: true,
    })
    .then((res) => {
      if (res.isConfirmed) {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("isLoggedIn");

        window.location.assign("/");
      }
    });
});
