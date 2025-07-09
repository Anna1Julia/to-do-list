// Componente que exibe a lista de tarefas ou uma mensagem caso não tenha tarefas para mostrar
import ItemTarefa from './ItemTarefa'

export default function ListaTarefas({
    tarefas,
    handleToggle,
    handleFavorito,
    handleUrgenteManual,
    handleDelete,
    handleMove
}) {
    return (
        <ul className="lista-tarefas">
            {/* Se não tiver tarefas na lista, mostra uma mensagem estilizada */}
            {tarefas.length === 0 ? (
                <li className="vazia">Nenhuma tarefa encontrada</li>
            ) : (
                // Mapeia cada tarefa para um componente ItemTarefa, passando funções para manipular
                tarefas.map((item, index) => (
                    <ItemTarefa
                        key={item.id}
                        item={item}
                        index={index}
                        total={tarefas.length}
                        handleToggle={handleToggle}
                        handleFavorito={handleFavorito}
                        handleUrgenteManual={handleUrgenteManual}
                        handleDelete={handleDelete}
                        handleMove={handleMove}
                    />
                ))
            )}
        </ul>
    )
}
