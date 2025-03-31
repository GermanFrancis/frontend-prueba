<script setup>

import TareaComponent from "./components/TareaComponent.vue";
import { ref, onMounted } from "vue";
import { tareas, cargarTareas, agregarTarea, completarTarea, eliminarTarea } from "./services/tareasService.js";

const nuevaTarea = ref("");

onMounted(cargarTareas);
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card w-50">
      <div class="card-header">
        Lista de Tareas
      </div>
      <div class="card-body">
        <div class="row g-1 mb-3">
          <div class="col-sm-9">
            <input v-model="nuevaTarea" class="form-control" type="text" placeholder="Nueva tarea" aria-label="entrada">
          </div>
          <div class="col-auto">
            <button @click="agregarTarea(nuevaTarea)" class="btn btn-success">Agregar</button>
          </div>
        </div>
        <div>
          <ul class="list-group">
            <TareaComponent v-for="tarea in tareas" :key="tarea.id" :tarea="tarea" :completarTarea="completarTarea"
              :eliminarTarea="eliminarTarea" />
          </ul>
        </div>
      </div>
      <div class="card-footer text-body-secondary">
        Powered by Bootstrap
      </div>
    </div>
  </div>
</template>
