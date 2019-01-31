export default function deleteItemsFromServerById(id) {
  fetch(`/tasks/delete`, {
    method: 'delete',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: `id=${id}`

  })
    .then(response => {
      if (response.status !== 200) {
        console.log(response.status);
      }
      console.log('-----in body', response);
    }).catch(err => {
    console.log('Fetch Error :', err);
  });
}