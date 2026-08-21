function enterSite() {
  const ageScreen = document.getElementById("age-screen");

  ageScreen.classList.add("hidden");

  setTimeout(() => {
    ageScreen.style.display = "none";
  }, 600);
}
