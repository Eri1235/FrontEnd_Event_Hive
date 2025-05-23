document.addEventListener("DOMContentLoaded", async function() {
    try {
        const idUser = localStorage.getItem("idUser");

        if (!idUser) {
            Swal.fire({
                icon: "error",
                title: "Sesión no iniciada",
                text: "No has iniciado sesión.",
                confirmButtonColor: "#ff4b5c"
            }).then(() => {
                window.location.href = "login.html";
            });
            return;
        }

        // 🔹 Obtener los datos del usuario autenticado
        const response = await fetch(`http://localhost:4050/usuarios/usuario/${idUser}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const user = await response.json();

        if (response.ok && user) {
            document.getElementById("username").textContent = user.user || "Nombre no disponible";
            document.getElementById("useremail").textContent = user.email || "Email no disponible";
            document.getElementById("profile").textContent = user.profile || "Perfil no disponible";

            // 🔹 Verificar si el usuario tiene una foto guardada en la BD
            const avatarImg = document.getElementById("avatar");
            if (user.foto && user.foto !== "null") {
                avatarImg.src = user.foto; // Usar la imagen guardada
                localStorage.setItem("userPhoto", user.foto);
            } else {
                avatarImg.src = "images/Event-Hive.png"; // Imagen por defecto si `foto` es null
            }

            // Si el perfil es "Administrador", muestra los botones
            if (user.profile === "Administrador") {
                adminButtons.style.display = "flex"; // 🔹 Se hace visible solo para admin
            } else {
                adminButtons.style.display = "none"; // 🔹 Se mantiene oculto para otros perfiles
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error al obtener el perfil.",
                confirmButtonColor: "#ff4b5c"
            });
        }
    } catch (error) {
        console.error("Error:", error);
        Swal.fire({
            icon: "error",
            title: "Error de conexión",
            text: "No se pudo conectar con el servidor.",
            confirmButtonColor: "#ff4b5c"
        });
    }
});
document.getElementById("changeAvatarBtn").addEventListener("click", function() {
    Swal.fire({
        title: "Introduce la URL de tu imagen",
        input: "text",
        inputPlaceholder: "Ejemplo: https://misitio.com/imagen.jpg",
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        inputValidator: (value) => {
            if (!value || !value.startsWith("http")) {
                return "Por favor, introduce una URL válida";
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const avatarImg = document.getElementById("avatar");
            avatarImg.src = result.value;
            localStorage.setItem("userPhoto", result.value); // Guarda la URL en localStorage

            // 🔹 Enviar la URL al backend para guardarla
            const idUser = localStorage.getItem("idUser");
            fetch(`http://localhost:4050/usuarios/usuario/${idUser}/foto`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ foto: result.value }) // Guardar la URL en la BD
            })
            .then(response => response.json())
            .then(data => {
                console.log("Foto actualizada en la base de datos:", data);
                Swal.fire({
                    title: "¡Foto actualizada!",
                    text: "Tu imagen de perfil se ha guardado correctamente.",
                    icon: "success"
                });
            })
            .catch(error => {
                console.error("Error al actualizar la imagen en la BD:", error);
                Swal.fire({
                    title: "Error!",
                    text: "No se pudo actualizar la imagen en la base de datos.",
                    icon: "error"
                });
            });
        }
    });
});

// 🔹 Cargar la foto guardada en localStorage o usar la por defecto
document.addEventListener("DOMContentLoaded", () => {
    const avatarImg = document.getElementById("avatar");
    const storedPhoto = localStorage.getItem("userPhoto");

    if (storedPhoto && storedPhoto !== "null") {
        avatarImg.src = storedPhoto;
    } else {
        avatarImg.src = "images/Event-Hive.png"; // Imagen por defecto
    }
});



function logout() {
    localStorage.removeItem("idUser");
    window.location.href = "login.html";
}