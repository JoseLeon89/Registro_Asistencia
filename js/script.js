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

  /*function sendDataToGoogleSheets(data) {
    const CLIENT_ID = '605654995521-f9i5hm6hdr3a8v84buovmu0mhnicuq7a.apps.googleusercontent.com'; // Reemplazar con tu Client ID -- 605654995521-f9i5hm6hdr3a8v84buovmu0mhnicuq7a.apps.googleusercontent.com
    const API_KEY = 'AIzaSyBe4VwkRxXlEU_-7csJZlDR8LJSS6Lx-c8'; // Reemplazar con tu API Key -- AIzaSyBe4VwkRxXlEU_-7csJZlDR8LJSS6Lx-c8
    const SPREADSHEET_ID = '11C_ceKA-nH7wpynVdzuLt14Ek_VEG2ruaudM86Gc03Y'; // Reemplazar con tu ID de hoja de cálculo

    gapi.client.init({
      'apiKey': API_KEY,
      'clientId': CLIENT_ID,
      'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
      'scope': 'https://www.googleapis.com/auth/spreadsheets'
    }).then(function() {
      return gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1!A2', // Cambiar Sheet1 por el nombre de tu hoja y A1 por la celda donde quieres empezar a escribir
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [[
            data.name,
            data.email,
            data.dni,
            data.date,
            data.time
          ]]
        }
      });
    }).then(function(response) {
      console.log('Datos enviados a Google Sheets:', response);
      if (!spreadsheetId) {
        spreadsheetId = response.result.spreadsheetId;
      }
    });
  }*/

});

