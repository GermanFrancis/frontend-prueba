<script setup>
import { defineProps } from "vue";

defineProps({
  tarea: Object,
  completarTarea: Function,
  eliminarTarea: Function,
});
</script>

<template>
  <li class="list-group-item">
    <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox">
    <label class="form-check-label" for="firstCheckbox">{{ tarea.titulo }}</label>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <button @click="completarTarea(tarea.id)"
        :class="{ 'btn btn-warning': tarea.estado === 'pendiente', 'btn btn-success': tarea.estado === 'completada' }">
        {{ tarea.estado === "pendiente" ? "Pendiente" : "Completada" }}
      </button>
      <button @click="eliminarTarea(tarea.id)" class="btn btn-danger">
        🗑️
      </button>
    </div>
  </li>
</template>