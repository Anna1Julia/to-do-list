// Componente que exibe o formulário para o usuário adicionar uma nova tarefa
import { FaPlus, FaTrashAlt } from 'react-icons/fa'

export default function FormTarefa({ tarefa, setTarefa, data, setData, handleSubmit, handleClear }) {
    return (
        <form onSubmit={handleSubmit} className="todo-form">
            {/* Input de texto para o usuário digitar a descrição da tarefa */}
            <input
                type="text"
                placeholder="Adicione uma nova tarefa..."
                value={tarefa}  // valor controlado pelo estado 'tarefa'
                onChange={(e) => setTarefa(e.target.value)}  // atualiza o estado ao digitar
            />

            {/* Input de data, opcional, para o usuário definir um prazo */}
            <input
                type="date"
                value={data}  // valor controlado pelo estado 'data'
                onChange={(e) => setData(e.target.value)}  // atualiza o estado ao escolher a data
            />

            {/* Botão para submeter o formulário e adicionar a tarefa */}
            <button type="submit" className="botao">
                <FaPlus /> Adicionar
            </button>

            {/* Botão para limpar/resetar toda a lista de tarefas */}
            <button type="button" onClick={handleClear} className="botao limpar">
                <FaTrashAlt /> Resetar
            </button>
        </form>
    )
}
