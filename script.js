// Получаем форму
const form = document.getElementById('ContactForm');

// Получаем поля для ввода по id
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');

// .... курс, сообщение и т.п.

// Добавляем обработку события ввода email
emailInput.addEventListener('input', validateEmail); // Исправлено: validateEmai → validateEmail

// Функция обработки ввода email
function validateEmail() {
    // Исправлено регулярное выражение:
    // - убраны пробелы внутри {}
    // - исправлен диапазон {2-9} → {2,9}
    // - добавлены флаги для точного соответствия
    const emailRegex = /^[A-Za-z0-9\._]{3,10}@[a-z0-9]{2,10}\.(ru|com)$/;
    
    if(emailRegex.test(emailInput.value)) {
        hideError(emailInput);
        return true;
    }
    else {
        showError(emailInput, "email должен состоять из 3-10 символов, содержать знак @, а также быть в домене .ru или .com");
        return false;
    }
}

// Функция показа ошибки и сообщения
function showError(input, message) {
    const formControl = input.parentElement; // берём компонент, для которого показываем ошибку
    const errorElement = formControl.querySelector('.error') || document.createElement('div');
    errorElement.className = 'error';
    errorElement.textContent = message;
    
    // Добавляем элемент только если его еще нет
    if (!formControl.querySelector('.error')) {
        formControl.appendChild(errorElement);
    } else {
        // Если уже есть, просто обновляем текст
        formControl.querySelector('.error').textContent = message;
    }
    
    input.style.borderColor = 'red';
}

// Функция скрытия ошибки
function hideError(input) {
    const formControl = input.parentElement;
    const errorElement = formControl.querySelector('.error');
    if(errorElement) {
        formControl.removeChild(errorElement);
    }
    input.style.borderColor = 'purple';
}

// Исправлено: убрана лишняя скобка и точка с запятой
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Предотвращает отправку формы средствами HTML

    const isElementValid = validateEmail();
    if(isElementValid) {
        form.submit(); // Исправлено: sumbit → submit
    }
});