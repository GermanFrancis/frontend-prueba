import { ref } from "vue";
import { API_URL } from "../config.js";

const tareas = ref([]);

const cargarTareas = async () => {
  try {
    const res = await fetch(`${API_URL}/tareas`);
    if (!res.ok) throw new Error("Error en la API");
    tareas.value = await res.json();
  } catch (error) {
    console.error("Error al cargar tareas:", error);
  }
};

const agregarTarea = async (nuevaTarea) => {
  if (!nuevaTarea.trim()) return;

  const res = await fetch(`${API_URL}/tareas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo: nuevaTarea }),
  });

  if (res.ok) {
    await cargarTareas(); 
  }
};

const completarTarea = async (id) => {
  const tarea = tareas.value.find((t) => t.id === id);
  if (!tarea) return;

  const nuevoEstado = tarea.estado === "pendiente" ? "completada" : "pendiente";

  const res = await fetch(`${API_URL}/tareas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado: nuevoEstado }),
  });

  if (res.ok) await cargarTareas();
};

const eliminarTarea = async (id) => {
  const confirmacion = confirm("¿Estás seguro de que deseas eliminar esta tarea?");
  if (!confirmacion) return;

  const res = await fetch(`${API_URL}/tareas/${id}`, {
    method: "DELETE",
  });

  if (res.ok) await cargarTareas();
};

export { tareas, cargarTareas, agregarTarea, completarTarea, eliminarTarea };