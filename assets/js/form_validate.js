//const scriptURL = 'https://script.google.com/macros/s/AKfycbyHOhSV8j7i-RNE44GlsD_Ls2WRwk4KoYMO3vZRaWWGMQ-6h9TJMy4zI7rIF8M5tX5bjQ/exec';
const scriptURL = 'https://script.google.com/macros/s/AKfycbyZubP38IqjeXSJWz4racaHhiWigxIz7Lps8Sg4e2kwjUYXC_qhX3977ywWZQzU2MkY-g/exec';
const form=document.getElementById('regForm');
const username=document.getElementById('Name');
const cname=document.getElementById('College_Name');
const dept=document.getElementById('Department');
const email=document.getElementById('Mail-Id');
const contact = document.getElementById('Contact');
const tech = document.getElementById('Technical');
const nontech = document.getElementById('Non_Technical');
const tid = document.getElementById('Transaction_ID');
const loader = document.getElementById('loader');
const Batch_Year = document.getElementById('Batch_Year');
//const tt = document.getElementById('Tech_Team_Name');
// const ntt = document.getElementById('Non_Tech_Team_Name');

// form.addEventListener('submit',(e)=> {
//     if(!validateInputs()){
//         e.preventDefault();
//     }
//     else{
//     e.preventDefault()
//     fetch(scriptURL, {method : 'POST', body : new FormData(form)})
//     .then(response =>alert("Thank You! your form is submitted Successfully"))
//     .then(()=>{window.location.reload();})
//     .catch(error => console.error('Error!', error.message))
//     }
// })
form.addEventListener('submit', (e) => {
    if (!validateInputs()) {
        e.preventDefault();
    } else {
        e.preventDefault();
        // Show loading animation
        showLoader();

        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json(); // Assuming the server responds with JSON
            })
            .then(() => {
                alert("Thank You! Your form has been submitted successfully.");
                window.location.reload();
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert("There was an error submitting your form. Please try again.");
            })
            .finally(() => {
                // Hide loading animation if needed
                hideLoader();
            });
    }
});

// Functions to show/hide loader
function showLoader() {
    document.getElementById('loader').style.display = 'block';
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}

function validateInputs(){
    const usernameVal=username.value.trim();
    const cnameVal=cname.value.trim();
    const emailVal=email.value.trim();
    const contactVal = contact.value.trim();
    const deptVal=dept.value.trim();
    const techVal=tech.value.trim();
    const nontechVal=nontech.value.trim();
    const tidVal=tid.value.trim();
    const BatchVal=Batch_Year.value.trim();
    //const ttVal = tt.value.trim();
    // const nontechteamVal = nonteam_team.value.trim();

    let success = true;

    if(usernameVal===''){
        success = false;
        setError(username,'Name is required');
    }
    else{
        setSuccess(username);
    }


    if(cnameVal===''){
        success = false;
        setError(cname,'College Name is required');
    }
    else{
        setSuccess(cname);
    }


    if(emailVal===''){
        success = false;
        setError(email,'Email is required');
    }
    else if(!validateEmail(emailVal)){
        success = false;
        setError(email,'Please enter a valid email');
    }
    else{
        setSuccess(email);
    }

    if(contactVal===''){
        success = false;
        setError(contact,'Mobile No. is required');
    }
    else if (contactVal.length < 10 || contactVal.length > 10) {
        success = false;
        setError(contact, 'Enter valid mobile No');
    }
    else{
        setSuccess(contact);
    }

    if(deptVal===''){
        success = false;
        setError(dept,'Department is required');
    }
    else{
        setSuccess(dept);
    }
    if(BatchVal===''){
        success = false;
        setError(Batch_Year,'Year is required');
    }
    else{
        setSuccess(Batch_Year);
    }
    if(techVal===''){
        success = false;
        setError(tech,'Technical events is required otherwise select None options');
    }
    else{
        setSuccess(dept);
    }

    if(nontechVal===''){
        success = false;
        setError(nontech,'Non-Technical events is required otherwise select None options');
    }
    else{
        setSuccess(dept);
    }
    if (tidVal === '') {
        success = false;
        setError(tid, 'Transaction ID is required');
    }
    else if(tidVal.length <= 11){
        success = false;
        setError(tid, 'Enter valid UPI transaction ID');
    }
    
    else{
        setSuccess(tid);
    }


    // if (ttVal === '') {
    //     success = false;
    //     setError(tt, 'Team Name is required');
    // }
    // else{
    //     setSuccess(tt);
    // }
    // if (nontechteamVal === '') {
    //     success = false;
    //     setError(nonteam_team, 'Team Name is required');
    // }
    // else{
    //     setSuccess(nonteam_team);
    // }

    return success;
}
function setError(element,message){
    const inputGroup=element.parentElement;
    const errorElement=inputGroup.querySelector('.error');
    errorElement.innerText=message; 
};
function setSuccess(element){
    const inputGroup=element.parentElement;
    const errorElement=inputGroup.querySelector('.error');
    errorElement.innerText=''; 
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};


