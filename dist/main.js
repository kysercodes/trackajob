
const form = document.getElementById("job-form");
const deletButton = document.querySelector("delete-btn");
const jobItems = document.querySelectorAll('.job');

form.addEventListener('submit',addJob)
// deletButton.addEventListener('click',deleteJob)

function addJob(e) {
    e.preventDefault();
    // form validation can go here
  //  captures form data
    const jobForm = {
      name: document.getElementById('company').value.trim(),
      "job post":  document.getElementById('job-post').value.trim(),
      date: document.getElementById('date').value.trim(),
      role: document.getElementById('role').value.trim(),
      status: document.getElementById('status').value.trim()
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
      window.location.reload();

} 

document.querySelector('.jobs').addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('delete-btn')) {
    deleteJob(e);
  }
});

function deleteJob(e) {
  const jobItem = e.target.closest('.job');
  const jobId = jobItem.getAttribute('data-job-id'); // Assuming each job has a data attribute for its ID

  if (confirm('Are you sure you want to delete this job?')) {
    fetch(`/jobs/${jobId}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        jobItem.remove(); // Only remove the job item from the DOM after successful deletion from the server
      })
      .catch(error => console.error('Error:', error));
  }
}

// jobItems.forEach(job => {
//   const statusButton = job.querySelector('button:first-of-type');
//   const statusDropdown = job.querySelector('div div');

//   statusButton.addEventListener('click', () => {
//     statusDropdown.classList.toggle('hidden');
//   });
// });