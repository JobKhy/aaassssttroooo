import React, { useEffect } from 'react'
// import players from '../data'
import { useState } from 'react'
import { type Player } from '../types'
import { rawUrl } from '../constants'
import { request } from "../Api"

async function getPlayersAll() {
    const req = await request.get<Player[]>("/players")
    console.log(req.config);
    
    return req.data
}

const Players = () => {

    const [order, setOrder] = useState<Player[]>([])

    

    useEffect(() => {
        
        (async () => {
            try{
                const data = await getPlayersAll()
                setOrder(data)
                console.log({data});
            } catch (error) {
                console.log({error});
            }
            
        })()

    }, []);

    const orderFaltasPlayers = () => {
        const ordered = [...order].sort((a, b) => a.noAssist - b.noAssist)
        setOrder(ordered)
    }

    const orderListPlayers = () => {
        const ordered = [...order].sort((a, b) => a.list - b.list)
        setOrder(ordered)
    }

    
    return (
    <div className="text-white flex flex-col">

        <span className='w-4/5 self-center flex gap-4 my-4'>
            <button className='p-1 rounded border-b-slate-300 border text-[#0833a2] font-medium' onClick={() => orderListPlayers()}>order list</button>
            <button className='p-1 rounded border-b-slate-300 border text-[#0833a2] font-medium' onClick={() => orderFaltasPlayers()}>order faltas</button>
            <button className='p-1 rounded border-b-slate-300 border text-[#0833a2] font-medium'><a href='asistencia'>asistencia</a></button>
            <button className='p-1 rounded border-b-slate-300 border text-[#0833a2] font-medium'><a href='player/registro'>Registrar nuevo</a></button>
        </span>
        

        <div className='flex flex-col gap-2 items-center '>
        <span className='flex gap-2 border justify-left w-4/5 text-[#0833a2] text-lg border-b-slate-300 font-semibold'>
                <p  className='w-2/12 text-center'>No. list</p>
                <h2 className='w-2/12 text-center'>Apellidos</h2>
                <h2 className='w-2/12 text-center'>Nombre(s)</h2>
                <p className='w-2/12 text-center'>Posición</p>
                <p className='w-2/12 text-center'>Asistencias</p>
                <p className='w-1/12 text-center'>Faltas</p>
                <p className='w-1/12 text-center'></p>
        </span>
        {order.map((order, index) => (
            <span key={index} className='flex gap-1 border   justify-left w-4/5 text-[#0833a2] border-b-slate-300'>
                <p  className='w-2/12 text-center'>{order.list}</p>
                <h2 className='w-2/12 text-center'>{order.name}</h2>
                <h2 className='w-2/12 text-center'>{order.lastName}</h2>
                <p className='w-2/12 text-center'>{order.position}</p>
                <p className='w-2/12 text-center'>{order.assists}</p>
                <p className='w-1/12 text-center'>{order.noAssist}</p>
                <button className='w-1/12'><a href={`player/${order.id}`}>+</a></button>
            </span>
            ))
        }
        </div>

    </div>
  )
}

export default Players