/* ========================================
            CONTACT FORM SYSTEM
======================================== */

(() => {
  "use strict";

  if (!window.emailjs || !window.Swal) return;

  const { publicKey, serviceId, templateId } = CONFIG.emailjs;
  const form = document.querySelector("#contact-form");

  if (!form) return;

  const submitButton = form.querySelector('button[type="submit"]');
  if (!submitButton) return;

  const defaultButtonHTML = submitButton.innerHTML;

  emailjs.init({ publicKey });

  const trim = (value) => (value || "").trim();

  const validateForm = () => {
    const name = trim(form.name.value);
    const email = trim(form.email.value);
    const subject = trim(form.subject.value);
    const message = trim(form.message.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !subject || !message) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in all fields before sending.",
      });
      return false;
    }

    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return false;
    }

    return true;
  };

  const setLoading = (loading) => {
    submitButton.disabled = loading;
    submitButton.setAttribute("aria-busy", String(loading));
    submitButton.innerHTML = loading
      ? '<i class="fa-solid fa-spinner fa-spin"></i> Sending...'
      : defaultButtonHTML;
  };

  let lastSubmit = 0;

  const canSubmit = () => {
    const now = Date.now();

    if (now - lastSubmit < 10000) {
      Swal.fire({
        icon: "info",
        title: "Please Wait",
        text: "You can send another message in a few seconds.",
      });
      return false;
    }

    lastSubmit = now;
    return true;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!validateForm() || !canSubmit()) return;

    setLoading(true);

    try {
      await emailjs.sendForm(serviceId, templateId, form);

      Swal.fire({
        icon: "success",
        title: "Message Sent",
        text: "Thank you! I'll get back to you soon.",
        confirmButtonColor: "#7C3AED",
      });

      form.reset();
    } catch (error) {
      console.error("[EmailJS]", error);

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Unable to send your message right now. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  });
})();
