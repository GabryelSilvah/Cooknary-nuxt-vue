<template>

  <Menu/>
  <div class="categorias-container">
    <div class="header-section">
      <h1>Lista de Categorias</h1>
      <button class="add-button" @click="showAddModal = true">
        <i class="fas fa-plus"></i> Adicionar Categoria
      </button>
    </div>

    <div class="table-responsive">
      <table class="categorias-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome da Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="categoria in categorias" :key="categoria.id_cat">
            <td>{{ categoria.id_cat }}</td>
            <td>{{ categoria.nome_categoria }}</td>
            <td class="actions-cell">
              <button class="edit-btn" @click="editCategoria(categoria)">
                <i class="fas fa-edit"></i> Editar
              </button>
              <button class="delete-btn" @click="confirmDelete(categoria)">
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
        <h2>{{ editingCategoria ? 'Editar Categoria' : 'Adicionar Nova Categoria' }}</h2>
        <div class="form-group">
          <label>Nome da Categoria:</label>
          <input 
            type="text" 
            v-model="currentCategoria.nome_categoria" 
            placeholder="Digite o nome da categoria"
            class="modal-input"
            required
          />
        </div>
        <div class="modal-buttons">
          <button class="cancel-btn" @click="closeModal">Cancelar</button>
          <button class="save-btn" @click="saveCategoria">
            {{ editingCategoria ? 'Salvar' : 'Adicionar' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de Confirmação -->
    <div v-if="showConfirmModal" class="modal-overlay">
      <div class="modal confirm-modal">
        <h2>Confirmar Exclusão</h2>
        <p>Tem certeza que deseja excluir a categoria "{{ categoriaToDelete.nome_categoria }}"?</p>
        <div class="modal-buttons">
          <button class="cancel-btn" @click="showConfirmModal = false">Cancelar</button>
          <button class="delete-confirm-btn" @click="deleteCategoria">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categorias: [
        { id_cat: 1, nome_categoria: "Massas" },
        { id_cat: 2, nome_categoria: "Carnes" },
        { id_cat: 3, nome_categoria: "Sobremesas" },
        { id_cat: 4, nome_categoria: "Bebidas" },
      ],
      showAddModal: false,
      showConfirmModal: false,
      editingCategoria: false,
      currentCategoria: {
        id_cat: null,
        nome_categoria: ''
      },
      categoriaToDelete: {}
    }
  },
  methods: {
    editCategoria(categoria) {
      this.currentCategoria = { ...categoria };
      this.editingCategoria = true;
      this.showAddModal = true;
    },
    saveCategoria() {
      if (!this.currentCategoria.nome_categoria.trim()) return;
      
      if (this.editingCategoria) {
        const index = this.categorias.findIndex(c => c.id_cat === this.currentCategoria.id_cat);
        if (index !== -1) {
          this.categorias.splice(index, 1, { ...this.currentCategoria });
        }
      } else {
        const newId = Math.max(...this.categorias.map(c => c.id_cat), 0) + 1;
        this.categorias.push({
          id_cat: newId,
          nome_categoria: this.currentCategoria.nome_categoria
        });
      }
      
      this.closeModal();
    },
    confirmDelete(categoria) {
      this.categoriaToDelete = { ...categoria };
      this.showConfirmModal = true;
    },
    deleteCategoria() {
      this.categorias = this.categorias.filter(c => c.id_cat !== this.categoriaToDelete.id_cat);
      this.showConfirmModal = false;
    },
    closeModal() {
      this.showAddModal = false;
      this.showConfirmModal = false;
      this.currentCategoria = { id_cat: null, nome_categoria: '' };
      this.editingCategoria = false;
    }
  }
}
</script>

<style scoped>
@import url("~/assets/css/categoria.css");
</style>