import FormInput from 'formInput';

const formInput = new FormInput('#withFunction');

const formInputDisabled = document.getElementById('formInputDisabled');
const formInputReadonly = document.getElementById('formInputReadonly');
const formInputError = document.getElementById('formInputError');
const formInputErrorMessage = document.getElementById('formInputErrorMessage');
const formInputSetValue = document.getElementById('formInputSetValue');
const formInputGetValue = document.getElementById('formInputGetValue');

window.setDisabled = () => {
    if (formInputDisabled.checked) {
        formInputReadonly.checked = false;
        formInputError.checked = false;
    }
    formInput.setDisabled(formInputDisabled.checked);
};

window.setReadOnly = () => {
    if (formInputReadonly.checked) {
        formInputDisabled.checked = false;
        formInputError.checked = false;
    }
    formInput.setReadonly(formInputReadonly.checked);
};

window.setError = () => {
    if (formInputError.checked) {
        formInputReadonly.checked = false;
        formInputDisabled.checked = false;
    }
    formInput.setError({isError: formInputError.checked, message: formInputErrorMessage.value});
};

window.setValue = () => {
    formInput.setValue(formInputSetValue.value);
};

window.getValue = () => {
    formInputGetValue.innerHTML = JSON.stringify(formInput.value[0]);
};
