const scriptURL = 'https://script.google.com/macros/s/AKfycbyHOhSV8j7i-RNE44GlsD_Ls2WRwk4KoYMO3vZRaWWGMQ-6h9TJMy4zI7rIF8M5tX5bjQ/exec';
const form=document.getElementById('regForm');
const username=document.getElementById('Name');
const cname=document.getElementById('College_Name');
const dept=document.getElementById('Department');
const email=document.getElementById('Mail-Id');
const contact = document.getElementById('Contact');
const tech = document.getElementById('Technical');
const nontech = document.getElementById('Non_Technical');
const tid = document.getElementById('Transaction_ID');

form.addEventListener('submit',(e)=> {
    if(!validateInputs()){
        e.preventDefault();
    }
    else{
    e.preventDefault()
    fetch(scriptURL, {method : 'POST', body : new FormData(form)})
    .then(response =>alert("Thank You! your form is submitted Successfully"))
    .then(()=>{window.location.reload();})
    .catch(error => console.error('Error!', error.message))
    }
})
function validateInputs(){
    const usernameVal=username.value.trim();
    const cnameVal=cname.value.trim();
    const emailVal=email.value.trim();
    const contactVal = contact.value.trim();
    const deptVal=dept.value.trim();
    const techVal=tech.value.trim();
    const nontechVal=nontech.value.trim();
    const tidVal=tid.value.trim();
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
     else if (tidVal.length < 12 || tidVal.length > 12 ) {
        success = false;
        setError(tid, 'Invalid Transaction ID format, it contains 12 digits');
    }
    else{
        setSuccess(tid);
    }

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
