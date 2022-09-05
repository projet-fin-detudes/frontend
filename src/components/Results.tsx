import React, { useEffect, useState } from 'react'
import { BsCheck2Circle } from "react-icons/bs"
import { FaTimesCircle } from "react-icons/fa"
import { qaService } from '../services/QaService'

export default function Results() {

  const [answer, setanswer] = useState<{ correct: boolean, score: number } | undefined>(undefined)
  const [loading, setloading] = useState(false)
  useEffect(() => {
    qaService.getAnswer$().subscribe(
      a => {
        setanswer(a)
      }
    )

    return () => {

    }
  }, [])

  useEffect(() => {
    qaService.getLoading$().subscribe(
      l => {
        setloading(l)
      }
    )

    return () => {

    }
  }, [])
 if(loading) return <Loading/>
  if (answer == undefined) return <></>
  if (answer.correct) return <Correct score={answer.score} />
  return <Wrong score={answer.score} />
}




function Correct({ score }: { score: number }) {
  return (
    <div className=' justify-between items-center w-1/2 flex px-5 py-4 bg-green-100 rounded-lg border border-gray-300'>
      <div className='flex'>

        <p className='text-base '>Réponse: <span className='font-bold'>OUI</span> </p>
        <p className='text-base px-8'>Score: <span className='font-bold'>{`${score} %`}</span> </p>
      </div>
      <BsCheck2Circle className='text-3xl font-black text-green-800 ' />
    </div>
  )
}






function Wrong({ score }: { score: number }) {
  return (
    <div className=' justify-between items-center w-1/2 flex px-5 py-4 bg-red-100 rounded-lg border border-gray-300'>
      <div className='flex'>
        <p className='text-base '>Réponse: <span className='font-bold'>Non</span> </p>
        <p className='text-base px-8'>Score: <span className='font-bold'>{`${score} %`}</span> </p>
      </div>
      <FaTimesCircle className='text-3xl font-black text-red-800' />
    </div>
  )
}



 function Loading() {
  return (
    <div className=' justify-center items-center  w-1/2 flex px-5 '>
    <img src='/loading.svg' ></img>
    
    </div>
  )
}
