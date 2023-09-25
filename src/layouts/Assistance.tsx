import React, { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import players from '../data';

type Props = {
    idi: any,
}

type Info = {
    id: number,
    lista: number,
    name: string,
    lastName: string,
    age: number,
    position: string,
    team: string,
    faltas: number,
    asistencias: number,
    asistenciaRegistrada: string[]; // Array de fechas de asistencia registrada
}

interface FormData {
    lista: string;

  }

const Assistance = (props : Props) => {
    const initialFormData: FormData = {
        lista: '',
      };
    const [formData, setFormData] = useState<FormData>(initialFormData)

    const [resMessage, setResMessage] = useState<String>('')

    const [playerData, setPlayerData] = useState<Info>();

    const handlePlayer = (e : ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = (e : ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const ordered = players.find((player) => player.lista === parseInt(formData.lista));
        console.log(ordered);
        setPlayerData(ordered);
    }

    const markAttendance = () => {
        const currentDate = new Date().toLocaleDateString();
        if (playerData!== undefined) {
            const { asistenciaRegistrada } = playerData;
            
            // Verificar si ya se ha marcado la asistencia hoy
            if (!asistenciaRegistrada.includes(currentDate)) {
                // Marcar asistencia
                const updatedPlayerData = {
                    ...playerData,
                    asistencias: playerData.asistencias + 1,
                    asistenciaRegistrada: [...asistenciaRegistrada, currentDate],
                };

                console.log(updatedPlayerData);
                setPlayerData(updatedPlayerData);

                // Actualizar los datos del jugador
                // Esto dependerá de cómo estés gestionando tus datos en tu aplicación
                // Puede ser necesario utilizar un estado global o una función para actualizar los datos.
                // setPlayerData(updatedPlayerData); // Ejemplo de cómo podrías actualizar los datos
            } else {
                // La asistencia ya ha sido registrada hoy
                // Puedes mostrar un mensaje o tomar otras acciones aquí
                console.log('La asistencia ya ha sido registrada hoy.');
                setResMessage('La asistencia ya ha sido registrada hoy.');

            }
        } else {
            console.log('No se ha encontrado el jugador.');
            setResMessage('No se ha encontrado el jugador.');
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
                    <p>Asistencias: {playerData.asistencias}</p>
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
