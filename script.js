// ===============================
// MAXINE - SUPABASE
// ===============================

const SUPABASE_URL = "https://ojkfuxahqnbazojpbhyt.supabase.co";

const SUPABASE_KEY = "sb_publishable_vGsTTJDXL9Uf5KprBSOC1g_jhzSIKoc";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


// ===============================
// PANTALLA 18+
// ===============================

function enterSite() {
  const ageScreen = document.getElementById("age-screen");

  if (!ageScreen) return;

  ageScreen.classList.add("hidden");

  setTimeout(() => {
    ageScreen.style.display = "none";
  }, 600);
}


// ===============================
// COMPROBAR SESIÓN
// ===============================

async function checkSession() {
  const { data, error } = await supabaseClient.auth.getSession();

  if (error) {
    console.error("Error al comprobar sesión:", error);
    return;
  }

  if (data.session) {
    console.log("Usuario conectado:", data.session.user.email);
  } else {
    console.log("No hay usuario conectado.");
  }
}


// ===============================
// INICIAR
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  checkSession();
});