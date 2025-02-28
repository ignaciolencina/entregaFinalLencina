import { isLoggedIn } from "../utils.js";

if (isLoggedIn()) {
  window.location.replace("/pages/home.html");
}

const $email = document.getElementById("email-input");
const $password = document.getElementById("password-input");
const $form = document.getElementById("login-form");
const $revealPassword = document.getElementById("reveal-password");
const $passwordEye = document.getElementById("password-eye");
const $loginBtn = document.getElementById("submit-btn");

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

      Toastify({
        text: `Bienvenido ${validUser.firstname}!`,
        className: "info",
        position: "center",
        style: {
          background: "#0dcdfd",
        },
      }).showToast();

      setTimeout(() => {
        window.location.assign("/pages/home.html");
      }, 2000);
    } else {
      Toastify({
        text: `Credenciales incorrectas`,
        className: "info",
        position: "center",
        style: {
          background: "#FF0000",
        },
      }).showToast();
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

$revealPassword.addEventListener("click", () => {
  if ($password.type === "password") {
    $password.type = "text";
    $passwordEye.classList = "bi bi-eye";
  } else {
    $password.type = "password";
    $passwordEye.classList = "bi bi-eye-slash";
  }
});

const checkInputs = () => {
  if ($email.value.trim() && $password.value.trim()) {
    $loginBtn.disabled = false;
  } else {
    $loginBtn.disabled = true;
  }
};

$email.addEventListener("input", checkInputs);
$password.addEventListener("input", checkInputs);
