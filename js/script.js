const bookingModal = document.getElementById("bookingModal");
const bookingPackage = document.getElementById("bookingPackage");
const bookingDate = document.querySelector('input[type="date"]');

if (bookingDate) {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  bookingDate.min = today.toISOString().slice(0, 10);
}

if (bookingModal && bookingPackage) {
  bookingModal.addEventListener("show.bs.modal", (event) => {
    const packageName = event.relatedTarget?.getAttribute("data-package");

    if (packageName && [...bookingPackage.options].some((option) => option.value === packageName)) {
      bookingPackage.value = packageName;
    }

    const confirmation = bookingModal.querySelector("[data-form-confirmation]");
    confirmation?.classList.add("d-none");
    if (confirmation) {
      confirmation.textContent = "";
    }
  });
}

const bookingForm = document.querySelector('[data-demo-form][data-form-type="booking"]');
const packageQuery = new URLSearchParams(window.location.search).get("package");

if (bookingForm && packageQuery) {
  const packageSelect = bookingForm.querySelector('[name="package"]');
  if (packageSelect && [...packageSelect.options].some((option) => option.value === packageQuery)) {
    packageSelect.value = packageQuery;
  }
}

document.querySelectorAll("[data-demo-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    const confirmation = form.querySelector("[data-form-confirmation]");
    if (!confirmation) {
      return;
    }

    const name = form.querySelector('[name="name"]')?.value.trim();
    const packageName = form.querySelector('[name="package"]')?.value;
    confirmation.textContent = packageName
      ? `Thanks${name ? `, ${name}` : ""}! Your request for ${packageName} has been recorded in this demo. No booking data was sent to a server.`
      : `Thanks${name ? `, ${name}` : ""}! Your message is ready. This demo does not send data to a server.`;
    confirmation.classList.remove("d-none");
  });
});