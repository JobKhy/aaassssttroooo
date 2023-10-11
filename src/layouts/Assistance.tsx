import React, { useState, type ChangeEvent } from 'react';
import players from '../data';
import { type Player } from '../types';
import { request } from '../Api';


interface FormData {
    lista: string;
  }

const Assistance = () => {
    const initialFormData: FormData = {
        lista: '',
      };
    const [formData, setFormData] = useState<FormData>(initialFormData)

    const [resMessage, setResMessage] = useState<String>('')

    const [playerData, setPlayerData] = useState<Player>();

    const handlePlayer = (e : ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = async (e : ChangeEvent<HTMLFormElement>) => {
    
        e.preventDefault();

        const { data } = await request.get<Player | null>(`/players/list/${formData.lista}`)

        if (data === null) {
            return setResMessage('Jugador no encontrado')
        }

        setPlayerData(data);
    }

    const markAttendance = async () => {
        // const currentDate = new Date().toLocaleDateString();
        if (playerData!== undefined) {
            try {
                const { data } = await request.put<Player>(`/players/assistance/${formData.lista}`, playerData)
                setPlayerData(data);
            } catch (error) {
                console.log(error);
                setResMessage('Error al marcar asistencia')
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Numero de lista</label>
                <input type="number" name='lista' onChange={handlePlayer} required />

                <button type="submit">Verificar jugador</button>
            </form>
        
            <h1>Detalles del Jugador</h1>
            {
            playerData ? (
                <>
                    <p>Nombre: {playerData.name}</p>
                    <p>Asistencias: {playerData.assists}</p>
                    <button onClick={markAttendance}>Marcar Asistencia</button>
                    
                </>
            ) : (
                <p>Selecciona un jugador</p>
            )
            }

            <p>{resMessage}</p>
        </>
    )
}

export default Assistance;
