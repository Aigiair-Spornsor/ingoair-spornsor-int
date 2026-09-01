// IMPORTANT:
// This first version is a front-end demo. It does NOT send customer data
// to a remote database until you connect the form to a backend.
//
// For a truly free multi-device registration system, the next step is to
// connect this form to Google Apps Script + Google Sheets or Supabase.

const form = document.getElementById("registrationForm");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");
const success = document.getElementById("success");
const reference = document.getElementById("reference");

document.getElementById("year").textContent = new Date().getFullYear();

form.addEventListener("submit", function (event) {
  event.preventDefault();
  message.className = "message";
  message.textContent = "";

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Demo-only storage on this device/browser.
  // Replace this section with a secure backend before public launch.
  const data = Object.fromEntries(new FormData(form).entries());
  data.registrationDate = new Date().toISOString();
  data.reference = "ING-" + Date.now().toString().slice(-8);

  const existing = JSON.parse(localStorage.getItem("ingoair_registrations") || "[]");
  existing.push(data);
  localStorage.setItem("ingoair_registrations", JSON.stringify(existing));

  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  setTimeout(() => {
    reference.textContent = data.reference;
    form.classList.add("hidden");
    success.classList.remove("hidden");
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Registration";
  }, 600);
});

function resetForm() {
  form.reset();
  form.classList.remove("hidden");
  success.classList.add("hidden");
  message.className = "message";
  message.textContent = "";
  window.scrollTo({ top: 0, behavior: "smooth" });
}
