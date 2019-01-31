export default function updateItemFromServerById(checked, text, id) {
  let body = "";
  if (!Array.isArray(id)) {
    body = `text=${text}&check=${checked}&id=${id}`;
  } else {
    body = `check=${checked}&id=${id}`;
  }
  fetch(`/tasks/update`, {
    method: 'put',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: body,
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