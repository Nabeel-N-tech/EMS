 let nameem = document.getElementById('name')
 let job = document.getElementById('job')
 let salary = document.getElementById('salary')
 let btn = document.getElementById('btn')
 let tabledetails = document.getElementById('tabledetails')
 let tablebody = document.getElementById('tablebody')
 let edit=false;
 let editindex = -1;
 let search = document.getElementById('Searchemp')
 let dropdown = document.getElementById('dropdownmenu')


 let details = JSON.parse(localStorage.getItem('details')) || []
let filtered = [...details]

 btn.addEventListener('click',add)
 rendertable()

 function add(event){
    event.preventDefault();
    if(edit){
        updateemp(editindex)
    }
    else{
          let obj = {
        id:Date.now(),
        name:nameem.value,
        job:job.value,
        salary:salary.value
    }
    

    details.push(obj);
    }
    updateStorage()
    clearfields()
    rendertable()
    
    console.log(details);
 }

function rendertable() {
    tablebody.innerHTML = ""; 
    filtered.forEach(x => {
        tablebody.innerHTML += `
        <tr>
            <td>${x.name}</td>
            <td>${x.job}</td>
            <td>${x.salary}</td>
        <td>
            <button class="editbtn" onclick="setedit(${x.id})">${x.id === editindex ? 'Cancel' : 'Edit'}</button>
            <button class="deletebtn" onclick="deletedetails(${x.id})">Delete</button>
        </td>

        </tr>
        `;
    });
    
}

function deletedetails(id){
    let okaytodelete = confirm('Are you sugar')
    if(!okaytodelete){
        return alert('cancelled')
    }
    details = details.filter((item) => item.id !== id)
    updateStorage()
    clearfields()
    rendertable()
}

function clearfields(){
    nameem.value = ''
    job.value = ''
    salary.value = ''
}

function setedit(id){
    if(edit){
        edit =false;
        btn.innerText = 'Save'
        editindex = -1;
        clearfields()
        rendertable()
        return
    }
    edit = true;
    editindex = id;
    btn.innerText = 'Update'
    rendertable()
    let emp = details.find(x => x.id === id)
    nameem.value = emp.name
    job.value = emp.job
    salary.value = emp.salary
    updateStorage()
}

function updateemp(id){
    let emp = details.find(x => x.id === id)
    let index = details.indexOf(emp)
    details[index] = {
        ...emp,
        name:nameem.value,
        job:job.value,
        salary:salary.value
    }
    updateStorage()
    rendertable()
    edit = false;
    btn.innerText = 'Save'
    editindex = -1;
}

function updateStorage(){
    localStorage.setItem('details',JSON.stringify(details));
    filtered = [...details]
}

function searchemp(q){
    let query = q.toLowerCase();
    filtered = details.filter((x) => x.name.toLowerCase().includes(query) ||x.job.toLowerCase().includes(query))
    rendertable()
}

      
search.addEventListener('input',() => {
    searchemp(search.value)
})

function Dropdown() {
    let jobs = [...new Set(details.map(emp => emp.job))];
    dropdown.innerHTML = `<option value="">All Jobs</option>`;
    jobs.forEach(job => {
        let option = document.createElement('option');
        option.value = job;
        option.textContent = job;
        dropdown.append(option);
    });
}

dropdown.addEventListener('change', () => {
    let selected = dropdown.value;
    if (selected === "") {
        filtered = [...details]; 
    } else {
        filtered = details.filter(emp => emp.job === selected);
    }
    rendertable();
});

Dropdown();