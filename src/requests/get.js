export default function setAllTasksFromServer(component) {

  fetch('/tasks/')
    .then(response => {
      console.log('------response:', response);
      if (response.status !== 200) {
        console.log(response.status);
        return;
      }
      response.json()
        .then(data => {
          const tasks = data.map(item => {
            return {
              checked: item.check,
              text: item.text,
              id: item.id,
            };
          }).reverse();

          let count = 0;
          if (tasks.length) {
            tasks.forEach(item => {
              if (item.checked) {
                count++;
              }
            });
          }

          component.setState({ items: tasks, checkedFlag: count });
        });
    })
    .catch(err => {
      console.log('Fetch Error :', err);
    });
}
