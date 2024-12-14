<template>
    <div class="task-list">
      <button @click="toggleForm" class="add-button">{{ showForm ? 'Hide Add Task Form' : 'Show Add Task Form' }}</button>

      <div v-if="showForm">
        <input
          v-model="newTask"
          type="text"
          placeholder="Enter task name"
        />
        <button @click="addNewTask" class="add-button">Add Task</button>
      </div>

      <p v-if="tasks.length === 0">No tasks available</p>

      <ul>
        <li
          v-for="(task, index) in tasks"
          :key="index"
          :style="taskStyle(task)"
        >
          {{ task.name }}
          <button @click="toggleComplete(index)">
            {{ task.completed ? "Undo" : "Complete" }}
          </button>
          <button @click="deleteTask(index)" class="delete-button">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { useTaskStore } from '../stores/taskStore';
  import { ref } from 'vue';
  
  export default {
    name: 'TaskList',
    setup() {
      const taskStore = useTaskStore();
      const { tasks, addTask, deleteTask, toggleComplete, completedTasks } = taskStore;
  
      const newTask = ref('');
      const showForm = ref(false);

      const addNewTask = () => {
        try {
          addTask(newTask.value);
          newTask.value = '';
        } catch (error) {
          alert(error.message);
        }
      };
  

      const toggleForm = () => {
        showForm.value = !showForm.value;
      };
  
      const taskStyle = (task) => ({
        backgroundColor: task.completed ? 'lightgreen' : 'white',
        border: task.completed ? '2px solid red' : '1px solid black',
      });
  


  
      return {
        tasks,
        newTask,
        showForm,
        addNewTask,
        deleteTask,
        toggleComplete,
        toggleForm,
        taskStyle,
        completedTasks,
      };
    },
  };
  </script>
  
  <style scoped>
  .task-list {
    margin: 20px auto;
    max-width: 500px;
    text-align: center;
  }
  input {
    margin: 10px 0;
  }
  button {
    margin: 5px;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
    color: white;
    text-weight: bold;
    background-color:#358732;
  }
  .add-button {
    background-color:rgb(8, 105, 150);
  }
  .delete-button {
    background-color: rgb(228, 65, 65);
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin: 5px 0;
    padding: 10px;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  </style>
  