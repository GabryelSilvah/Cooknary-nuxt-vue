<template>
  <Menu />

  <div class="medidas-container">
    <div class="header-section">
      <h1>Lista de Medidas</h1>
      <button class="add-button" @click="showAddModal = true">
        <i class="fas fa-plus"></i> Adicionar Medida
      </button>
    </div>

    <div class="table-responsive">
      <table class="medidas-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome da Medida</th>
            <th>Sigla</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="medida in medidas" :key="medida.id">
            <td>{{ medida.id }}</td>
            <td>{{ medida.nome }}</td>
            <td>{{ medida.sigla }}</td>
            <td>{{ medida.descricao || '-' }}</td>
            <td class="actions-cell">
              <button class="edit-btn" @click="editMedida(medida)">
                <i class="fas fa-edit"></i> Editar
              </button>
              <button class="delete-btn" @click="confirmDelete(medida)">
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
        <h2>{{ editingMedida ? 'Editar Medida' : 'Adicionar Nova Medida' }}</h2>
        <div class="form-group">
          <label>Nome da Medida:</label>
          <input type="text" v-model="currentMedida.nome" placeholder="Digite o nome da medida" class="modal-input"
            required />
        </div>
        <div class="form-group">
          <label>Sigla:</label>
          <input type="text" v-model="currentMedida.sigla" placeholder="Digite a sigla (ex: kg, L)" class="modal-input"
            required maxlength="5" />
        </div>
        <div class="form-group">
          <label>Descrição:</label>
          <textarea v-model="currentMedida.descricao" placeholder="Digite uma descrição (opcional)" class="modal-input"
            rows="3"></textarea>
        </div>
        <div class="modal-buttons">
          <button class="cancel-btn" @click="closeModal">Cancelar</button>
          <button class="save-btn" @click="saveMedida">
            {{ editingMedida ? 'Salvar' : 'Adicionar' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de Confirmação -->
    <div v-if="showConfirmModal" class="modal-overlay">
      <div class="modal confirm-modal">
        <h2>Confirmar Exclusão</h2>
        <p>Tem certeza que deseja excluir a medida "{{ medidaToDelete.nome }}"?</p>
        <div class="modal-buttons">
          <button class="cancel-btn" @click="showConfirmModal = false">Cancelar</button>
          <button class="delete-confirm-btn" @click="deleteMedida">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      medidas: [
        { id: 1, nome: 'Quilograma', sigla: 'kg', descricao: 'Unidade de medida de massa' },
        { id: 2, nome: 'Litro', sigla: 'L', descricao: 'Unidade de medida de volume' },
        { id: 3, nome: 'Metro', sigla: 'm', descricao: 'Unidade de medida de comprimento' },
        { id: 4, nome: 'Grama', sigla: 'g', descricao: 'Unidade de medida de massa' },
      ],
      showAddModal: false,
      showConfirmModal: false,
      editingMedida: false,
      currentMedida: {
        id: null,
        nome: '',
        sigla: '',
        descricao: ''
      },
      medidaToDelete: {}
    }
  },
  methods: {
    editMedida(medida) {
      this.currentMedida = { ...medida };
      this.editingMedida = true;
      this.showAddModal = true;
    },
    saveMedida() {
      if (!this.currentMedida.nome.trim() || !this.currentMedida.sigla.trim()) return;

      if (this.editingMedida) {
        const index = this.medidas.findIndex(m => m.id === this.currentMedida.id);
        if (index !== -1) {
          this.medidas.splice(index, 1, { ...this.currentMedida });
        }
      } else {
        const newId = Math.max(...this.medidas.map(m => m.id), 0) + 1;
        this.medidas.push({
          id: newId,
          nome: this.currentMedida.nome,
          sigla: this.currentMedida.sigla,
          descricao: this.currentMedida.descricao
        });
      }

      this.closeModal();
    },
    confirmDelete(medida) {
      this.medidaToDelete = { ...medida };
      this.showConfirmModal = true;
    },
    deleteMedida() {
      this.medidas = this.medidas.filter(m => m.id !== this.medidaToDelete.id);
      this.showConfirmModal = false;
    },
    closeModal() {
      this.showAddModal = false;
      this.showConfirmModal = false;
      this.currentMedida = { id: null, nome: '', sigla: '', descricao: '' };
      this.editingMedida = false;
    }
  }
}
</script>

<style scoped>
@import url("~/assets/css/medida.css");
</style>