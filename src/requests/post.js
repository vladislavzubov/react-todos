export default function unloadNewTaskOnServer(task) {
  fetch('/tasks/create', {
    method: 'post',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: `text=${task.text}&check=${task.checked}&id=${task.id}`
  })
    .then(response => {
      if (response.status !== 200) {
        console.log(response.status);
      }
      console.log('------response in post:', response);
    })
    .catch(err => {
      console.log('Fetch Error :', err);
    });
}