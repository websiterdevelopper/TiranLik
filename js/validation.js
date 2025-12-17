// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Select form and input fields
  const form = document.querySelector("form");
  const emailInput = document.querySelector("#user-mail");
  const passwordInput = document.querySelector("#user-password");
  const emailMessage = document.querySelector("#email-message");
  const passwordMessage = document.querySelector("#password-message");

  // Password requirement elements
  const reqLength = document.querySelector("#req-length");
  const reqUppercase = document.querySelector("#req-uppercase");
  const reqLowercase = document.querySelector("#req-lowercase");
  const reqDigit = document.querySelector("#req-digit");
  const reqSpecial = document.querySelector("#req-special");

  // Regex patterns
  const mailRegEx =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  /*
  Has minimum 8 characters in length. Adjust it by modifying {8,}
  At least one uppercase English letter. You can remove this condition by removing (?=.*?[A-Z])
  At least one lowercase English letter.  You can remove this condition by removing (?=.*?[a-z])
  At least one digit. You can remove this condition by removing (?=.*?[0-9])
  At least one special character,  You can remove this condition by removing (?=.*?[#?!@$%^&*-])
  */
  const passRegEx =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  // Validation functions
  function validateEmail(email) {
    return mailRegEx.test(email);
  }

  function validatePassword(password) {
    return passRegEx.test(password);
  }

  // Function to update validation message
  function updateValidationMessage(
    messageElement,
    isValid,
    emptyMessage,
    validMessage,
    invalidMessage
  ) {
    messageElement.classList.remove("valid", "invalid");

    if (emptyMessage) {
      messageElement.textContent = "";
      return;
    }

    if (isValid) {
      messageElement.textContent = validMessage;
      messageElement.classList.add("valid");
    } else {
      messageElement.textContent = invalidMessage;
      messageElement.classList.add("invalid");
    }
  }

  // Function to update field validation status
  function updateFieldStatus(
    input,
    isValid,
    messageElement,
    validMessage,
    invalidMessage
  ) {
    // Remove existing validation classes
    input.classList.remove("valid-field", "invalid-field");

    const isEmpty = input.value.trim() === "";

    // Update validation message
    updateValidationMessage(
      messageElement,
      isValid,
      isEmpty,
      validMessage,
      invalidMessage
    );

    // Add appropriate class based on validation status
    if (isEmpty) {
      // Empty field - no validation class
      return false;
    } else if (isValid) {
      input.classList.add("valid-field");
      return true;
    } else {
      input.classList.add("invalid-field");
      return false;
    }
  }

  // Check individual password requirements
  function checkPasswordRequirements(password) {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /[0-9]/.test(password),
      special: /[#?!@$%^&*-]/.test(password),
    };

    // Update requirement indicators
    reqLength.classList.toggle("valid", requirements.length);
    reqUppercase.classList.toggle("valid", requirements.uppercase);
    reqLowercase.classList.toggle("valid", requirements.lowercase);
    reqDigit.classList.toggle("valid", requirements.digit);
    reqSpecial.classList.toggle("valid", requirements.special);

    return requirements;
  }

  // Validate email field
  function validateEmailField() {
    const email = emailInput.value.trim();
    const isEmpty = email === "";
    const isValid = !isEmpty && validateEmail(email);

    return updateFieldStatus(
      emailInput,
      isValid,
      emailMessage,
      "✓ Valid email",
      "✗ Please enter a valid email address"
    );
  }

  // Validate password field
  function validatePasswordField() {
    const password = passwordInput.value;
    const isEmpty = password === "";

    // Check individual requirements
    checkPasswordRequirements(password);

    const isValid = !isEmpty && validatePassword(password);

    return updateFieldStatus(
      passwordInput,
      isValid,
      passwordMessage,
      "✓ Password is valid",
      "✗ Password does not meet all requirements"
    );
  }

  // Check if all fields are valid
  function isFormValid() {
    const emailValid = validateEmailField();
    const passwordValid = validatePasswordField();
    return emailValid && passwordValid;
  }

  // Add event listeners for real-time validation
  emailInput.addEventListener("input", validateEmailField);
  emailInput.addEventListener("blur", validateEmailField);

  passwordInput.addEventListener("input", validatePasswordField);
  passwordInput.addEventListener("blur", validatePasswordField);

  // Prevent form submission if validation fails
  form.addEventListener("submit", (e) => {
    if (!isFormValid()) {
      e.preventDefault();
      // Validate all fields to show their current status
      validateEmailField();
      validatePasswordField();
    }
  });

  // Also handle button click to prevent navigation if form is invalid
  const submitButton = form.querySelector("button.btn-secondary");
  const submitLink = submitButton.querySelector("a");

  submitLink.addEventListener("click", (e) => {
    if (!isFormValid()) {
      e.preventDefault();
      // Validate all fields to show their current status
      validateEmailField();
      validatePasswordField();
    }
  });

  // Toggle password visibility
  const togglePasswordButton = document.querySelector("#toggle-password");
  const eyeIcon = togglePasswordButton.querySelector(".eye-icon");

  togglePasswordButton.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.textContent = "🙈";
      togglePasswordButton.setAttribute("aria-label", "Hide password");
    } else {
      passwordInput.type = "password";
      eyeIcon.textContent = "👁️";
      togglePasswordButton.setAttribute("aria-label", "Show password");
    }
  });
});
