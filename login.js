document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Hacer solicitud al backend con email y password en la URL
        const response = await fetch(`http://localhost:4050/usuarios/login?email=${email}&password=${password}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        console.log("Respuesta del servidor:", data); // Verifica qué devuelve el backend

        if (response.ok && data.idUser) {
            localStorage.setItem("idUser", data.idUser);
            localStorage.setItem("user", data.user);
            localStorage.setItem("email", data.email);

            Swal.fire({
                icon: "success",
                title: "Inicio de sesión exitoso",
                text: "Has iniciado sesión como: "+ data.user,
                confirmButtonColor: "#8daa67"
            }).then(() => {
                window.location.href = "perfil.html"; // Redirige al perfil
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error de autenticación",
                text: data.message || "Credenciales incorrectas. Inténtalo de nuevo.",
                confirmButtonColor: "#ff4b5c"
            });
        }
    });
});

document.getElementById("togglePassword").addEventListener("click", function() {
    const passwordInput = document.getElementById("password");
    
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        this.textContent = "🙈 Ocultar"; // Cambia el texto del botón
    } else {
        passwordInput.type = "password";
        this.textContent = "👁 Mostrar";
    }
});


document.addEventListener("DOMContentLoaded", function() {
    document.body.classList.add("loaded");
});