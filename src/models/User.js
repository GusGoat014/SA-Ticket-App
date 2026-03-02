export class User {
  constructor(data) {
    // 1. Blindagem contra Null
    const safeData = data || {};
    // 2. Tradução e Mapeamento (Banco -> App)
    this.id = String(safeData.id || '');
    this.name = safeData.name || 'Usuário Sem Nome';
    this.email = safeData.email || '';
    // Regra: Se não vier role, assume que é aluno
    this.role = safeData.role || 'student';
    // Demais campos do Banco
    this.registration = safeData.registration || 'Sem Matrícula';
    this.turma = safeData.turma || '---';
    this.schedule = safeData.schedule || null;
    // 3. Campo Computado (Frontend Only)
    // O banco NÃO tem avatar, mas o App precisa de um.
    this.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      this.name,
    )}&background=random&color=fff&size=128`;
    // NOTA: Não mapeamos a senha (password) por segurança!
  }
  // Helper Lógico
  isAdmin() {
    return this.role === 'admin';
  }
}
