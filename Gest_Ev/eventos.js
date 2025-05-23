function cargarEventos(){
    fetch("http://localhost:4050/eventos")
        .then(function(respuestaTextoPlano){
            //La respuesta (OK o KO) la transformo en JSON
            return respuestaTextoPlano.json()
        })
        .then(function(data){
            //Gestionamos el OK con "data" que tendrá formato JSON
            //console.log(data)
            const tbody = document.getElementById("eventos-body")
            for(let evento of data){
                const row = document.createElement("tr")
    
                const idCell = document.createElement("td")
                idCell.innerText = evento.idEvent
    
                const nombreCell = document.createElement("td")
                nombreCell.innerText = evento.eventName
    
                const tipoCell = document.createElement("td")
                tipoCell.innerText = evento.eventType
    
                const fechaCell = document.createElement("td")
                fechaCell.innerText = evento.date
    
                const localizacionCell = document.createElement("td")
                localizacionCell.innerText = evento.location

                const organizadorCell = document.createElement("td")
                organizadorCell.innerText = evento.organizerName;
    
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
                    window.location.href = "showEvent.html?id=" + evento.idEvent
                }
                detallesCell.appendChild(detallesButton)


               

                editButton.onclick = function(){
                    window.location.href = "editEvent.html?id=" + evento.idEvent
                }
                detallesCell.appendChild(editButton) //Funcion de editar



                deleteButton.onclick = function(){
                    eliminarEvento(evento.idEvent) 
                   } 
                detallesCell.appendChild(deleteButton) //Eliminar

                
                row.appendChild(idCell)
                row.appendChild(nombreCell)
                row.appendChild(tipoCell)
                row.appendChild(fechaCell)
                row.appendChild(localizacionCell)
                row.appendChild(organizadorCell)
                row.appendChild(detallesCell)
    
                tbody.appendChild(row)
    
    
            }
        })
        .catch(function(error){
            //Gestionamos el KO con "error" que tendrá formato JSON
            console.log("Error al obtener los productos: ", error)
        })
    }

    function eliminarEvento(id){
        Swal.fire({
            title:"¿Estás seguro?",
            text:`Eliminar evento '${id}'.Esta acción no se puede deshacer`,
            icon:"warning",
            showCancelButton:true,
            confirmButtonText:"Sí, eliminar",
            cancelButtonText:"Cancelar"
        }).then(function(result){
            if(result.isConfirmed){
                fetch("http://localhost:4050/eventos/" + id,{
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
                        text: "No se pudo eliminar el evento",
                        icon: "error"
                    })
                })
            }
        })
    
        
    }
    
cargarEventos()