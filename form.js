
const form = document.getElementById('inventario');
const nameinput = document.getElementById('nameinput');
const brandinput = document.getElementById('brandinput');
const numberinput = document.getElementById('numberinput');




const tablebody = document.getElementById('tablebody');
let data = JSON.parse(localStorage.getItem('formData')) || []; 

form.addEventListener('submit', function(event){
    event.preventDefault();
    const name = nameinput.value;
    const brand = brandinput.value;
    const number = numberinput.value;
    if(name && brand && number){
        const newData = {name,brand,number};
        data.push(newData);
        saveDataToLocalStorage();
        renderTable();
  
        form.reset();
    }else{
    alert ('Rellena todos los campos');
    }
})

//-----------------------------------------------------------------------------------------------------------//

function saveDataToLocalStorage(){
    localStorage.setItem('formData', JSON.stringify(data));
}

function renderTable(){
    tablebody.innerHTML = '';

  
    data.forEach (function (item, index){
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const brandCell = document.createElement('td');
        const numberCell = document.createElement('td');
        const actionCell = document.createElement('td');

   
        const editButton = document.createElement('button')
        const deleteButton = document.createElement('button')
    

        nameCell.textContent = item.name;
        brandCell.textContent = item.brand;
        numberCell.textContent = item.number;

    
        editButton.textContent = 'Editar';
        deleteButton.textContent = 'Borrar';

    // Clases Boton
        editButton.classList.add('button', 'button--secundary');
        deleteButton.classList.add('button', 'button--terciary');

  
        editButton.addEventListener('click', function(){
            editData(index);
        })

        deleteButton.addEventListener('click', function(){
            deleteData(index);
        })

        
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

       
        row.appendChild(nameCell);
        row.appendChild(brandCell);
        row.appendChild(numberCell);
        row.appendChild(actionCell);

       
        tablebody.appendChild(row);

    })  
}


function editData(index){
    const item = data[index];
    nameinput.value = item.name;
    brandinput.value = item.brand;
    numberinput.value = item.number;
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

function deleteData(index){
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

renderTable();