//extra field for tech team
let techParentEle = document.querySelector('.tech');
let nonTechParentEle = document.querySelector('.nonTech');

function techTeamField() {
    let x = document.getElementById('Technical').value;

    if ((x == 'Quiz') || (x == 'Paper_presentation')) {

        let removeEle = document.querySelector('.tech');
        while (removeEle.hasChildNodes()) {
            removeEle.removeChild(removeEle.firstChild);
        }

        let createInputBox = document.createElement('input');
        let createDiv = document.createElement('div');
        createInputBox.name = "Tech_Team_Name";
        createInputBox.className = "form-control Name";
        createInputBox.id = "Tech_Team_Name";
        createInputBox.placeholder = "Enter your team name for Technical event(Alphabets only allowed)";
        createDiv.className = "error text-danger";
        createInputBox.minLength = 5;
        createInputBox.pattern= "^[A-Za-zÀ-ÿ' ]+$";
        createInputBox.title="Team Name must only contain letters, spaces, or apostrophes.";
        createInputBox.required = true;
        techParentEle.appendChild(createInputBox);
        techParentEle.appendChild(createDiv);
        
        
    }
    else if ((x == 'None') || (x == 'Debugging')) {
        let removeEle = document.querySelector('.tech');
        while (removeEle.hasChildNodes()) {
            removeEle.removeChild(removeEle.firstChild);
        }
    }
    

}

//extra field for non-tech
function nonTechTeamField() {
    let y = document.getElementById('Non_Technical').value;

    if ((y == 'Connection') || (y == 'Treasure_Hunt')) {
        let removeEle = document.querySelector('.nonTech');
        while (removeEle.hasChildNodes()) {
            removeEle.removeChild(removeEle.firstChild);
        }

        let createInputBox = document.createElement('input');
        let createDiv = document.createElement('div');
        createInputBox.name = "Non_Tech_Team_Name";
        createInputBox.className = "form-control Name";
        createInputBox.id = "Non_Tech_Team_Name";
        createInputBox.placeholder = "Enter team name for Non-Technical Event(Alphabets only allowed)";
        createDiv.className = "error text-danger";
        createInputBox.pattern= "^[A-Za-zÀ-ÿ' ]+$";
        createInputBox.title="Team Name must only contain letters, spaces, or apostrophes.";
        createInputBox.minLength = 4;
        createInputBox.required = true;
        nonTechParentEle.appendChild(createInputBox);
        nonTechParentEle.appendChild(createDiv);
      
    }
   else if(y == 'As_you_like_it'){
    let removeEle = document.querySelector('.nonTech');
        while (removeEle.hasChildNodes()) {
            removeEle.removeChild(removeEle.firstChild);
        }
        let createPtag= document.createElement('p');
        createPtag.innerHTML="Please enter your team name along with your event name Eg:(Dancing); if you're participating individually, type 'solo'. ";
        createPtag.style="color:#f1a32d; font-weight: 600; font-size: 1.5rem; text-align:left;";
        removeEle.append(createPtag);
        let createInputBox = document.createElement('input');
        let createDiv = document.createElement('div');
        createInputBox.name = "Non_Tech_Team_Name";
        createInputBox.className = "form-control Name";
        createInputBox.id = "Non_Tech_Team_Name";        
        createInputBox.placeholder = "Enter team name for Non-Technical Event(Alphabets only allowed)";
        createDiv.className = "error text-danger";
        createInputBox.pattern= "^[A-Za-zÀ-ÿ'() ]+$";
        createInputBox.title="Team Name must only contain letters, spaces, Brackets or apostrophes.";
        createInputBox.minLength = 4;
        createInputBox.required = true;
        nonTechParentEle.appendChild(createInputBox);
        nonTechParentEle.appendChild(createDiv);
   }
    else if ((y == 'None')) {
        let removeEle = document.querySelector('.nonTech');
        while (removeEle.hasChildNodes()) {
            removeEle.removeChild(removeEle.firstChild);
        }
    }
}

// Disable right-click
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

// Disable F12 and developer tools
document.addEventListener('keydown', function(event) {
    // F12 key
    if (event.keyCode == 123) {
        event.preventDefault();
    }
    // Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U (view source)
    if ((event.ctrlKey && event.shiftKey && (event.keyCode == 73 || event.keyCode == 74)) || 
        (event.ctrlKey && event.keyCode == 85)) {
        event.preventDefault();
    }
});

// Prevent print screen by blurring content
document.addEventListener('keyup', function(event) {
    if (event.key === "PrintScreen") {
        alert("Screenshots are not allowed!");
        document.body.style.filter = "blur(10px)";
        setTimeout(() => {
            document.body.style.filter = "none";
        }, 1000);
    }
});

// Disable copying with JavaScript
document.addEventListener('copy', function(event) {
    event.preventDefault();
    alert("Copying text is not allowed!");
});