
const form = document.getElementById("job-form");

form.addEventListener('submit',addJob)

function addJob(e) {
    e.preventDefault();
    // form validation can go here
  //  captures form data
    const jobForm = {
      name: document.getElementById('company').value.trim(),
      "job post":  document.getElementById('job-post').value.trim(),
      date: document.getElementById('date').value.trim(),
      role: document.getElementById('role').value.trim()
    }
    console.log(jobForm)
    
  

    
    fetch('/jobs',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
      },
      // parse object to JSON to send to server
      body: JSON.stringify(jobForm)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
      })
      .catch(error => {
        console.error('Error:', error);
      });
      form.reset()
}