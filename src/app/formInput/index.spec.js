import 'jsdomSetup/jsdomSetup';
import FormInput from 'formInput';

describe('formInput/index.js', function () {
    describe('new FormInput', function () {
        beforeEach(function () {
            document.body.innerHTML += `<div id="formInput1" class="formInput">
                <input id="formInput1Input" class="formInput__input formInput__input--textInput formInput__input--text" type="text" value="" placeholder="Placeholder" />
                <p class="formInput__note formInput__note--error">Error</p>
            </div>`;
        });

        afterEach(function () {
            document.body.removeChild(document.getElementById('formInput1'));
        });

        describe(`options: {}`, function () {
            it(`should create formInput object`, function () {
                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                expect(formInputEle.length).toBe(1);
            });
        });

        describe('options: {disabled: true}', function () {
            it(`should create formInput object and set input to disabled`, function () {
                let formInput = new FormInput('#formInput1', {disabled: true});
                let formInputEle = formInput.formInput;

                expect(formInputEle.length).toBe(1);
                expect(formInputEle[0].classList.contains('formInput--disabled')).toBe(true);
                expect(formInputEle[0].querySelector('.formInput__input').disabled).toBe(true);
            });
        });

        describe('options: {required: true}', function () {
            it(`should create formInput object and set input to required`, function () {
                let formInput = new FormInput('#formInput1', {required: true});
                let formInputEle = formInput.formInput;

                expect(formInputEle.length).toBe(1);
                expect(formInputEle[0].classList.contains('formInput--required')).toBe(true);
                expect(formInputEle[0].querySelector('.formInput__input').required).toBe(true);
            });
        });

        describe('options: {readOnly: true}', function () {
            it(`should create formInput object and set input to readonly`, function () {
                let formInput = new FormInput('#formInput1', {readOnly: true});
                let formInputEle = formInput.formInput;

                expect(formInputEle.length).toBe(1);
                expect(formInputEle[0].classList.contains('formInput--readonly')).toBe(true);
                expect(formInputEle[0].querySelector('.formInput__input').readOnly).toBe(true);
            });
        });

        describe(`options: {error: true, errorMessage: {default: 'Default Error'}}`, function () {
            it(`should create formInput object and set input to error`, function () {
                let formInput = new FormInput('#formInput1', {error: true, errorMessage: {default: 'Default Error'}});
                let formInputEle = formInput.formInput;

                expect(formInputEle.length).toBe(1);
                expect(formInputEle[0].classList.contains('formInput--error')).toBe(true);
                expect(formInputEle[0].querySelector('.formInput__input').classList.contains('formInput__input--error')).toBe(true);
                expect(formInputEle[0].querySelector('.formInput__note--error').innerHTML).toBe('Default Error');
            });
        });
    });

    describe('setDisabled', function () {
        describe(`<input>`, function () {
            beforeEach(function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <input id="formInput1Input" class="formInput__input formInput__input--textInput formInput__input--text" type="text" value="" placeholder="Placeholder" />
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;
            });

            afterEach(function () {
                document.body.removeChild(document.getElementById('formInput1'));
            });

            it(`should set formInput object to disabled`, function () {
                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                formInput.setDisabled(true);

                expect(formInputEle.length).toBe(1);
                expect(formInputEle[0].classList.contains('formInput--disabled')).toBe(true);
                expect(formInputEle[0].querySelector('.formInput__input').disabled).toBe(true);
            });

            it(`should set formInput object to enabled`, function () {
                let formInput = new FormInput('#formInput1', {disabled: true});
                let formInputEle = formInput.formInput;

                formInput.setDisabled(false);

                expect(formInputEle.length).toBe(1);
                expect(formInputEle[0].classList.contains('formInput--disabled')).toBe(false);
                expect(formInputEle[0].querySelector('.formInput__input').disabled).toBe(false);
            });
        });

        describe(`<textarea>`, function () {
            beforeEach(function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <textarea id="formInput1Input" class="formInput__input formInput__input--textInput formInput__input--textarea"></textarea>
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;
            });

            afterEach(function () {
                document.body.removeChild(document.getElementById('formInput1'));
            });

            it(`should set formInput object to disabled`, function () {
                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                formInput.setDisabled(true);

                expect(formInputEle.length).toBe(1);
                expect(formInputEle[0].classList.contains('formInput--disabled')).toBe(true);
                expect(formInputEle[0].querySelector('.formInput__input').disabled).toBe(true);
            });

            it(`should set formInput object to enabled`, function () {
                let formInput = new FormInput('#formInput1', {disabled: true});
                let formInputEle = formInput.formInput;

                formInput.setDisabled(false);

                expect(formInputEle.length).toBe(1);
                expect(formInputEle[0].classList.contains('formInput--disabled')).toBe(false);
                expect(formInputEle[0].querySelector('.formInput__input').disabled).toBe(false);
            });
        });

        describe(`<select>`, function () {
            beforeEach(function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <select id="formInput1Input" class="formInput__input formInput__input--select">
                    <option value="1">Value 1</option>
                    <option value="2">Value 2</option>
                    </select>
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;
            });

            afterEach(function () {
                document.body.removeChild(document.getElementById('formInput1'));
            });

            it(`should set formInput object to disabled`, function () {
                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                formInput.setDisabled(true);

                expect(formInputEle.length).toBe(1);
                expect(formInputEle[0].classList.contains('formInput--disabled')).toBe(true);
                expect(formInputEle[0].querySelector('.formInput__input').disabled).toBe(true);
            });

            it(`should set formInput object to enabled`, function () {
                let formInput = new FormInput('#formInput1', {disabled: true});
                let formInputEle = formInput.formInput;

                formInput.setDisabled(false);

                expect(formInputEle.length).toBe(1);
                expect(formInputEle[0].classList.contains('formInput--disabled')).toBe(false);
                expect(formInputEle[0].querySelector('.formInput__input').disabled).toBe(false);
            });
        });
    });

    describe('setReadonly', function () {
        describe(`<input>`, function () {
            beforeEach(function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <input id="formInput1Input" class="formInput__input formInput__input--textInput formInput__input--text" type="text" value="" placeholder="Placeholder" />
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;
            });

            afterEach(function () {
                document.body.removeChild(document.getElementById('formInput1'));
            });

            it(`should set formInput object to readonly`, function () {
                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                formInput.setReadonly(true);

                expect(formInputEle.length).toBe(1);
                expect(formInputEle[0].classList.contains('formInput--readonly')).toBe(true);
                expect(formInputEle[0].querySelector('.formInput__input').readOnly).toBe(true);
            });

            it(`should set formInput object to enabled`, function () {
                let formInput = new FormInput('#formInput1', {readOnly: true});
                let formInputEle = formInput.formInput;

                formInput.setReadonly(false);

                expect(formInputEle.length).toBe(1);
                expect(formInputEle[0].classList.contains('formInput--readonly')).toBe(false);
                expect(formInputEle[0].querySelector('.formInput__input').readOnly).toBe(false);
            });
        });

        describe(`<textarea>`, function () {
            beforeEach(function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <textarea id="formInput1Input" class="formInput__input formInput__input--textInput formInput__input--textarea"></textarea>
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;
            });

            afterEach(function () {
                document.body.removeChild(document.getElementById('formInput1'));
            });

            it(`should set formInput object to readonly`, function () {
                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                formInput.setReadonly(true);

                expect(formInputEle.length).toBe(1);
                expect(formInputEle[0].classList.contains('formInput--readonly')).toBe(true);
                expect(formInputEle[0].querySelector('.formInput__input').readOnly).toBe(true);
            });

            it(`should set formInput object to enabled`, function () {
                let formInput = new FormInput('#formInput1', {readOnly: true});
                let formInputEle = formInput.formInput;

                formInput.setReadonly(false);

                expect(formInputEle.length).toBe(1);
                expect(formInputEle[0].classList.contains('formInput--readonly')).toBe(false);
                expect(formInputEle[0].querySelector('.formInput__input').readOnly).toBe(false);
            });
        });

        describe(`<select>`, function () {
            beforeEach(function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <select id="formInput1Input" class="formInput__input formInput__input--select">
                    <option value="1">Value 1</option>
                    <option value="2">Value 2</option>
                    </select>
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;
            });

            afterEach(function () {
                document.body.removeChild(document.getElementById('formInput1'));
            });

            it(`should set formInput object to readonly`, function () {
                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                formInput.setReadonly(true);

                expect(formInputEle.length).toBe(1);
                expect(formInputEle[0].classList.contains('formInput--readonly')).toBe(true);
                expect(formInputEle[0].querySelector('.formInput__input').readOnly).toBe(undefined);
            });

            it(`should set formInput object to enabled`, function () {
                let formInput = new FormInput('#formInput1', {readOnly: true});
                let formInputEle = formInput.formInput;

                formInput.setReadonly(false);

                expect(formInputEle.length).toBe(1);
                expect(formInputEle[0].classList.contains('formInput--readonly')).toBe(false);
                expect(formInputEle[0].querySelector('.formInput__input').readOnly).toBe(undefined);
            });
        });
    });

    describe('setRequired', function () {
        describe(`<input>`, function () {
            beforeEach(function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <input id="formInput1Input" class="formInput__input formInput__input--textInput formInput__input--text" type="text" value="" placeholder="Placeholder" />
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;
            });

            afterEach(function () {
                document.body.removeChild(document.getElementById('formInput1'));
            });

            it(`should set formInput object to required`, function () {
                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                formInput.setRequired(true);

                expect(formInputEle.length).toBe(1);
                expect(formInputEle[0].classList.contains('formInput--required')).toBe(true);
                expect(formInputEle[0].querySelector('.formInput__input').required).toBe(true);
            });

            it(`should set formInput object to enabled`, function () {
                let formInput = new FormInput('#formInput1', {required: true});
                let formInputEle = formInput.formInput;

                formInput.setRequired(false);

                expect(formInputEle.length).toBe(1);
                expect(formInputEle[0].classList.contains('formInput--required')).toBe(false);
                expect(formInputEle[0].querySelector('.formInput__input').required).toBe(false);
            });
        });

        describe(`<textarea>`, function () {
            beforeEach(function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <textarea id="formInput1Input" class="formInput__input formInput__input--textInput formInput__input--textarea"></textarea>
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;
            });

            afterEach(function () {
                document.body.removeChild(document.getElementById('formInput1'));
            });

            it(`should set formInput object to required`, function () {
                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                formInput.setRequired(true);

                expect(formInputEle.length).toBe(1);
                expect(formInputEle[0].classList.contains('formInput--required')).toBe(true);
                expect(formInputEle[0].querySelector('.formInput__input').required).toBe(true);
            });

            it(`should set formInput object to enabled`, function () {
                let formInput = new FormInput('#formInput1', {required: true});
                let formInputEle = formInput.formInput;

                formInput.setRequired(false);

                expect(formInputEle.length).toBe(1);
                expect(formInputEle[0].classList.contains('formInput--required')).toBe(false);
                expect(formInputEle[0].querySelector('.formInput__input').required).toBe(false);
            });
        });

        describe(`<select>`, function () {
            beforeEach(function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <select id="formInput1Input" class="formInput__input formInput__input--select">
                    <option value="1">Value 1</option>
                    <option value="2">Value 2</option>
                    </select>
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;
            });

            afterEach(function () {
                document.body.removeChild(document.getElementById('formInput1'));
            });

            it(`should set formInput object to required`, function () {
                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                formInput.setRequired(true);

                expect(formInputEle.length).toBe(1);
                expect(formInputEle[0].classList.contains('formInput--required')).toBe(true);
                expect(formInputEle[0].querySelector('.formInput__input').required).toBe(true);
            });

            it(`should set formInput object to enabled`, function () {
                let formInput = new FormInput('#formInput1', {required: true});
                let formInputEle = formInput.formInput;

                formInput.setRequired(false);

                expect(formInputEle.length).toBe(1);
                expect(formInputEle[0].classList.contains('formInput--required')).toBe(false);
                expect(formInputEle[0].querySelector('.formInput__input').required).toBe(false);
            });
        });
    });

    describe('setError', function () {
        describe(`<input>`, function () {
            beforeEach(function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <input id="formInput1Input" class="formInput__input formInput__input--textInput formInput__input--text" type="text" value="" placeholder="Placeholder" />
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;
            });

            afterEach(function () {
                document.body.removeChild(document.getElementById('formInput1'));
            });

            it(`should set formInput object to required`, function () {
                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                formInput.setError({isError: true, message: 'Error Message'});

                expect(formInputEle.length).toBe(1);
                expect(formInputEle[0].classList.contains('formInput--error')).toBe(true);
                expect(formInputEle[0].querySelector('.formInput__input').classList.contains('formInput__input--error')).toBe(true);
                expect(formInputEle[0].querySelector('.formInput__note--error').innerHTML).toBe('Error Message');
            });

            it(`should set formInput object to enabled`, function () {
                let formInput = new FormInput('#formInput1', {required: true});
                let formInputEle = formInput.formInput;

                formInput.setError(false);

                expect(formInputEle.length).toBe(1);
                expect(formInputEle[0].classList.contains('formInput--error')).toBe(false);
                expect(formInputEle[0].querySelector('.formInput__input').classList.contains('formInput__input--error')).toBe(false);
            });
        });

        describe(`<textarea>`, function () {
            beforeEach(function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <textarea id="formInput1Input" class="formInput__input formInput__input--textInput formInput__input--textarea"></textarea>
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;
            });

            afterEach(function () {
                document.body.removeChild(document.getElementById('formInput1'));
            });

            it(`should set formInput object to required`, function () {
                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                formInput.setError({isError: true, message: 'Error Message'});

                expect(formInputEle.length).toBe(1);
                expect(formInputEle[0].classList.contains('formInput--error')).toBe(true);
                expect(formInputEle[0].querySelector('.formInput__input').classList.contains('formInput__input--error')).toBe(true);
                expect(formInputEle[0].querySelector('.formInput__note--error').innerHTML).toBe('Error Message');
            });

            it(`should set formInput object to enabled`, function () {
                let formInput = new FormInput('#formInput1', {required: true});
                let formInputEle = formInput.formInput;

                formInput.setError(false);

                expect(formInputEle.length).toBe(1);
                expect(formInputEle[0].classList.contains('formInput--error')).toBe(false);
                expect(formInputEle[0].querySelector('.formInput__input').classList.contains('formInput__input--error')).toBe(false);
            });
        });

        describe(`<select>`, function () {
            beforeEach(function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <select id="formInput1Input" class="formInput__input formInput__input--select">
                    <option value="1">Value 1</option>
                    <option value="2">Value 2</option>
                    </select>
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;
            });

            afterEach(function () {
                document.body.removeChild(document.getElementById('formInput1'));
            });

            it(`should set formInput object to required`, function () {
                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                formInput.setError({isError: true, message: 'Error Message'});

                expect(formInputEle.length).toBe(1);
                expect(formInputEle[0].classList.contains('formInput--error')).toBe(true);
                expect(formInputEle[0].querySelector('.formInput__input').classList.contains('formInput__input--error')).toBe(true);
                expect(formInputEle[0].querySelector('.formInput__note--error').innerHTML).toBe('Error Message');
            });

            it(`should set formInput object to enabled`, function () {
                let formInput = new FormInput('#formInput1', {required: true});
                let formInputEle = formInput.formInput;

                formInput.setError(false);

                expect(formInputEle.length).toBe(1);
                expect(formInputEle[0].classList.contains('formInput--error')).toBe(false);
                expect(formInputEle[0].querySelector('.formInput__input').classList.contains('formInput__input--error')).toBe(false);
            });
        });
    });

    describe('setValue', function () {
        describe(`<input type="text">`, function () {
            it(`should set input value to "Test"`, function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <input id="formInput1Input" class="formInput__input formInput__input--textInput formInput__input--text" type="text" value="" placeholder="Placeholder" />
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;

                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                formInput.setValue('Test');

                expect(formInputEle.length).toBe(1);
                expect(document.getElementById('formInput1Input').value).toBe('Test');

                document.body.removeChild(document.getElementById('formInput1'));
            });

            it(`should set input value to ""`, function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <input id="formInput1Input" class="formInput__input formInput__input--textInput formInput__input--text" type="text" value="Test" placeholder="Placeholder" />
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;

                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                formInput.setValue();

                expect(formInputEle.length).toBe(1);
                expect(document.getElementById('formInput1Input').value).toBe('');

                document.body.removeChild(document.getElementById('formInput1'));
            });
        });

        describe(`<input type="checkbox">`, function () {
            it(`should set input to checked`, function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <input id="formInput1Input" class="formInput__input formInput__input--checkbox" value="item" type="checkbox" />
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;

                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                formInput.setValue(true);

                expect(formInputEle.length).toBe(1);
                expect(document.getElementById('formInput1Input').checked).toBe(true);

                document.body.removeChild(document.getElementById('formInput1'));
            });

            it(`should set input to unchecked`, function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <input id="formInput1Input" class="formInput__input formInput__input--checkbox" value="item" type="checkbox" checked />
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;

                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                formInput.setValue(false);

                expect(formInputEle.length).toBe(1);
                expect(document.getElementById('formInput1Input').checked).toBe(false);

                document.body.removeChild(document.getElementById('formInput1'));
            });
        });

        describe(`<input type="radio">`, function () {
            it(`should set input to checked`, function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <input id="formInput1Input" class="formInput__input formInput__input--radio" value="item" type="radio" />
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;

                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                formInput.setValue(true);

                expect(formInputEle.length).toBe(1);
                expect(document.getElementById('formInput1Input').checked).toBe(true);

                document.body.removeChild(document.getElementById('formInput1'));
            });

            it(`should set input to unchecked`, function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <input id="formInput1Input" class="formInput__input formInput__input--radio" value="item" type="radio" checked />
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;

                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                formInput.setValue(false);

                expect(formInputEle.length).toBe(1);
                expect(document.getElementById('formInput1Input').checked).toBe(false);

                document.body.removeChild(document.getElementById('formInput1'));
            });
        });

        describe(`<textarea>`, function () {
            it(`should set input value to "Test"`, function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <textarea id="formInput1Input" class="formInput__input formInput__input--textInput formInput__input--textarea"></textarea>
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;

                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                formInput.setValue('Test');

                expect(formInputEle.length).toBe(1);
                expect(document.getElementById('formInput1Input').value).toBe('Test');

                document.body.removeChild(document.getElementById('formInput1'));
            });

            it(`should set input value to ""`, function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <textarea id="formInput1Input" class="formInput__input formInput__input--textInput formInput__input--textarea">Test</textarea>
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;

                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                formInput.setValue();

                expect(formInputEle.length).toBe(1);
                expect(document.getElementById('formInput1Input').value).toBe('');

                document.body.removeChild(document.getElementById('formInput1'));
            });
        });

        describe(`<select>`, function () {
            it(`should set input value to "Test"`, function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <select id="formInput1Input" class="formInput__input formInput__input--select">
                    <option value="1">Value 1</option>
                    <option value="2">Value 2</option>
                    </select>
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;

                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                formInput.setValue('2');

                expect(formInputEle.length).toBe(1);
                expect(document.getElementById('formInput1Input').options[document.getElementById('formInput1Input').selectedIndex].value).toBe('2');

                document.body.removeChild(document.getElementById('formInput1'));
            });
        });

        describe(`Multi Inputs`, function () {
            it(`should set inputs value to {formInput1Input1: 'Test', items: ['item1'], formInput1Input3: '2'}`, function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <input id="formInput1Input1" class="formInput__input formInput__input--textInput formInput__input--text" type="text" value="" placeholder="Placeholder" />
                    <input id="formInput1Input2_1" class="formInput__input formInput__input--checkbox" value="item1" type="checkbox" name="items" />
                    <input id="formInput1Input2_2" class="formInput__input formInput__input--checkbox" value="item2" type="checkbox" name="items" />
                    <select id="formInput1Input3" class="formInput__input formInput__input--select">
                    <option value="1">Value 1</option>
                    <option value="2">Value 2</option>
                    </select>
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;

                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                formInput.setValue({
                    formInput1Input1: 'Test',
                    items: ['item1'],
                    formInput1Input3: '2'
                });

                expect(formInputEle.length).toBe(1);
                expect(document.getElementById('formInput1Input1').value).toBe('Test');
                expect(document.getElementById('formInput1Input2_1').checked).toBe(true);
                expect(document.getElementById('formInput1Input2_2').checked).toBe(false);
                expect(document.getElementById('formInput1Input3').options[document.getElementById('formInput1Input3').selectedIndex].value).toBe('2');

                document.body.removeChild(document.getElementById('formInput1'));
            });
        });
    });

    describe('validation', function () {
        describe(`<input pattern="^[a-zA-Z]+$">`, function () {
            beforeEach(function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <input id="formInput1Input" pattern="^[a-zA-Z]+$" class="formInput__input formInput__input--textInput formInput__input--text" type="text" value="" placeholder="Placeholder" />
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;
            });

            afterEach(function () {
                document.body.removeChild(document.getElementById('formInput1'));
            });

            it(`should pass validation`, function () {
                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                formInput.setValue('Test');

                expect(formInputEle.length).toBe(1);
                expect(formInput.validation()).toBe(true);
            });

            it(`should not pass validation`, function () {
                let formInput = new FormInput('#formInput1', {errorMessage: {pattern: 'pattern error'}});
                let formInputEle = formInput.formInput;

                formInput.setValue('Test123');

                expect(formInputEle.length).toBe(1);
                expect(formInput.validation()).toBe(false);
                expect(formInputEle[0].querySelector('.formInput__note--error').innerHTML).toBe('pattern error');
            });
        });

        describe(`<input required>`, function () {
            beforeEach(function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <input id="formInput1Input" required class="formInput__input formInput__input--textInput formInput__input--text" type="text" value="" placeholder="Placeholder" />
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;
            });

            afterEach(function () {
                document.body.removeChild(document.getElementById('formInput1'));
            });

            it(`should pass validation`, function () {
                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                formInput.setValue('Test');

                expect(formInputEle.length).toBe(1);
                expect(formInput.validation()).toBe(true);
            });

            it(`should not pass validation`, function () {
                let formInput = new FormInput('#formInput1', {errorMessage: {required: 'required error'}});
                let formInputEle = formInput.formInput;

                expect(formInputEle.length).toBe(1);
                expect(formInput.validation()).toBe(false);
                expect(formInputEle[0].querySelector('.formInput__note--error').innerHTML).toBe('required error');
            });
        });

        describe(`options: {validation: [{regex: /^[a-zA-Z]+$/g, message: 'regex error'}]}`, function () {
            beforeEach(function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <input id="formInput1Input" class="formInput__input formInput__input--textInput formInput__input--text" type="text" value="" placeholder="Placeholder" />
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;
            });

            afterEach(function () {
                document.body.removeChild(document.getElementById('formInput1'));
            });

            it(`should pass validation`, function () {
                let formInput = new FormInput('#formInput1', {validation: [{regex: /^[a-zA-Z]+$/g, message: 'regex error'}]});
                let formInputEle = formInput.formInput;

                formInput.setValue('Test');

                expect(formInputEle.length).toBe(1);
                expect(formInput.validation()).toBe(true);
            });

            it(`should not pass validation`, function () {
                let formInput = new FormInput('#formInput1', {validation: [{regex: /^[a-zA-Z]+$/g, message: 'regex error'}]});
                let formInputEle = formInput.formInput;

                formInput.setValue('Test123');

                expect(formInputEle.length).toBe(1);
                expect(formInput.validation()).toBe(false);
                expect(formInputEle[0].querySelector('.formInput__note--error').innerHTML).toBe('regex error');
            });
        });
    });

    describe('value', function () {
        describe(`<input type="text">`, function () {
            it(`should return ['']`, function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <input id="formInput1Input" class="formInput__input formInput__input--textInput formInput__input--text" type="text" value="" placeholder="Placeholder" />
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;

                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                expect(formInputEle.length).toBe(1);
                expect(formInput.value[0]).toBe('');

                document.body.removeChild(document.getElementById('formInput1'));
            });

            it(`should return ['Test']`, function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <input id="formInput1Input" class="formInput__input formInput__input--textInput formInput__input--text" type="text" value="Test" placeholder="Placeholder" />
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;

                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                expect(formInputEle.length).toBe(1);
                expect(formInput.value[0]).toBe('Test');

                document.body.removeChild(document.getElementById('formInput1'));
            });
        });

        describe(`<input type="checkbox">`, function () {
            it(`should return [{items: []}]`, function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <input id="formInput1Input1" class="formInput__input formInput__input--checkbox" value="item1" type="checkbox" name="items" />
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;

                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                expect(formInputEle.length).toBe(1);
                expect(formInput.value[0]).toBe(false);

                document.body.removeChild(document.getElementById('formInput1'));
            });

            it(`should return [{items: ['item1']}]`, function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <input id="formInput1Input1" class="formInput__input formInput__input--checkbox" value="item1" type="checkbox" name="items" checked />
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;

                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                expect(formInputEle.length).toBe(1);
                expect(formInput.value[0]).toBe(true);

                document.body.removeChild(document.getElementById('formInput1'));
            });
            it(`should return [{items: []}]`, function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <input id="formInput1Input1" class="formInput__input formInput__input--checkbox" value="item1" type="checkbox" name="items" />
                    <input id="formInput1Input2" class="formInput__input formInput__input--checkbox" value="item2" type="checkbox" name="items" />
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;

                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                expect(formInputEle.length).toBe(1);
                expect(formInput.value[0].items.length).toBe(0);

                document.body.removeChild(document.getElementById('formInput1'));
            });

            it(`should return [{items: ['item1']}]`, function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <input id="formInput1Input1" class="formInput__input formInput__input--checkbox" value="item1" type="checkbox" name="items" checked />
                    <input id="formInput1Input2" class="formInput__input formInput__input--checkbox" value="item2" type="checkbox" name="items" />
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;

                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                expect(formInputEle.length).toBe(1);
                expect(formInput.value[0].items.length).toBe(1);
                expect(formInput.value[0].items[0]).toBe('item1');

                document.body.removeChild(document.getElementById('formInput1'));
            });
        });

        describe(`<input type="radio">`, function () {
            it(`should return [false]`, function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <input id="formInput1Input" class="formInput__input formInput__input--radio" value="item" type="radio" />
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;

                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                expect(formInputEle.length).toBe(1);
                expect(formInput.value[0]).toBe(false);

                document.body.removeChild(document.getElementById('formInput1'));
            });

            it(`should return [true]`, function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <input id="formInput1Input" class="formInput__input formInput__input--radio" value="item" type="radio" checked />
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;

                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                expect(formInputEle.length).toBe(1);
                expect(formInput.value[0]).toBe(true);

                document.body.removeChild(document.getElementById('formInput1'));
            });
            it(`should return [{items: false}]`, function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <input id="formInput1Input1" class="formInput__input formInput__input--radio" value="item1" type="radio" name="items" />
                    <input id="formInput1Input2" class="formInput__input formInput__input--radio" value="item2" type="radio" name="items" />
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;

                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                expect(formInputEle.length).toBe(1);
                expect(formInput.value[0].items).toBe(false);

                document.body.removeChild(document.getElementById('formInput1'));
            });

            it(`should return [{items: 'item1'}]`, function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <input id="formInput1Input1" class="formInput__input formInput__input--radio" value="item1" type="radio" name="items" checked />
                    <input id="formInput1Input2" class="formInput__input formInput__input--radio" value="item2" type="radio" name="items" />
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;

                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                expect(formInputEle.length).toBe(1);
                expect(formInput.value[0].items).toBe('item1');

                document.body.removeChild(document.getElementById('formInput1'));
            });
        });

        describe(`<textarea>`, function () {
            it(`should return ['']`, function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <textarea id="formInput1Input" class="formInput__input formInput__input--textInput formInput__input--textarea"></textarea>
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;

                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                expect(formInputEle.length).toBe(1);
                expect(formInput.value[0]).toBe('');

                document.body.removeChild(document.getElementById('formInput1'));
            });

            it(`should return ['Test']`, function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <textarea id="formInput1Input" class="formInput__input formInput__input--textInput formInput__input--textarea">Test</textarea>
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;

                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                expect(formInputEle.length).toBe(1);
                expect(formInput.value[0]).toBe('Test');

                document.body.removeChild(document.getElementById('formInput1'));
            });
        });

        describe(`<select>`, function () {
            it(`should return ['1']`, function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <select id="formInput1Input" class="formInput__input formInput__input--select">
                    <option value="1">Value 1</option>
                    <option value="2">Value 2</option>
                    </select>
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;

                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                expect(formInputEle.length).toBe(1);
                expect(formInput.value[0]).toBe('1');

                document.body.removeChild(document.getElementById('formInput1'));
            });

            it(`should return ['2']`, function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <select id="formInput1Input" class="formInput__input formInput__input--select">
                    <option value="1">Value 1</option>
                    <option value="2" selected>Value 2</option>
                    </select>
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;

                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                expect(formInputEle.length).toBe(1);
                expect(formInput.value[0]).toBe('2');

                document.body.removeChild(document.getElementById('formInput1'));
            });
        });

        describe(`Multi Inputs`, function () {
            it(`should return [{formInput1Input1: '', items: [], formInput1Input3: '1'}]`, function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <input id="formInput1Input1" class="formInput__input formInput__input--textInput formInput__input--text" type="text" value="" placeholder="Placeholder" />
                    <input id="formInput1Input2_1" class="formInput__input formInput__input--checkbox" value="item1" type="checkbox" name="items" />
                    <input id="formInput1Input2_2" class="formInput__input formInput__input--checkbox" value="item2" type="checkbox" name="items" />
                    <select id="formInput1Input3" class="formInput__input formInput__input--select">
                    <option value="1">Value 1</option>
                    <option value="2">Value 2</option>
                    </select>
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;

                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                expect(formInputEle.length).toBe(1);
                expect(formInput.value[0].formInput1Input1).toBe('');
                expect(formInput.value[0].items.length).toBe(0);
                expect(formInput.value[0].formInput1Input3).toBe('1');

                document.body.removeChild(document.getElementById('formInput1'));
            });

            it(`should return [{formInput1Input1: 'Test', items: ['item1'], formInput1Input3: '2'}]`, function () {
                document.body.innerHTML += `<div id="formInput1" class="formInput">
                    <input id="formInput1Input1" class="formInput__input formInput__input--textInput formInput__input--text" type="text" value="Test" placeholder="Placeholder" />
                    <input id="formInput1Input2_1" class="formInput__input formInput__input--checkbox" value="item1" type="checkbox" name="items" checked />
                    <input id="formInput1Input2_2" class="formInput__input formInput__input--checkbox" value="item2" type="checkbox" name="items" />
                    <select id="formInput1Input3" class="formInput__input formInput__input--select">
                    <option value="1">Value 1</option>
                    <option value="2" selected>Value 2</option>
                    </select>
                    <p class="formInput__note formInput__note--error">Error</p>
                </div>`;

                let formInput = new FormInput('#formInput1');
                let formInputEle = formInput.formInput;

                expect(formInputEle.length).toBe(1);
                expect(formInput.value[0].formInput1Input1).toBe('Test');
                expect(formInput.value[0].items.length).toBe(1);
                expect(formInput.value[0].items[0]).toBe('item1');
                expect(formInput.value[0].formInput1Input3).toBe('2');

                document.body.removeChild(document.getElementById('formInput1'));
            });
        });
    });
});
