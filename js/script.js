document.addEventListener('DOMContentLoaded', function() {
  const registrationForm = document.getElementById('registrationForm');
  const countdown = document.getElementById('countdown');
  const attendanceData = document.getElementById('attendanceData');
  const adminForm = document.getElementById('adminForm');
  const adminPasswordInput = document.getElementById('adminPassword');
  const dateInput = document.getElementById('date');
  const timeInput = document.getElementById('time');
  const submitButton = document.querySelector('button[type="submit"]');
  let isRegistered = localStorage.getItem('isRegistered') === 'true';
  let countdownTimer;
  //let spreadsheetId; // Variable para almacenar el ID de la hoja de cálculo

  if (isRegistered) {
    disableFields();
    loadAttendanceData();
  } else {
    startCountdown(2 * 60); // Contador de 2 minutos al iniciar la aplicación
  }

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
    submitButton.disabled = true; // Deshabilitar el botón de registrar
  });

  adminForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const adminPassword = adminPasswordInput.value;

    // Ejemplo de contraseña de administrador (cambiar por la contraseña real)
    if (adminPassword === 'admin') {
      enableFields();
      resetCountdown(2 * 60); // Reiniciar el contador a 3 minutos
      adminPasswordInput.value = ''; // Limpiar el campo de contraseña
      alert('Asistencia Habilitada');
      submitButton.disabled = false; // Habilitar el botón de registrar
    } else {
      alert('Contraseña de administrador incorrecta. Inténtalo de nuevo.');
    }
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
        submitButton.disabled = true; // Deshabilitar el botón de registrar al finalizar el tiempo
      }
    }, 1000);
  }

  function resetCountdown(durationInSeconds) {
    clearInterval(countdownTimer);
    startCountdown(durationInSeconds);
    
  }

  function disableFields() {
    const formInputs = registrationForm.querySelectorAll('input');
    formInputs.forEach(input => {
      input.disabled = true;
      submitButton.disabled = true; // Deshabilitar el botón de registrar
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
      //const row = document.createElement('tr');
      //row.innerHTML = `<td>${entry.name}</td><td>${entry.email}</td><td>${entry.dni}</td><td>${entry.date}</td><td>${entry.time}</td>`;
      //attendanceData.appendChild(row);
    });
  }

});

