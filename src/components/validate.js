// validate.js

export function ShowValidMessage(form, input, errorMessage, validButton) {
  if (!input.validity.valid) {
    input.classList.add("input-error");
    errorMessage.textContent = input.validationMessage;
  } else if (input.value.length >= input.maxLength) {
    input.classList.add("input-error");
    errorMessage.textContent = `Достигнуто максимальное количество символов: ${input.maxLength}`;
  } else {
    input.classList.remove("input-error");
    errorMessage.textContent = "";
  }
  if (!form.checkValidity()) {
    validButton.classList.add("non-active-button");
  } else {
    validButton.classList.remove("non-active-button");
  }
}
