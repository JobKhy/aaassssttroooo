import React, { useEffect, useMemo, useState } from 'react'
import players from '../data'


type Props = {
    idi: any,
}

type Info = {
    lista: number,
    name: string,
    age: number,
    position: string,
    team: string,
    faltas: number,
    asistencias: number,
}

const Player = ({ idi }: Props) => {

    const tilin = useMemo(( ) => {
        const ordered = players.find((player) => player.id === parseInt(idi))
        console.log(players);
        
        console.log(ordered);
        console.log(idi);
        
        return ordered

    }, [idi])


  return (
    <>
        <h1>Peneepepenpenpenep</h1>
        <p>{idi}</p>
        <p>{tilin?.name}</p>



        
    </>
  )
}

export default Player