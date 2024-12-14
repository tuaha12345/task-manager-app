
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref([]);

  if (localStorage.getItem('tasks')) {
    tasks.value = JSON.parse(localStorage.getItem('tasks'));
  }

  // Save tasks to localStorage whenever tasks change
  const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks.value));
  };

  const addTask = (taskName) => {
    if (taskName.trim().length < 3) {
      throw new Error('Task name must be at least 3 characters long');
    }
    tasks.value.push({ name: taskName, completed: false });
    saveTasks();
  };

  const deleteTask = (index) => {
    tasks.value.splice(index, 1);
    saveTasks();
  };

  const toggleComplete = (index) => {
    tasks.value[index].completed = !tasks.value[index].completed;
    saveTasks();
  };

  const completedTasks = computed(() =>
    tasks.value.filter((task) => task.completed)
  );

  return { tasks, addTask, deleteTask, toggleComplete, completedTasks };
});
