function abrirFormulario(){
    let htmlModal = document.getElementById("modal");
    htmlModal.setAttribute("class","modale opened");
}

function agregar(){
    clean();
    abrirFormulario();
}

var customers = []

function clean(){
    document.getElementById('txtFirstName').value = ''
    document.getElementById('txtLastName').value = ''
    document.getElementById('txtEmail').value = ''
    document.getElementById('txtPhone').value = ''
    document.getElementById('txtAddress').value = ''
    document.getElementById('txtId').value = ''
}

function cerrarModal(){
    let htmlModal = document.getElementById("modal");
    htmlModal.setAttribute("class","modale");
}

document.addEventListener("DOMContentLoaded", init);

const URL_API = 'http://bavt-api-customers.somee.com/api/';

function init(){
    search();
}

async function search() {
    
    var url = URL_API + 'customer'
    var response = await fetch(url, {
        "method": "GET",
        "headers": {
            accept: 'application/json',
            "Content-Type": 'application/json'
        }
    })

    customers = await response.json();

    var html = '';
    for(customer of customers){
        var row = `<tr>
    <td>
        ${customer.firstName}
    </td>
    <td>
    ${customer.lastName}
    </td>
    <td>
    ${customer.email}
    </td>
    <td>
    ${customer.phone}
    </td>
    <td>
        <a onclick="remove(${customer.id})" class="btnEliminar" href="#">Eliminar</a>
        <a onclick=edit(${customer.id}) class="btnEditar" href="#">Editar</a>
    </td>
</tr>`         
;
    html += row;
    }
    document.querySelector('#customers > tbody').outerHTML = html;
}

function edit(id){
    abrirFormulario();
    var customer = customers.find(x => x.id ==id);
    document.getElementById('txtFirstName').value = customer.firstName;  
    document.getElementById('txtLastName').value = customer.lastName;
    document.getElementById('txtEmail').value = customer.email;
    document.getElementById('txtPhone').value = customer.phone;
    document.getElementById('txtAddress').value = customer.address;
    document.getElementById('txtId').value = customer.id;

}

async function remove(id){
    respuesta = confirm('¿Desea eliminar el registro?');

    if(respuesta){
        var url = URL_API + 'customer/' + id;
        await fetch(url, {
        "method": "DELETE",
        "headers": {
            "Content-Type": 'application/json'
        }
        })
        window.location.reload();
    }
}

async function save(){


    var data = {
        "firstName": document.getElementById('txtFirstName').value,
        "lastName": document.getElementById('txtLastName').value,
        "email": document.getElementById('txtEmail').value,
        "phone": document.getElementById('txtPhone').value,
        "address": document.getElementById('txtAddress').value
    }

    var id = document.getElementById('txtId').value;

    if(id != ''){
        data.id = id;
    }

    var url = URL_API + 'customer'
    await fetch(url, {
    "method": id != '' ? 'PUT' : "POST",
    "body": JSON.stringify(data),
    "headers": {
        "Content-Type": 'application/json'
    }
    })
    window.location.reload();
}
