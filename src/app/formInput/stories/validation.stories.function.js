import FormInput from 'formInput';

const formInput = new FormInput('#withValidation', {
    errorMessage: {
        default: 'default error',
        required: 'text input required error',
        pattern: 'text input pattern error',
        range: 'number input range error'
    },
    validation: {
        withValidationInputText: [
            {regex: /[0-9]/g, message: 'text input [0-9] error'},
            {regex: /[A-Z]/g, message: 'text input [A-Z] error'},
            {callback: (value) => value.length === 0 || value.length > 4, message: 'text input callback error'}
        ],
        number: [
            {callback: (value) => value % 2 === 0, message: 'number input callback error'}
        ]
    }
});

const withValidationInput = document.getElementById('withValidationInput');

window.checkValidation = () => {
    formInput.validation();
};
