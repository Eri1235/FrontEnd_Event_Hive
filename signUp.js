document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function(event) {
        event.preventDefault(); // Evita recarga de página

        const name = document.getElementById("fname").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        let profile = "Cliente";
        if (email === "admin@gmail.com") {
            profile = "Administrador";
        }

        // Verificar si el correo ya existe
        const checkResponse = await fetch(`http://localhost:4050/usuarios/verificar/${email}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const checkData = await checkResponse.json();
        if (!checkResponse.ok) {
            Swal.fire({
                icon: "error",
                title: "Correo ya registrado",
                text: checkData.message
            });
            return; // Detiene el registro si el correo está en uso
        }

        // Si el correo está disponible, proceder con el registro
        const userData = { user: name, email: email, password: password, profile: profile };

        try {
            const response = await fetch("http://localhost:4050/usuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Registro exitoso",
                    text: "Usuario registrado correctamente",
                    confirmButtonColor: "#8daa67"
                }).then(() => {
                    window.location.href = "login.html"; // Redirige al login
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error en el registro",
                    text: data.message
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: "error",
                title: "Error del servidor",
                text: "No se pudo conectar con el servidor."
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