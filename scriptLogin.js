//Login admin y Usuario
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin123') {
        window.location.href = 'admin.html';
    } else if (username === 'alumno' && password === 'alumno') {
        window.location.href = 'user.html';
    } else {
        document.getElementById('message').textContent = 'Usuario o contraseña incorrectos';
    }
});
