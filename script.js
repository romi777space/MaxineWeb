
// ==========================================
// MAXINE - JAVASCRIPT
// ==========================================

// ---------- SUPABASE ----------

const SUPABASE_URL = "https://ojkfuxahqnbazojpbhyt.supabase.co";

const SUPABASE_KEY =
  "sb_publisible_vGsTTJDXL9Uf5KprBSOC1g_jhzSIKoc";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


// ==========================================
// PANTALLA DE EDAD 18+
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
// COMPROBAR SESIÓN DE USUARIO
// ==========================================

async function checkSession() {
  const { data, error } =
    await supabaseClient.auth.getSession();

  if (error) {
    console.error(
      "Error al comprobar la sesión:",
      error.message
    );
    return;
  }

  if (data.session) {
    console.log(
      "Usuario conectado:",
      data.session.user.email
    );
  } else {
    console.log("No hay ningún usuario conectado.");
  }
}


// ==========================================
// ESCUCHAR CAMBIOS DE SESIÓN
// ==========================================

supabaseClient.auth.onAuthStateChange(
  (event, session) => {

    if (session) {
      console.log(
        "Sesión iniciada:",
        session.user.email
      );
    } else {
      console.log("Sesión cerrada.");
    }

  }
);


// ==========================================
// INICIAR PÁGINA
// ==========================================

document.addEventListener(
  "DOMContentLoaded",
  () => {
    checkSession();
  }
);