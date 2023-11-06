
const form = document.getElementById("job-form");

form.addEventListener('submit',addJob)

function addJob(e) {
    e.preventDefault();
    
    const formData = new FormData(form)
for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
}
    console.log('wazzuuup')
    fetch('/jobs',{
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
      })
      .catch(error => {
        console.error('Error:', error);
      });
}