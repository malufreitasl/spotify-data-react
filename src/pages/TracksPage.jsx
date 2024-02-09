// Assets import
import {
    getTopSongs,
    filterFourWeeks,
    filterSixMonths,
    filterLastYear,
} from "../common";
import { useState } from "react";
import history from "../assets/data/history.json"
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import { ListTopTracks } from "../components/ListTopTracks.jsx";
import { Footer } from "../components/Footer.jsx";

export function TracksPage() {
    const [topAllSongs, setTopAllSongs] = useState(getTopSongs(history))

    const handleChangeTrackQuery = (functionKey) => {
        setTopAllSongs(undefined)

        const map = new Map([
            ["always", () => history],
            ["4-weeks", filterFourWeeks],
            ["6-months", filterSixMonths],
            ["last-year", filterLastYear],
        ])
        
        const filter = map.get(functionKey)
        
        setTimeout(() => {
            setTopAllSongs(() => {
                const newState = getTopSongs(filter())
                
                return newState
            })
        }, 0);
    }
    return (
        <div className="h-screen">
            <div className="flex flex-col justify-between">
                <Logo className="w-12 h-12 my-5 self-center" />
                <ListTopTracks handleChangeTrackQuery={ handleChangeTrackQuery } data={topAllSongs}/>
            </div>
            <Footer bgToChange={"tracks"}/>
        </div>
    )
}