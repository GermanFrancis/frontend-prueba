<script setup>
import { defineProps, defineEmits } from "vue";
const emit = defineEmits(["completarTarea", "eliminarTarea"]);
defineProps({ tarea: Object });

const completarTarea = (id) => {
  emit("completarTarea", id);
};
const eliminarTarea = (id) => {
  emit("eliminarTarea", id);
};
</script>

<template>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    {{ tarea.titulo }}
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <button @click="completarTarea(tarea.id)"
        :class="{ 'btn btn-warning': tarea.estado === 'pendiente', 'btn btn-success': tarea.estado === 'completada' }">
        {{ tarea.estado === "pendiente" ? "Pendiente" : "Completada" }}
      </button>
      <button @click="eliminarTarea(tarea.id)" class="btn btn-danger">
        <i class="bi bi-trash3-fill"></i>
      </button>
    </div>
  </li>
</template>