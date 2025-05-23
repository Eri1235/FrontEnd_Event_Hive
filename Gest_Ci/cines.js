function cargarCines(){
    fetch("http://localhost:4050/cines")
        .then(function(respuestaTextoPlano){
            //La respuesta (OK o KO) la transformo en JSON
            return respuestaTextoPlano.json()
        })
        .then(function(data){
            //Gestionamos el OK con "data" que tendrá formato JSON
            //console.log(data)
            const tbody = document.getElementById("cines-body")
            for(let cine of data){
                const row = document.createElement("tr")
    
                const idCell = document.createElement("td")
                idCell.innerText = cine.idCines
    
                const nombreCell = document.createElement("td")
                nombreCell.innerText = cine.nombre
    
                const ubiCell = document.createElement("td")
                ubiCell.innerText = cine.ubicacion
    

                const detallesCell = document.createElement("td")
                const detallesButton = document.createElement("button") //Boton ver
                detallesButton.innerText = "Ver"
                detallesButton.classList.add("btn-detalles");  //VER
    

                const editButton = document.createElement("button")
                editButton.innerText = "Editar"
                editButton.classList.add("btn-detalles", "btn-editar")

                const deleteButton = document.createElement("button")
                deleteButton.innerText = "Eliminar"
                deleteButton.classList.add("btn-detalles", "btn-eliminar")

                detallesButton.onclick = function(){
                    window.location.href = "showCine.html?id=" + cine.idCines
                }
                detallesCell.appendChild(detallesButton)


               

                editButton.onclick = function(){
                    window.location.href = "editCine.html?id=" + cine.idCines
                }
                detallesCell.appendChild(editButton) //Funcion de editar



                deleteButton.onclick = function(){
                    eliminarCine(cine.idCines) 
                   } 
                detallesCell.appendChild(deleteButton) //Eliminar

                
                row.appendChild(idCell)
                row.appendChild(nombreCell)
                row.appendChild(ubiCell)
       
                row.appendChild(detallesCell)
    
                tbody.appendChild(row)
    
    
            }
        })
        .catch(function(error){
            //Gestionamos el KO con "error" que tendrá formato JSON
            console.log("Error al obtener los productos: ", error)
        })
    }

    function eliminarCine(id){
        Swal.fire({
            title:"¿Estás seguro?",
            text:`Eliminar cine '${id}'.Esta acción no se puede deshacer`,
            icon:"warning",
            showCancelButton:true,
            confirmButtonText:"Sí, eliminar",
            cancelButtonText:"Cancelar"
        }).then(function(result){
            if(result.isConfirmed){
                fetch("http://localhost:4050/cines/" + id,{
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
                        text: "No se pudo eliminar el cine",
                        icon: "error"
                    })
                })
            }
        })
    
        
    }
    
cargarCines()