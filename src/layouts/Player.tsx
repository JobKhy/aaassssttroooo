import { useEffect, useState } from 'react'
import { request } from '../Api'
import { type Player } from '../types'
// import players from '../data'


type Props = {
    idi: any,
}

const PlayerPage = ({ idi }: Props) => {

    const [player, setPlayer] = useState<Player>();

    useEffect(() => {
        (async () => {
            try {
                const data = await request.get<Player>(`/players/${idi}`)
                setPlayer(data.data)
                console.log({ data });
                
            } catch (error) {
                console.log({ error });
            }
        })()
    }, [idi]);

    const handleDelete = async () => {
        try {
            await request.delete<Player | null>(`/players/${idi}`)
            setPlayer(undefined)
        } catch (error) {
            console.log({ error });
        } finally {
            window.location.href = '/'
        }
    }


    return (
        <>
            <p>Lista: {player?.list}</p>
            <p>{player?.name} {player?.lastName}</p>
            <p>{player?.age} anos</p>
            <p>{player?.position}</p>
            <p>Jersey: {player?.shirtNumber}</p>
            <p>{player?.noAssist} faltas</p>
            <p>{player?.assists} asistencias</p>


            <button onClick={handleDelete}>Eliminar juagdor</button>
        </>
    )
}

export default PlayerPage