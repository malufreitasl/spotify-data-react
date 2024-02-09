// Generic Imports
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { motion } from "framer-motion";

const timeRanges = [
    {
        label: "Always",
        value: "always"
    },
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
    }
]


export function ListTop20Tracks({ artist, onBackButton, handleChangeTrackArtistQuery, data }) {
    const [activeButton, setActiveButton] = useState()

    if (data === undefined) {
        return (
            <div>
                <div className="flex justify-between mx-5">
                    {timeRanges.map(({ label, value }) => (
                        <button className={`text-sm pb-1 ${activeButton === value ? 'border-b' : 'text-white'}`} onClick={() => {
                            setActiveButton(value)
                            handleChangeTrackArtistQuery(value)
                        }}>{label}</button>
                    ))}
                </div>
                <div className="flex items-center justify-center w-screen h-screen pb-56">
                    <div className="self-center animate-spin">
                        <CgSpinner color="#7C00FF" className="h-24 w-24" />
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
                        handleChangeTrackArtistQuery(value)
                    }}>{label}</button>
                ))}
            </div>
            <div className="flex items-center mt-7 mx-5 gap-16">
                <button onClick={onBackButton}>
                    <MdOutlineKeyboardArrowLeft className="h-10 w-10" />
                </button>
                <div className="flex flex-col">
                    <h1 className="text-3xl text-center">Top #20</h1>
                </div>
            </div>
            <h1 className="text-2xl text-center mb-7">{artist}</h1>
            <div className="flex flex-col gap-4 pb-10">
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
                    className="flex mx-5 py-4 bg-[#252133] rounded-lg">
                        {(i + 1) < 10 ? <p className="text-pink-secondary text-5xl font-bold pl-7 pr-9 self-center">{i + 1}</p> : <p className="text-[#E600F8] text-5xl self-center font-bold pl-4 pr-5">{i + 1}</p>}
                        <div className="flex flex-col gap-2 w-screen">
                            <p className="text-xl pr-4 text-white-terciary">{e[0]}</p>
                            <p className="text-sm pr-4 text-[#65636F]">{e[1]["songMsPlayed"]} min</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
