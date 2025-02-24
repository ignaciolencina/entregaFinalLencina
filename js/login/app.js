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
      sessionStorage.setItem("isLoggedIn", email);
      alert("Ola k ase");
    } else {
      alert("No so vo");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
