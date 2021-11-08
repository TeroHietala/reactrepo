import './App.css';
import {useEffect,useState} from 'react';
import axios from 'axios';

const URL = 'http://localhost/ostoslista2/';

function App() {
 const [tasks, setTasks] = useState([]);
 const [task, setTask] = useState('');
 const [amo, setAmo] = useState('');


 useEffect(()=> {
  axios.get(URL)
     .then((response) => {
       setTasks(response.data)
     }).catch(error => {
       alert(error.response ? error.response.data.error : error);
     })
 }, [])

 function save(e) {
     e.preventDefault();
     const json = JSON.stringify({description:task, amount:amo})
     axios.post(URL + 'add.php',json,{
       headers: {
         'Content-Type' : 'application/json'
        }
     })
     
     .then((response) => {
       setTasks(tasks => [...tasks,response.data]);
       setTask('');
       setAmo('');
     }).catch (error => {
       alert(error.response.data.error)
     });
  }

  function remove(id) {
    const json = JSON.stringify({id:id})
    axios.post(URL + 'delete.php',json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
      .then((response) => {
        const newListWithoutRemoved = tasks.filter((item) => item.id !== id);
        setTasks(newListWithoutRemoved);
      }).catch (error => {
        alert(error.response ? error.response.data.error : error);
      });
  }

  return (
    <div className="container">
      <h3>Shopping list</h3>
      <form onSubmit={save}>
      <input placeholder="type description" value={task} onChange={e => setTask(e.target.value)} />
      <input placeholder="type amount" value={amo} onChange={e => setAmo(e.target.value)} />
      <button>Add</button>
      </form>
      <ul>
         
        {tasks?.map(task => (
        <li key={task.id}>
          {task.description} {task.amount}&nbsp;
          <a href="/#" className="delete" onClick={() => remove(task.id)}>
            Delete
          </a>
        </li>
        ))}
    </ul>
    </div>
  );
}

export default App;