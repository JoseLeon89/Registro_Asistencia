let formEnabled = false;

function enableForm() {
    const password = document.getElementById('admin-password').value;
    const enableTime = new Date(document.getElementById('enable-time').value);
    const currentTime = new Date();
    

    if (password === 'admin123' && currentTime >= enableTime) {
        document.getElementById('registrationForm').style.display = 'block';
        formEnabled = true;
        
    } else {
        alert('Contraseña incorrecta o tiempo no válido.');
    }
    document.getElementById('admin-password').value = '';
}

function submitForm(event) {
    event.preventDefault();
    if (formEnabled) {
        const name = document.getElementById('name').value;
        const carrera = document.getElementById('carrera').value;
        const commission = document.getElementById('commission').value;
        const dni = document.getElementById('dni').value;

        // Aquí iría el código para enviar los datos a Google Sheets


        document.getElementById('registrationForm').style.display = 'none';
        formEnabled = false;
        alert('Formulario enviado correctamente.');

        // Mostrar registros guardados
        document.getElementById('user-records').style.display = 'block';
        document.getElementById('records').innerHTML = `
            <p>Nombre y Apellido: ${name}</p>
            <p>Carrera: ${carrera}</p>
            <p>Comisión: ${commission}</p>
            <p>DNI o LU: ${dni}</p>
        `;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    const registrationForm = document.getElementById('registrationForm');
    const submitButton = document.querySelector('button[type="submit"]');
    const countdown = document.getElementById('countdown');
    const attendanceData = document.getElementById('attendanceData');
    let countdownTimer;
  
  
    registrationForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const formData = new FormData(registrationForm);
      const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });

      // Obtener la fecha y hora actuales del sistema
    const currentDate = new Date();
    formDataObject['date'] = currentDate.toLocaleDateString();
    formDataObject['time'] = currentDate.toLocaleTimeString();
  
  
      //sendDataToGoogleSheets(formDataObject);
      disableFields();
      saveRegistrationData(formDataObject);
      loadAttendanceData();
      submitButton.disabled = true;
    });
  
  
    function startCountdown(durationInSeconds) {
      let timer = durationInSeconds;
      let minutes, seconds;
  
      countdownTimer = setInterval(() => {
        minutes = Math.floor(timer / 60);
        seconds = timer % 60;
  
        countdown.textContent = `Tiempo restante: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  
        if (--timer < 0) {
          clearInterval(countdownTimer);
          disableFields();
          submitButton.disabled = true;
        }
      }, 1000);
    }
  
    function resetCountdown(durationInSeconds) {
      clearInterval(countdownTimer);
      startCountdown(durationInSeconds);
    }
  
    function disableFields() {
      const formInputs = registrationForm.querySelectorAll('input', 'submit');
      formInputs.forEach(input => {
        input.disabled = true;
      });
    }
  
    function enableFields() {
      const formInputs = registrationForm.querySelectorAll('input');
      formInputs.forEach(input => {
        input.disabled = false;
      });
    }
  
    function saveRegistrationData(data) {
      // Simular el guardado de datos en Google Sheets
      const registrationData = JSON.parse(localStorage.getItem('registrationData')) || [];
      registrationData.push(data);
      localStorage.setItem('registrationData', JSON.stringify(registrationData));
      localStorage.setItem('isRegistered', 'true');
    }
  
    function loadAttendanceData() {
      attendanceData.innerHTML = ''; // Limpiar datos existentes
      const registrationData = JSON.parse(localStorage.getItem('registrationData')) || [];
      registrationData.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML =
        `<td>${entry.name}</td>
        <td>${entry.carrera}</td>
        <td>${entry.commission}</td>
        <td>${entry.dni}</td>
        <td>${entry.date}</td>
        <td>${entry.time}</td>`;
        attendanceData.appendChild(row);
      });
    }
  
  });
