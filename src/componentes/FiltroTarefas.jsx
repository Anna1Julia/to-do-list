// Componente com botões que permitem o usuário filtrar as tarefas exibidas na lista
export default function FiltroTarefas({ filtro, setFiltro }) {
    return (
        <div className="filtros">
            {/* Cada botão define um filtro diferente, e mostra estilo ativo conforme o filtro atual */}
            <button onClick={() => setFiltro('todas')} className={filtro === 'todas' ? 'active' : ''}>Todas</button>
            <button onClick={() => setFiltro('pendentes')} className={filtro === 'pendentes' ? 'active' : ''}>Pendentes</button>
            <button onClick={() => setFiltro('concluidas')} className={filtro === 'concluidas' ? 'active' : ''}>Concluídas</button>
            <button onClick={() => setFiltro('favoritas')} className={filtro === 'favoritas' ? 'active' : ''}>Favoritas</button>
        </div>
    )
}
