'use client';

//import { headers } from "next/headers";
import { useState, useEffect } from "react";
import './globals.css';


export default function Home() {            //pagina inicial home
  const [tasks, setTasks] = useState([]); //constante para colocara tarefa
  const [newTask, setNewTask] = useState('');// configurar tarefa

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:3001/tasks');
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  },[]);

  const addTask = async () => {
    await fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: newTask }),
    });
    setNewTask('');
    fetchTasks();
  };

  const markAsDone = async (id) => {
    await fetch(`http://localhost:3001/tasks/${id}`, { method: 'PATCH' });

    fetchTasks();
  };
  return (
    <div >
      <h1>Gerenciador de Tarefas</h1>
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="Digite uma nova tarefa"
        />

      <button onClick={addTask}>Adicionar Tarefa</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.done ? 'line-through' : 'none',
              }}
              >
                {task.id + " - "} {task.task + " "}
            </span>
            <button onClick={() => markAsDone(task.id)}>
              Marcar como Feita
            </button>    
          </li>
        ))} 
      </ul>

    </div>
  );
}
