// ==========================================
// MAXINE - SUPABASE + AUTENTICACIÓN
// ==========================================

const SUPABASE_URL = "https://ojkfuxahqnbazojpbhyt.supabase.co";

const SUPABASE_KEY =
  "sb_publisible_vGsTTJDXL9Uf5KprBSOC1g_jhzSIKoc";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


// ==========================================
// PANTALLA 18+
// ==========================================

function enterSite() {
  const ageScreen = document.getElementById("age-screen");

  if (!ageScreen) return;

  ageScreen.classList.add("hidden");

  setTimeout(() => {
    ageScreen.style.display = "none";
  }, 600);
}


// ==========================================
// MENSAJES
// ==========================================

function showMessage(message, success = false) {
  const element = document.getElementById("auth-message");

  if (!element) return;

  element.textContent = message;

  element.style.display = "block";

  if (success) {
    element.style.color = "lightgreen";
  } else {
    element.style.color = "#ff5555";
  }
}


// ==========================================
// REGISTRO
// ==========================================

async function registerUser(email, password) {

  showMessage("Creando cuenta...", true);

  const { data, error } =
    await supabaseClient.auth.signUp({
      email: email,
      password: password
    });

  if (error) {
    showMessage(
      "Error: " + error.message
    );
    return;
  }

  if (data.user && !data.session) {

    showMessage(
      "Cuenta creada. Revisa tu correo para confirmar tu cuenta.",
      true
    );

    return;
  }

  showMessage(
    "Cuenta creada correctamente.",
    true
  );

  updateUserInterface();
}


// ==========================================
// INICIO DE SESIÓN
// ==========================================

async function loginUser(email, password) {

  showMessage("Iniciando sesión...", true);

  const { data, error } =
    await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password
    });

  if (error) {

    showMessage(
      "Error: " + error.message
    );

    return;
  }

  showMessage(
    "Sesión iniciada correctamente.",
    true
  );

  updateUserInterface();
}


// ==========================================
// CERRAR SESIÓN
// ==========================================

async function logout() {

  const { error } =
    await supabaseClient.auth.signOut();

  if (error) {

    showMessage(
      "Error al cerrar sesión: " +
      error.message
    );

    return;
  }

  showMessage(
    "Sesión cerrada.",
    true
  );

  updateUserInterface();
}


// ==========================================
// ACTUALIZAR INTERFAZ
// ==========================================

async function updateUserInterface() {

  const {
    data: { session }
  } = await supabaseClient.auth.getSession();

  const registerBox =
    document.getElementById("register-box");

  const loginBox =
    document.getElementById("login-box");

  const userBox =
    document.getElementById("user-box");

  const userEmail =
    document.getElementById("user-email");


  if (session) {

    if (registerBox)
      registerBox.style.display = "none";

    if (loginBox)
      loginBox.style.display = "none";

    if (userBox)
      userBox.style.display = "block";

    if (userEmail)
      userEmail.textContent =
        session.user.email;

  } else {

    if (registerBox)
      registerBox.style.display = "block";

    if (loginBox)
      loginBox.style.display = "block";

    if (userBox)
      userBox.style.display = "none";

  }
}


// ==========================================
// FORMULARIO DE REGISTRO
// ==========================================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const registerForm =
      document.getElementById("register-form");

    const loginForm =
      document.getElementById("login-form");


    if (registerForm) {

      registerForm.addEventListener(
        "submit",
        async (event) => {

          event.preventDefault();

          const email =
            document.getElementById(
              "register-email"
            ).value.trim();

          const password =
            document.getElementById(
              "register-password"
            ).value;

          await registerUser(
            email,
            password
          );

        }
      );

    }


    if (loginForm) {

      loginForm.addEventListener(
        "submit",
        async (event) => {

          event.preventDefault();

          const email =
            document.getElementById(
              "login-email"
            ).value.trim();

          const password =
            document.getElementById(
              "login-password"
            ).value;

          await loginUser(
            email,
            password
          );

        }
      );

    }


    // Comprobar usuario existente
    updateUserInterface();


    // Escuchar cambios de sesión
    supabaseClient.auth.onAuthStateChange(
      () => {
        updateUserInterface();
      }
    );

  }
);