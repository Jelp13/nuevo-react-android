import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        { 
          id: Date.now(),
          text: newTask, 
          completed: false, 
          date: selectedDate || null,
          createdAt: new Date()
        }
      ]);
      setNewTask("");
      setSelectedDate("");
    }
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Hoy";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Mañana";
    } else {
      return date.toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'short' 
      });
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="app-container">
      <div className="app">
        {/* Header */}
        <div className="header">
          <h1 className="title">To Do List</h1>
          <p className="subtitle">Organiza tu día de manera inteligente</p>
          
          {totalTasks > 0 && (
            <div className="progress-container">
              <span className="progress-text">
                {completedTasks} de {totalTasks} completadas
              </span>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="form-container">
          <div className="input-group">
            <input
              type="text"
              placeholder="Agrega una nueva tarea"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              className="task-input"
            />
          </div>
          
          <div className="form-controls">
            <div className="date-container">
              <span className="date-icon">📅</span>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="date-input"
              />
            </div>
            
            <button
              onClick={addTask}
              disabled={!newTask.trim()}
              className="add-button"
            >
              <span className="add-icon">+</span>
              Agregar
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="tasks-container">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <p className="empty-title">No tienes tareas registradas</p>
              <p className="empty-subtitle">¡Agrega tu primera tarea para comenzar!</p>
            </div>
          ) : (
            <div className="tasks-list">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`task-item ${task.completed ? 'completed' : ''}`}
                >
                  <div className="task-content">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`check-button ${task.completed ? 'checked' : ''}`}
                    >
                      {task.completed && <span className="check-icon">✓</span>}
                    </button>
                    
                    <div className="task-info">
                      <p className="task-text">{task.text}</p>
                      {task.date && (
                        <div className="task-date">
                          <span className="clock-icon">⏰</span>
                          <span>{formatDate(task.date)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeTask(task.id)}
                    className="delete-button"
                  >
                    <span className="delete-icon">✖</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;