// Generic imports
import {
    getTotalPlaysArtist,
    getTotalDifSongsArtist,
    getPercPlaysArtist,
    getMinListenedArtist,
    getTopPositionArtist,
    getSeasonArtist
} from "../common"
import { useState, useEffect } from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Top20TracksPage } from "./Top20TracksPage";

export function ArtistInfo({ artist, onBack }) {
    const [isSeeingTop20, setIsSeeing] = useState(false)
    const [imgUrl, setUrl] = useState("")
    
    useEffect(() => {

        async function fetchData() {
            const res = await fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    auth: "BYTES4FUTURE #7",
                    name: artist,
                    type: "artist"
                })
            })
            if (res.status === 200) {
                const body = await res.json()
                console.log(body)
                setUrl(body.imagePath)
            }
        }

        fetchData()


    }, [artist])

    return (
        <div className="flex flex-col mb-24">
            {!isSeeingTop20 ? (
                <>
                    <div className="flex flex-col gap-5">
                        <div className="flex justify-between mx-2 mb-3">
                            <button className="flex" onClick={onBack}>
                                <MdOutlineKeyboardArrowLeft className="h-7 w-7" />
                                <p className="self-center text-sm">GO BACK</p>
                            </button>
                            <button className="flex" onClick={() => setIsSeeing(true)}>
                                <p className="self-center text-sm">TOP 20 TRACKS</p>
                                <MdOutlineKeyboardArrowRight className="h-7 w-7" />
                            </button>
                        </div>
                        <div className="justify-self-center">
                            <h1 className="text-3xl text-center mr-5">
                                {artist}
                            </h1>
                        </div>
                        <div className="mb-7 flex justify-center">
                            <img src={imgUrl} alt="Artist"/>
                        </div>

                    </div>

                    <div className="flex flex-col mt-5 mx-5 gap-7">
                        <div className="flex justify-between py-4 px-6 bg-[#252133] rounded-lg">
                            <p className="text-white-terciary">Total streams</p>
                            <p className="text-pink-secondary text-xl font-semibold">{getTotalPlaysArtist(artist)}</p>
                        </div>
                        <div className="flex justify-center py-4 px-6 bg-[#252133] rounded-lg text-center">
                            <p className="text-white-terciary">Listened to<b className="text-pink-secondary text-xl font-semibold"> {getTotalDifSongsArtist(artist)} </b>tracks</p>
                        </div>
                        <div className="flex text-center justify-between">
                            <div className="flex flex-col gap-2 py-4 px-4 bg-[#252133] rounded-lg">
                                <p className="text-white-terciary">Represents</p>
                                <p className="text-pink-secondary text-2xl font-semibold ">{getPercPlaysArtist(artist)} %</p>
                                <p className="text-white-terciary">of your streams</p>
                            </div>
                            <div className="flex flex-col gap-2 py-4 px-7 justify-between bg-[#252133] rounded-lg text-center">
                                <p className="text-white-terciary">Listened</p>
                                <p className="text-pink-secondary text-2xl font-semibold">{getMinListenedArtist(artist)}</p>
                                <p className="text-white-terciary">minutes</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 item-center py-4 px-6 bg-[#252133] rounded-lg text-center">
                            <p className="text-pink-secondary text-3xl font-semibold">#{getTopPositionArtist(artist)}</p>
                            <p className="text-white-terciary">In your top 100 artists</p>
                        </div>
                        <div className="flex flex-col gap-2 py-4 px-6 bg-[#252133] items-center rounded-lg">
                            <p className="text-center text-white-terciary">The season you streamed the most was:</p>
                            <p className="text-pink-secondary text-2xl font-semibold">{getSeasonArtist(artist)}</p>
                        </div>
                    </div>
                </>
            ) : <>
                <Top20TracksPage artist={artist} onBack={() => setIsSeeing(false)} />
            </>}
        </div>
    )
}