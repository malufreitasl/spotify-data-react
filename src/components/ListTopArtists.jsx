// Icons import
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { motion } from "framer-motion"

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

export function ListTopArtists({ onSelectArtist, handleChangeArtistQuery, data }) {
    const [activeButton, setActiveButton] = useState()
    if (data === undefined) {
        return (
            <div>
                <div className="flex justify-between mx-5">
                    {timeRanges.map(({ label, value }) => (
                        <button className={`text-sm pb-1 ${activeButton === value ? 'border-b' : 'text-white'}`} onClick={() => {
                            setActiveButton(value)
                            handleChangeArtistQuery(value)
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
                            handleChangeArtistQuery(value)
                        }}>{label}</button>
                ))}
            </div>
            <h1 className="text-3xl text-center my-8">Top #100 Artists</h1>
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
                        onClick={() => onSelectArtist(e[0])}
                        className="cursor-pointer flex mx-5 bg-[#252133] rounded-lg">
                        {(i + 1) < 10 ? <p className="text-pink-secondary text-5xl font-bold pl-7 pr-9 self-center">{i + 1}</p> : <p className="text-[#E600F8] text-5xl self-center font-bold pl-4 pr-5">{i + 1}</p>}
                        <div className="flex w-screen justify-between">
                            <div className="flex flex-col gap-1 py-4 ">
                                <p className="text-xl text-white-terciary">{e[0]}</p>
                                <p className="text-sm text-[#65636F] font-semibold">{e[1]} Streams</p>
                            </div>
                            <div className="flex items-center justify-center bg-[#36333b] w-14 rounded-r-lg">
                                <MdOutlineKeyboardArrowRight color="#E600F8" className="self-center w-10 h-10" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}