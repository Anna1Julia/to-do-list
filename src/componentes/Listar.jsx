// Componente principal da aplicação, responsável por controlar os estados e coordenar os demais componentes
import { useState } from 'react'
import './Listar.css'
import Theme from './Theme'
import FormTarefa from './FormTarefa'
import FiltroTarefas from './FiltroTarefas'
import ListaTarefas from './ListaTarefas'

export default function Listar() {
    // Estado que guarda o texto da tarefa que o usuário está digitando no formulário
    const [tarefa, setTarefa] = useState('')
    
    // Estado que guarda a data selecionada para a tarefa (pode ficar vazio)
    const [data, setData] = useState('')
    
    // Estado que guarda a lista completa de tarefas, cada tarefa é um objeto com propriedades (texto, status, etc)
    const [lista, setLista] = useState([])
    
    // Estado que guarda qual filtro está selecionado para exibir as tarefas (todas, pendentes, concluídas, favoritas)
    const [filtro, setFiltro] = useState('todas')

    // Função que é chamada quando o formulário é enviado para adicionar uma nova tarefa
    const handleSubmit = (e) => {
        e.preventDefault() // Evita que a página seja recarregada ao enviar o formulário

        if (!tarefa) return // Se o campo de texto estiver vazio, não adiciona nada

        // Cria um objeto com os dados da nova tarefa, usando ID aleatório para identificá-la
        const novaTarefa = {
            id: Math.floor(Math.random() * 10000),  // Gera um número aleatório para o id da tarefa
            texto: tarefa,                           // Texto digitado no input
            data: data,                             // Data selecionada (pode ser string vazia)
            status: false,                          // status false significa que está pendente, não concluída
            favorita: false,                        // por padrão, a tarefa não é favorita
            urgenteManual: false                    // também não é marcada como urgente manualmente inicialmente
        }

        // Atualiza a lista de tarefas adicionando a nova tarefa ao final
        setLista([...lista, novaTarefa])

        // Limpa os campos do formulário para o usuário adicionar outra tarefa se quiser
        setTarefa('')
        setData('')
    }

    // Função para alternar o status de uma tarefa entre pendente (false) e concluída (true)
    const handleToggle = (id) => {
        setLista(lista.map(item =>
            item.id === id ? { ...item, status: !item.status } : item
        ))
    }

    // Função para alternar o estado de "favorita" da tarefa, para destacá-la
    const handleFavorito = (id) => {
        setLista(lista.map(item =>
            item.id === id ? { ...item, favorita: !item.favorita } : item
        ))
    }

    // Função para marcar ou desmarcar a tarefa como urgente manualmente (para destacar urgência)
    const handleUrgenteManual = (id) => {
        setLista(lista.map(item =>
            item.id === id ? { ...item, urgenteManual: !item.urgenteManual } : item
        ))
    }

    // Função para remover uma tarefa da lista, filtrando pelo seu ID único
    const handleDelete = (id) => {
        setLista(lista.filter(item => item.id !== id))
    }

    // Função para movimentar uma tarefa para cima ou para baixo na lista, permitindo o usuário reordenar a lista manualmente
    const handleMove = (id, direcao) => {
        // Encontra o índice atual da tarefa na lista
        const indice = lista.findIndex(item => item.id === id)

        // Impede que a tarefa seja movida para fora dos limites da lista
        if ((indice === 0 && direcao === 'subir') || (indice === lista.length - 1 && direcao === 'descer')) return

        // Cria uma cópia da lista para manipular
        const novaLista = [...lista]

        // Remove a tarefa da posição atual
        const itemMovido = novaLista.splice(indice, 1)[0]

        // Calcula o novo índice para inserção, para cima ou para baixo
        const novoIndice = direcao === 'subir' ? indice - 1 : indice + 1

        // Insere a tarefa na nova posição
        novaLista.splice(novoIndice, 0, itemMovido)

        // Atualiza a lista no estado, para re-renderizar na nova ordem
        setLista(novaLista)
    }

    // Função que limpa completamente a lista de tarefas, removendo todas
    const handleClear = () => setLista([])

    // Aplica o filtro selecionado pelo usuário para mostrar só as tarefas desejadas
    const tarefasFiltradas = lista.filter(item => {
        if (filtro === 'todas') return true
        if (filtro === 'pendentes') return !item.status
        if (filtro === 'concluidas') return item.status
        if (filtro === 'favoritas') return item.favorita
        return true
    })

    return (
        <div className="todo-container">
            <Theme />

            <h2>To-Do-List</h2>

            {/* Formulário para criar nova tarefa, recebe estados e funções para atualizar */}
            <FormTarefa
                tarefa={tarefa}
                setTarefa={setTarefa}
                data={data}
                setData={setData}
                handleSubmit={handleSubmit}
                handleClear={handleClear}
            />

            {/* Botões que definem o filtro para exibição das tarefas */}
            <FiltroTarefas filtro={filtro} setFiltro={setFiltro} />

            {/* Lista que exibe as tarefas filtradas e interativas */}
            <ListaTarefas
                tarefas={tarefasFiltradas}
                handleToggle={handleToggle}
                handleFavorito={handleFavorito}
                handleUrgenteManual={handleUrgenteManual}
                handleDelete={handleDelete}
                handleMove={handleMove}
            />
        </div>
    )
}
