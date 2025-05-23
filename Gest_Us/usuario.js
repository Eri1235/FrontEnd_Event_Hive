function cargarEventos(){
fetch("http://localhost:4050/usuarios")
    .then(function(respuestaTextoPlano){
        //La respuesta (OK o KO) la transformo en JSON
        return respuestaTextoPlano.json()
    })
    .then(function(data){
        //Gestionamos el OK con "data" que tendrá formato JSON
        //console.log(data)
        const tbody = document.getElementById("usuarios-body")
        for(let usuario of data){
            const row = document.createElement("tr")

            const idCell = document.createElement("td")
            idCell.innerText = usuario.idUser

            const userCell = document.createElement("td")
            userCell.innerText = usuario.user

             const emailCell = document.createElement("td")
            emailCell.innerText = usuario.email

            const perfilCell = document.createElement("td")
            perfilCell.innerText = usuario.profile
            

            //BOTONES
            const detallesCell = document.createElement("td")
            const detallesButton = document.createElement("button") //Botón ver
            detallesButton.innerText = "Ver"
            detallesButton.classList.add("btn-detalles");  //VER

            const editButton = document.createElement("button")
            editButton.innerText = "Editar"
            editButton.classList.add("btn-detalles", "btn-editar")

            const deleteButton = document.createElement("button")
            deleteButton.innerText = "Eliminar"
            deleteButton.classList.add("btn-detalles", "btn-eliminar")

            detallesButton.onclick = function(){
                window.location.href = "showUser.html?id=" + usuario.idUser
            }
            detallesCell.appendChild(detallesButton) //Funcion de ver


            editButton.onclick = function(){
                window.location.href = "editUser.html?id=" + usuario.idUser
            }
            detallesCell.appendChild(editButton) //Funcion de editar
            
            deleteButton.onclick = function(){
                eliminarUsuario(usuario.idUser) 
               } 
                detallesCell.appendChild(deleteButton)
    


            row.appendChild(idCell)
            row.appendChild(userCell)
            row.appendChild(emailCell)
            row.appendChild(perfilCell)
            row.appendChild(detallesCell)

            tbody.appendChild(row)


        }
    })
    .catch(function(error){
        //Gestionamos el KO con "error" que tendrá formato JSON
        console.log("Error al obtener los productos: ", error)
    })





}


function eliminarUsuario(id){
    Swal.fire({
        title:"¿Estás seguro?",
        text:`Eliminar usuario '${id}'.Esta acción no se puede deshacer`,
        icon:"warning",
        showCancelButton:true,
        confirmButtonText:"Sí, eliminar",
        cancelButtonText:"Cancelar"
    }).then(function(result){
        if(result.isConfirmed){
            fetch("http://localhost:4050/usuarios/" + id,{
                method:"DELETE",
            })
            .then(function(respuestaTextoPlano){
                return respuestaTextoPlano.json()
            })
            .then(function(data){
                
                console.log(data)
                if(data.message.includes("Error")){
                    Swal.fire({
                        title: "Error!",
                        text: data.message,
                        icon: "error"
                    })
                } else {
                Swal.fire({
                    title: "¡Eliminado!",
                    text: data.message,
                    icon: "success"
                }).then(function(){
                    window.location.reload(true)
                })
            }
            })
            .catch(function(error){
                console.error("Error en la eliminación:", error);
                Swal.fire({
                    title: "Error",
                    text: "No se pudo eliminar el usuario",
                    icon: "error"
                })
            })
        }
    })

    
}


cargarEventos()