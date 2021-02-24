class Staff { 
    constructor(name, dept, level, id){
        this.name = name
        this.dept = dept
        this.level = level
        this.id = id
    
   }
} 

class UI{
    addStaffToList(staff){
        const list = document.getElementById('details')
        //create tr element
        const row = document.createElement('tr')
        //insert cols
        row.innerHTML = `
        <td>${staff.name}</td>
        <td>${staff.dept}</td>
        <td>${staff.level}</td>
        <td>${staff.id}</td>
        <td><i class="delete material-icons">close</i></td>
        `
        list.appendChild(row)
    }
    showAlert(message, className){
            //create div
        const div = document.createElement('div')
        //add class
        div.className = `alert ${className}`
        //add text 
        div.appendChild(document.createTextNode(message))
        //get parent
        const container = document.querySelector('.container')
        //get form
        const form = document.querySelector('#form-id')
        //insert alert
        container.insertBefore(div, form)

        //set alert timeout
        setTimeout(function(){
            document.querySelector('.alert').remove()
        }, 3000)
    }
    deleteStaff(target){
        if(target.className === 'delete material-icons'){
            target.parentElement.parentElement.remove()
        }else{
            console.log('big no')
        }
    }
    clearFields(){
        document.getElementById('name').value = ''
        document.getElementById('dept').value = ''
        document.getElementById('level').value = ''
        document.getElementById('num').value = ''
        document.getElementById('details').value = ''
    }
}

//local storage
class Store{
    static getStaff(){
        let staffs
        if(localStorage.getItem('staffs') === null){
            staffs = []
        }else{
            staffs = JSON.parse(localStorage.getItem('staffs'))
        }
        return staffs
    }
    static displayStaffs(){
        const staffs = Store.getStaff()

        staffs.forEach((staff) => {
            const ui = new UI
            //add staff to ui
            ui.addStaffToList(staff)
        })
    }
    static addstaff(staff){
        const staffs = Store.getStaff()

        staffs.push(staff)

        localStorage.setItem('staffs', JSON.stringify(staffs))
    }
    static removestaff(id){
        const staffs = Store.getStaff()
        staffs.forEach((staff, index) => {
            if(staff.id === id){
                staffs.splice(index, 1)
            }
        })
        localStorage.setItem('staffs', JSON.stringify(staffs))
    }
}
    
//DOM load event
document.addEventListener('DOMContentLoaded', Store.displayStaffs)
 
//event listeners
document.getElementById('form-id').addEventListener('submit', 
    function(e){
        const name = document.getElementById('name').value,
               dept = document.getElementById('dept').value,
               level = document.getElementById('level').value
               id = document.getElementById('num').value

    // instantiate staff
    const staff = new Staff(name, dept, level, id)
    let invalid = document.querySelector('.invalid-feedback').
    value = 'invalid ID format'
    let re = /^ID-yt[0-9]{3}$/

    // instantiate UI
    const ui = new UI()

    //validate
    if(name === ''|| dept === '' || level === ''|| id === '' || !re.test(id)){
        //error alert
        ui.showAlert(`please fill in all field OR ${invalid}`, 'error')
    }
    else{
        
        // add staff to list
        ui.addStaffToList(staff)
        
        //add to LS
        Store.addstaff(staff)

        //show success
        ui.showAlert('Staff Registered!', 'success')

        //clear fields
        ui.clearFields()
    }

    e.preventDefault()
    
})

// details js
    function addDetailToList(staff){
                const list = document.getElementById('details2')
                //create tr element
                const row = document.createElement('tr')
                //insert cols
                row.innerHTML = `
                <td>${staff.name}</td>
                <td>${staff.dept}</td>
                <td>${staff.level}</td>
                <td>${staff.id}</td>
                `
                list.appendChild(row)
            }

class Details{
    static displayDetails(){
        const staffs = Store.getStaff()
        let id = document.getElementById('num2')
        staffs.forEach((staff, index) => {
            if(staff.id === id.value){
                staffs.splice(index, 1)
                //add staff
                addDetailToList(staff)
            }
        })
    }
}

//find my details event listener
document.getElementById('find').addEventListener('submit', function(e){
     let id = document.getElementById('num2')
     const staffs = Store.getStaff()

     for(let i = 0; i < staffs.length; i++){
            if(id.value === JSON.parse(localStorage.getItem('staffs'))[i].id ){

            Details.displayDetails()
        
         }
     }
    id.value = ''
   e.preventDefault()
})

//event listener for delete
document.querySelector('#details').addEventListener('click', function(e){
    // instantiate UI
    const ui = new UI()
    ui.deleteStaff(e.target)
    //remove from ls
    if(Store.removestaff(e.target.parentElement.previousElementSibling.textContent) === true){
            
        //show message
        ui.showAlert('Details Removed!', 'success')
    }

    e.preventDefault()
})  

function inUse(){
    const staffs = Store.getStaff()
    id = document.getElementById('num').value 
    const ui = new UI

    for(let i = 0; i < staffs.length; i++){
        if(id === JSON.parse(localStorage.getItem('staffs'))[i].id ){
            alert('ID already in use')
        }else{
            ui.deleteStaff()
            //Store.removestaff()
        }
    }   
}