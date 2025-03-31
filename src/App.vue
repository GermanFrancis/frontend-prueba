<script setup>

import TareaComponent from "./components/TareaComponent.vue";
import { ref, onMounted } from "vue";
import { tareas, cargarTareas, agregarTarea, completarTarea, eliminarTarea } from "./services/tareasService.js";

const nuevaTarea = ref("");

onMounted(cargarTareas);
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card w-50 text-bg-dark ">
      <div class="card-header text-center">
        <i class="bi bi-list-task"></i>
        Lista de Tareas
      </div>
      <div class="card-body">
        <div class="row g-2 mb-3">
          <div class="col-11">
            <input v-model="nuevaTarea" class="form-control" type="text" placeholder="Nueva tarea" aria-label="entrada">
          </div>
          <div class="col-1 text-end">
            <button @click="agregarTarea(nuevaTarea)" class="btn btn-success m-0">
              <i class="bi bi-plus-square-fill"></i>
            </button>
          </div>
        </div>
        <div>
          <ul class="list-group">
            <TareaComponent v-for="tarea in tareas" :key="tarea.id" :tarea="tarea" @completarTarea="completarTarea"
              @eliminarTarea="eliminarTarea" />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
