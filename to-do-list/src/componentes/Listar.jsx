import { useState } from 'react'
import './Listar.css'
import {
    FaTrash,
    FaTrashAlt,
    FaStar,
    FaRegStar,
    FaExclamationTriangle,
    FaPlus
} from 'react-icons/fa'

export default function Listar() {
    // Estado que armazena o texto da nova tarefa a ser criada
    const [tarefa, setTarefa] = useState('')
    
    // Estado que armazena a data da nova tarefa (input do usuário)
    const [data, setData] = useState('')
    
    // Lista de tarefas completas (objeto com id, texto, data, etc.)
    const [lista, setLista] = useState([])
    
    // Filtro atual selecionado (ex: todas, pendentes, concluídas, etc.)
    const [filtro, setFiltro] = useState('todas')

    // Adiciona uma nova tarefa à lista ao submeter o formulário
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!tarefa) return  // Evita inserir tarefas vazias

        // Criação do objeto de tarefa com propriedades padrão
        const novaTarefa = {
            id: Math.floor(Math.random() * 10000),  // Gera um ID aleatório
            texto: tarefa,
            data: data,
            status: false,         // status false = pendente
            favorita: false,       // favorita false por padrão
            urgenteManual: false   // urgência manual false por padrão
        }

        // Atualiza a lista com a nova tarefa
        setLista([...lista, novaTarefa])
        setTarefa('')  // Limpa o campo de texto
        setData('')    // Limpa o campo de data
    }

    // Alterna o status da tarefa entre concluída e pendente
    const handleToggle = (id) => {
        setLista(lista.map(item =>
            item.id === id ? { ...item, status: !item.status } : item
        ))
    }

    // Alterna o estado de "favorita" da tarefa
    const handleFavorito = (id) => {
        setLista(lista.map(item =>
            item.id === id ? { ...item, favorita: !item.favorita } : item
        ))
    }

    // Marca ou desmarca a tarefa como "urgente manualmente"
    const handleUrgenteManual = (id) => {
        setLista(lista.map(item =>
            item.id === id ? { ...item, urgenteManual: !item.urgenteManual } : item
        ))
    }

    // Remove uma tarefa da lista com base no ID
    const handleDelete = (id) => {
        setLista(lista.filter(item => item.id !== id))
    }

    // Move uma tarefa para cima ou para baixo na lista
    const handleMove = (id, direcao) => {
        const indice = lista.findIndex(item => item.id === id)

        // Impede movimento além dos limites (início ou fim da lista)
        if ((indice === 0 && direcao === 'subir') || (indice === lista.length - 1 && direcao === 'descer')) return

        const novaLista = [...lista]
        const itemMovido = novaLista.splice(indice, 1)[0]  // Remove o item do índice atual

        const novoIndice = direcao === 'subir' ? indice - 1 : indice + 1
        novaLista.splice(novoIndice, 0, itemMovido)  // Insere no novo índice

        setLista(novaLista)
    }

    // Limpa toda a lista de tarefas
    const handleClear = () => setLista([])

    // Função que calcula se uma data está a até 3 dias de hoje (urgência automática)
    const hoje = new Date()
    const isUrgenteAutomatica = (data) => {
        if (!data) return false
        const dataTarefa = new Date(data)
        const diff = (dataTarefa - hoje) / (1000 * 60 * 60 * 24) // diferença em dias
        return diff <= 3 && diff >= 0
    }

    // Aplica o filtro selecionado para exibir apenas as tarefas desejadas
    const tarefasFiltradas = lista.filter(item => {
        if (filtro === 'todas') return true
        if (filtro === 'pendentes') return !item.status
        if (filtro === 'concluidas') return item.status
        if (filtro === 'favoritas') return item.favorita
        return true
    })

    return (
        <div className="todo-container">
            <h2>To-Do-List</h2>

            {/* Formulário para criar nova tarefa */}
            <form onSubmit={handleSubmit} className="todo-form">
                {/* Campo de texto para descrição da tarefa */}
                <input
                    type="text"
                    placeholder="Adicione uma nova tarefa..."
                    value={tarefa}
                    onChange={(e) => setTarefa(e.target.value)}
                />
                
                {/* Campo de data para a tarefa */}
                <input
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                />

                {/* Botão para adicionar tarefa */}
                <button type="submit" className="botao">
                    <FaPlus /> Adicionar
                </button>

                {/* Botão para limpar todas as tarefas */}
                <button type="button" onClick={handleClear} className="botao limpar">
                    <FaTrashAlt /> Resetar
                </button>
            </form>

            {/* Botões de filtro para exibir tarefas com base no status */}
            <div className="filtros">
                <button onClick={() => setFiltro('todas')} className={filtro === 'todas' ? 'active' : ''}>Todas</button>
                <button onClick={() => setFiltro('pendentes')} className={filtro === 'pendentes' ? 'active' : ''}>Pendentes</button>
                <button onClick={() => setFiltro('concluidas')} className={filtro === 'concluidas' ? 'active' : ''}>Concluídas</button>
                <button onClick={() => setFiltro('favoritas')} className={filtro === 'favoritas' ? 'active' : ''}>Favoritas</button>
            </div>

            {/* Lista de tarefas filtradas */}
            <ul className="lista-tarefas">
                {tarefasFiltradas.length === 0 ? (
                    <li>Nenhuma tarefa encontrada</li>
                ) : (
                    tarefasFiltradas.map((item, index) => {
                        // Define se a tarefa deve ser destacada como "urgente"
                        const urgente = item.urgenteManual && !item.status

                        return (
                            <li key={item.id} className={`
                                ${item.status ? 'concluida' : ''}
                                ${item.favorita ? 'favorita' : ''}
                                ${urgente ? 'urgente' : ''}
                            `}>
                                <div>
                                    {/* Checkbox para marcar como concluída */}
                                    <input
                                        type="checkbox"
                                        onChange={() => handleToggle(item.id)}
                                        checked={item.status}
                                    />
                                    <span>{item.texto}</span>

                                    {/* Mostra a data da tarefa, se existir */}
                                    {item.data && (
                                        <span className="data">
                                            📅 {new Date(item.data).toLocaleDateString('pt-BR')}
                                        </span>
                                    )}

                                    {/* Tag de urgência manual */}
                                    {urgente && <span className="urgente-tag">URGENTE</span>}
                                </div>

                                {/* Ações disponíveis para cada tarefa */}
                                <div className="acoes">
                                    {/* Favoritar/desfavoritar */}
                                    <button onClick={() => handleFavorito(item.id)}>
                                        {item.favorita ? (
                                            <FaStar className="favorito" />
                                        ) : (
                                            <FaRegStar />
                                        )}
                                    </button>

                                    {/* Marcar como urgente manualmente */}
                                    <button onClick={() => handleUrgenteManual(item.id)} title="Marcar como urgente">
                                        <FaExclamationTriangle
                                            style={{ color: item.urgenteManual ? '#ff9800' : '#bbb' }}
                                        />
                                    </button>

                                    {/* Excluir tarefa */}
                                    <button onClick={() => handleDelete(item.id)}>
                                        <FaTrash className="excluir" />
                                    </button>
                                </div>

                                {/* Botões para reordenar a tarefa na lista */}
                                <div className="ordem">
                                    <button onClick={() => handleMove(item.id, 'subir')} disabled={index === 0}>↑</button>
                                    <button onClick={() => handleMove(item.id, 'descer')} disabled={index === lista.length - 1}>↓</button>
                                </div>
                            </li>
                        )
                    })
                )}
            </ul>
        </div>
    )
}
