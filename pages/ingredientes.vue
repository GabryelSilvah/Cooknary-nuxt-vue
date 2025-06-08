<template>

  <Menu />

  <div class="ingredientes-container">
    <div class="header-section">
      <h1>Lista de Ingredientes</h1>
      <button class="add-button" @click="showAddModal = true">
        <i class="fas fa-plus"></i> Adicionar Ingrediente
      </button>
    </div>

    <div class="table-responsive">
      <table class="ingredientes-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do Ingrediente</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ingrediente in ingredientes" :key="ingrediente.id">
            <td>{{ ingrediente.id }}</td>
            <td>{{ ingrediente.nome }}</td>
            <td>{{ ingrediente.descricao || '-' }}</td>
            <td class="actions-cell">
              <button class="edit-btn" @click="editIngrediente(ingrediente)">
                <i class="fas fa-edit"></i> Editar
              </button>
              <button class="delete-btn" @click="confirmDelete(ingrediente)">
                <i class="fas fa-trash"></i> Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de Adicionar/Editar -->
    <div v-if="showAddModal" class="modal-overlay">
      <div class="modal">
        <h2>{{ editingIngrediente ? 'Editar Ingrediente' : 'Adicionar Novo Ingrediente' }}</h2>
        <div class="form-group">
          <label>Nome do Ingrediente:</label>
          <input type="text" v-model="currentIngrediente.nome" placeholder="Digite o nome do ingrediente"
            class="modal-input" />
        </div>
        <div class="form-group">
          <label>Descrição:</label>
          <textarea v-model="currentIngrediente.descricao" placeholder="Digite uma descrição (opcional)"
            class="modal-input" rows="3"></textarea>
        </div>
        <div class="modal-buttons">
          <button class="cancel-btn" @click="closeModal">Cancelar</button>
          <button class="save-btn" @click="saveIngrediente">
            {{ editingIngrediente ? 'Salvar' : 'Adicionar' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de Confirmação -->
    <div v-if="showConfirmModal" class="modal-overlay">
      <div class="modal confirm-modal">
        <h2>Confirmar Exclusão</h2>
        <p>Tem certeza que deseja excluir o ingrediente "{{ ingredienteToDelete.nome }}"?</p>
        <div class="modal-buttons">
          <button class="cancel-btn" @click="showConfirmModal = false">Cancelar</button>
          <button class="delete-confirm-btn" @click="deleteIngrediente">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ingredientes: [
        { id: 1, nome: 'Farinha', descricao: 'Farinha de trigo refinada' },
        { id: 2, nome: 'Açúcar', descricao: 'Açúcar cristal' },
        { id: 3, nome: 'Ovo', descricao: 'Ovo de galinha' },
        { id: 4, nome: 'Leite', descricao: 'Leite integral' },
      ],
      showAddModal: false,
      showConfirmModal: false,
      editingIngrediente: false,
      currentIngrediente: {
        id: null,
        nome: '',
        descricao: ''
      },
      ingredienteToDelete: {}
    }
  },
  methods: {
    editIngrediente(ingrediente) {
      this.currentIngrediente = { ...ingrediente };
      this.editingIngrediente = true;
      this.showAddModal = true;
    },
    saveIngrediente() {
      if (!this.currentIngrediente.nome.trim()) return;

      if (this.editingIngrediente) {
        const index = this.ingredientes.findIndex(i => i.id === this.currentIngrediente.id);
        if (index !== -1) {
          this.ingredientes.splice(index, 1, { ...this.currentIngrediente });
        }
      } else {
        const newId = Math.max(...this.ingredientes.map(i => i.id), 0) + 1;
        this.ingredientes.push({
          id: newId,
          nome: this.currentIngrediente.nome,
          descricao: this.currentIngrediente.descricao
        });
      }

      this.closeModal();
    },
    confirmDelete(ingrediente) {
      this.ingredienteToDelete = { ...ingrediente };
      this.showConfirmModal = true;
    },
    deleteIngrediente() {
      this.ingredientes = this.ingredientes.filter(i => i.id !== this.ingredienteToDelete.id);
      this.showConfirmModal = false;
    },
    closeModal() {
      this.showAddModal = false;
      this.showConfirmModal = false;
      this.currentIngrediente = { id: null, nome: '', descricao: '' };
      this.editingIngrediente = false;
    }
  }
}
</script>

<style scoped>
@import url("~/assets/css/ingrediente.css");
</style>
