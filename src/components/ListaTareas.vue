<script>
export default {
  data() {
    return {
      tareas: [],
      nuevaTarea: "",
    };
  },
  methods: {
    async cargarTareas() {
      try {
        const res = await fetch("http://localhost:3000/tareas");
        if (!res.ok) throw new Error("Error en la API");
        this.tareas = await res.json();
        console.log("Tareas cargadas:", this.tareas);
      } catch (error) {
        console.error("Error al cargar tareas:", error);
      }
    },
    async agregarTarea() {
      if (!this.nuevaTarea.trim()) return;

      const res = await fetch("http://localhost:3000/tareas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo: this.nuevaTarea }),
      });

      if (res.ok) {
        this.nuevaTarea = "";
        this.cargarTareas();
      }
    },
    async completarTarea(id) {
      const tarea = this.tareas.find(t => t.id === id);
      if (!tarea) return;

      const nuevoEstado = tarea.estado === "pendiente" ? "completada" : "pendiente";

      const res = await fetch(`http://localhost:3000/tareas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      if (res.ok) this.cargarTareas();
    },
    async eliminarTarea(id) {
      const confirmacion = confirm("¿Estás seguro de que deseas eliminar esta tarea?");
      if (!confirmacion) return;

      const res = await fetch(`http://localhost:3000/tareas/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        this.cargarTareas();
      } else {
        console.error("Error al eliminar la tarea");
      }
    }
  },
  mounted() {
    this.cargarTareas();
  },
};
</script>

<template>
  <div class="container">
    <h1>Lista de Tareas</h1>

    <div class="input-container">
      <input v-model="nuevaTarea" type="text" placeholder="Nueva tarea" />
      <button @click="agregarTarea">Agregar</button>
    </div>

    <ul>
      <li v-for="tarea in tareas" :key="tarea.id">
        <span :class="{ completada: tarea.estado === 'completada' }">
          {{ tarea.titulo }}
        </span>
        <button @click="completarTarea(tarea.id)"
          :class="{ 'btn-pendiente': tarea.estado === 'pendiente', 'btn-completada': tarea.estado === 'completada' }">
          {{ tarea.estado === "pendiente" ? "Pendiente" : "Completada" }}
        </button>
        <button @click="eliminarTarea(tarea.id)" class="btn-eliminar">
          Eliminar
        </button>
      </li>
    </ul>
  </div>
</template>