<template>

  <main>

    <Menu/>

    <div class="cargos-container">
      <div class="header-section">
        <h1>Lista de Cargos</h1>
        <button class="add-button" @click="showAddModal = true">
          <i class="fas fa-plus"></i> Adicionar Cargo
        </button>
      </div>

      <div class="table-responsive">
        <table class="cargos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome do Cargo</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cargo in cargos" :key="cargo.id">
              <td>{{ cargo.id }}</td>
              <td>{{ cargo.nome }}</td>
              <td>{{ cargo.descricao || '-' }}</td>
              <td class="actions-cell">
                <button class="edit-btn" @click="editCargo(cargo)">
                  <i class="fas fa-edit"></i> Editar
                </button>
                <button class="delete-btn" @click="confirmDelete(cargo)">
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
          <h2>{{ editingCargo ? 'Editar Cargo' : 'Adicionar Novo Cargo' }}</h2>
          <div class="form-group">
            <label>Nome do Cargo:</label>
            <input type="text" v-model="currentCargo.nome" placeholder="Digite o nome do cargo" class="modal-input" />
          </div>
          <div class="form-group">
            <label>Descrição:</label>
            <textarea v-model="currentCargo.descricao" placeholder="Digite uma descrição (opcional)" class="modal-input"
              rows="3"></textarea>
          </div>
          <div class="modal-buttons">
            <button class="cancel-btn" @click="closeModal">Cancelar</button>
            <button class="save-btn" @click="saveCargo">
              {{ editingCargo ? 'Salvar' : 'Adicionar' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Modal de Confirmação -->
      <div v-if="showConfirmModal" class="modal-overlay">
        <div class="modal confirm-modal">
          <h2>Confirmar Exclusão</h2>
          <p>Tem certeza que deseja excluir o cargo "{{ cargoToDelete.nome }}"?</p>
          <div class="modal-buttons">
            <button class="cancel-btn" @click="showConfirmModal = false">Cancelar</button>
            <button class="delete-confirm-btn" @click="deleteCargo">Confirmar</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      cargos: [
        { id: 1, nome: 'Gerente', descricao: 'Responsável pela gestão da equipe' },
        { id: 2, nome: 'Desenvolvedor', descricao: 'Desenvolvimento de sistemas' },
        { id: 3, nome: 'Designer', descricao: 'Design de interfaces e produtos' },
        { id: 4, nome: 'Analista', descricao: 'Análise de requisitos e processos' },
      ],
      showAddModal: false,
      showConfirmModal: false,
      editingCargo: false,
      currentCargo: {
        id: null,
        nome: '',
        descricao: ''
      },
      cargoToDelete: {}
    }
  },
  methods: {
    editCargo(cargo) {
      this.currentCargo = { ...cargo };
      this.editingCargo = true;
      this.showAddModal = true;
    },
    saveCargo() {
      if (!this.currentCargo.nome.trim()) return;

      if (this.editingCargo) {
        const index = this.cargos.findIndex(c => c.id === this.currentCargo.id);
        if (index !== -1) {
          this.cargos.splice(index, 1, { ...this.currentCargo });
        }
      } else {
        const newId = Math.max(...this.cargos.map(c => c.id), 0) + 1;
        this.cargos.push({
          id: newId,
          nome: this.currentCargo.nome,
          descricao: this.currentCargo.descricao
        });
      }

      this.closeModal();
    },
    confirmDelete(cargo) {
      this.cargoToDelete = { ...cargo };
      this.showConfirmModal = true;
    },
    deleteCargo() {
      this.cargos = this.cargos.filter(c => c.id !== this.cargoToDelete.id);
      this.showConfirmModal = false;
    },
    closeModal() {
      this.showAddModal = false;
      this.showConfirmModal = false;
      this.currentCargo = { id: null, nome: '', descricao: '' };
      this.editingCargo = false;
    }
  }
}
</script>

<style scoped>
@import url("~/assets/css/cargo.css");
</style>