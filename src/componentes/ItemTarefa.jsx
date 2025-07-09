// Componente que exibe uma tarefa individual com suas informações e botões de ação
import {
    FaTrash,
    FaStar,
    FaRegStar,
    FaExclamationTriangle,
    FaRegCalendarAlt
} from 'react-icons/fa'

export default function ItemTarefa({
    item,
    index,
    total,
    handleToggle,
    handleFavorito,
    handleUrgenteManual,
    handleDelete,
    handleMove
}) {
    // Define se a tarefa está marcada como urgente e não foi concluída (para destacar visualmente)
    const urgente = item.urgenteManual && !item.status

    return (
        <li
            className={`
                ${item.status ? 'concluida' : ''}
                ${item.favorita ? 'favorita' : ''}
                ${urgente ? 'urgente' : ''}
            `}
        >
            <div>
                {/* Checkbox para o usuário marcar a tarefa como concluída ou pendente */}
                <input
                    type="checkbox"
                    onChange={() => handleToggle(item.id)}
                    checked={item.status}
                />

                {/* Texto descritivo da tarefa */}
                <span>{item.texto}</span>

                {/* Se a tarefa tiver uma data definida, exibe a data formatada */}
                {item.data && (
                    <span className="data">
                        <FaRegCalendarAlt style={{ marginRight: '4px' }} />
                        {new Date(item.data).toLocaleDateString('pt-BR')}
                    </span>
                )}

                {/* Se estiver marcada como urgente, exibe uma tag de destaque */}
                {urgente && <span className="urgente-tag">URGENTE</span>}
            </div>

            <div className="acoes">
                {/* Botão para favoritar ou desfavoritar a tarefa */}
                <button onClick={() => handleFavorito(item.id)}>
                    {item.favorita ? (
                        <FaStar className="favorito" />
                    ) : (
                        <FaRegStar />
                    )}
                </button>

                {/* Botão para marcar/desmarcar como urgente manualmente */}
                <button onClick={() => handleUrgenteManual(item.id)} title="Marcar como urgente">
                    <FaExclamationTriangle
                        style={{ color: item.urgenteManual ? '#ff9800' : '#bbb' }}
                    />
                </button>

                {/* Botão para excluir a tarefa da lista */}
                <button onClick={() => handleDelete(item.id)}>
                    <FaTrash className="excluir" />
                </button>
            </div>

            <div className="ordem">
                {/* Botões para mover a tarefa para cima e para baixo na lista */}
                {/* O botão "subir" fica desabilitado se a tarefa estiver no topo */}
                <button onClick={() => handleMove(item.id, 'subir')} disabled={index === 0}>↑</button>

                {/* O botão "descer" fica desabilitado se a tarefa estiver no final da lista */}
                <button onClick={() => handleMove(item.id, 'descer')} disabled={index === total - 1}>↓</button>
            </div>
        </li>
    )
}
