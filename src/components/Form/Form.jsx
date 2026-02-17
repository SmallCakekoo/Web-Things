import { useState } from 'react';

export const Form = () => {
  // Un solo estado según lo que dijo el profesor
  const [state, setState] = useState({ tasks: [], inputValue: '' }); // Arreglo Vacio para las tareas y valor del input

const addTask = (event) => {
  event.preventDefault();
  // En lugar de trim usaré la tarea vacia
  if (state.inputValue !== '') {
    setState({
      tasks: [...state.tasks, state.inputValue],
      inputValue: ''
    });
  }
};

const removeTask = (index) => {
  // Filtramos las tareas para eliminar la tarea en el índice que recibe, posicion del arreglo 
  setState({
    ...state,
    tasks: state.tasks.filter((_, i) => i !== index)
  });
};

  return (
    <>
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Add you task here"
          value={state.inputValue}
          onChange={(event) => setState({ ...state, inputValue: event.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {/* Se mapean las tareas para la lista. */}
        {state.tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => removeTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};
