import { isLoggedIn } from "../utils.js";

if (isLoggedIn()) {
  window.location.replace("/pages/home.html");
}

const $email = document.getElementById("email-input");
const $password = document.getElementById("password-input");
const $form = document.getElementById("login-form");

$form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = $email.value;
  const password = $password.value;

  try {
    const response = await fetch("/db.json");
    const users = await response.json();

    const validUser = users.users.find(
      (user) => user.email === email && user.password === password
    );

    if (validUser) {
      sessionStorage.setItem("isLoggedIn", true);
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          email: validUser.email,
          id: validUser.id,
        })
      );

      swal
        .fire({
          title: "Bienvenido!",
          timer: 1500,
          showCancelButton: false,
          showConfirmButton: false,
          timerProgressBar: true,
        })
        .then(() => {
          window.location.assign("/pages/home.html");
        });
    } else {
      alert("No so vo");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
