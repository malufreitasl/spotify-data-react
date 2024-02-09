// Generic Imports
import { CgSpinner } from "react-icons/cg";
import { useState } from "react";
import { motion } from "framer-motion"

const timeRanges = [
    {
        label: "4 Weeks",
        value: "4-weeks"
    },
    {
        label: "6 Months",
        value: "6-months"
    },
    {
        label: "Last Year",
        value: "last-year",
    },
    {
        label: "Always",
        value: "always"
    },
]

export function ListTopTracks({ handleChangeTrackQuery, data }) {
    const [activeButton, setActiveButton] = useState()
    
    if (data === undefined) {
        return (
            <div>
                <div className="flex justify-between mx-5">
                    {timeRanges.map(({ label, value }) => (
                        <button className={`text-sm pb-1 ${activeButton === value ? 'border-b' : 'text-white'}`} onClick={() => {
                            setActiveButton(value)
                            handleChangeTrackQuery(value)
                        }}>{label}</button>
                    ))}  
                </div>
                <div className="flex items-center justify-center w-screen h-screen pb-56">
                    <div className="self-center animate-spin">
                        <CgSpinner color="#7C00FF" className="h-24 w-24"/>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="flex justify-between mx-5">
                {timeRanges.map(({ label, value }) => (
                        <button className={`text-sm pb-1 ${activeButton === value ? 'border-b' : 'text-white'}`} onClick={() => {
                            setActiveButton(value)
                            handleChangeTrackQuery(value)
                        }}>{label}</button>
                ))} 
            </div>
            <h1 className="text-3xl text-center my-8">Top #100 Tracks</h1>
            <div className="flex flex-col gap-4 pb-20">
            {data.map((e, i) => (
                    <motion.div
                        initial={{
                            y: 100,
                            scale: 1,
                            opacity: 0
                        }}
                        animate={{
                            y: 0,
                            scale: [1, 1.05, 1],
                            opacity: 1
                        }}
                        
                        transition={{
                            delay: i * 0.07
                        }} 
                        key={i} 
                        className="flex mx-5 py-4  bg-[#252133] rounded-lg">
                        {(i + 1) < 10 ? <p className="text-pink-secondary text-5xl font-bold pl-7 pr-9 self-center">{i + 1}</p> : <p className="text-[#E600F8] text-5xl self-center font-bold pl-4 pr-5">{i + 1}</p>}
                        <div className="flex flex-col gap-1 w-screen">
                            <p className="text-xl pr-4 text-white-terciary">{e[0]}</p>
                            <div className="flex justify-between">
                                <p className="text-md text-white-terciary text-sm">{e[1]["artist"]}</p>
                                <p className="text-sm text-end pr-4 self-end text-[#65636F]">{e[1]["songMsPlayed"]} min</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}