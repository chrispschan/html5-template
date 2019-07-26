import FormInput from 'formInput';

const formInput = new FormInput('#fieldsetInputs');

const formInputKey = document.getElementById('formInputKey');
const formInputDisabled = document.getElementById('formInputDisabled');
const formInputReadonly = document.getElementById('formInputReadonly');
const formInputError = document.getElementById('formInputError');
const formInputErrorMessage = document.getElementById('formInputErrorMessage');
const formInputSetTextValue = document.getElementById('formInputSetTextValue');
const formInputSetNumberValue = document.getElementById('formInputSetNumberValue');
const formInputGetValue = document.getElementById('formInputGetValue');

window.setDisabled = () => {
    let _inputKey = formInputKey.options[formInputKey.selectedIndex].value === '-1' ? -1 : formInputKey.options[formInputKey.selectedIndex].value;
    if (formInputDisabled.checked) {
        formInputReadonly.checked = false;
        formInputError.checked = false;
    }
    formInput.setDisabled(formInputDisabled.checked, _inputKey);
};

window.setReadOnly = () => {
    let _inputKey = formInputKey.options[formInputKey.selectedIndex].value === '-1' ? -1 : formInputKey.options[formInputKey.selectedIndex].value;
    if (formInputReadonly.checked) {
        formInputDisabled.checked = false;
        formInputError.checked = false;
    }
    formInput.setReadonly(formInputReadonly.checked, _inputKey);
};

window.setError = () => {
    let _inputKey = formInputKey.options[formInputKey.selectedIndex].value === '-1' ? -1 : formInputKey.options[formInputKey.selectedIndex].value;
    if (formInputError.checked) {
        formInputReadonly.checked = false;
        formInputDisabled.checked = false;
    }
    formInput.setError({isError: formInputError.checked, message: formInputErrorMessage.value}, _inputKey);
};

window.setValue = () => {
    let _inputKey = formInputKey.options[formInputKey.selectedIndex].value === '-1' ? -1 : formInputKey.options[formInputKey.selectedIndex].value;
    formInput.setValue({
        fieldsetInputText: formInputSetTextValue.value,
        number: formInputSetNumberValue.value
    }, _inputKey);
};

window.getValue = () => {
    formInputGetValue.innerHTML = JSON.stringify(formInput.value[0]);
};
