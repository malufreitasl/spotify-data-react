// Assets import
import {
    getTopSongsArtist,
    filterFourWeeks,
    filterSixMonths,
    filterLastYear,
} from "../common";
import history from "../assets/data/history.json";
import { useState } from "react";
import { Footer } from "../components/Footer.jsx";
import { ListTop20Tracks } from '../components/ListTop20Tracks.jsx';

export function Top20TracksPage({artist, onBack}){
    const [topTracksArtist, setTopTracksArtist] = useState(getTopSongsArtist(artist))

    const handleChangeTrackArtistQuery = (functionKey) => {
        setTopTracksArtist(undefined)

        const map = new Map([
            ["always", () => history],
            ["4-weeks", filterFourWeeks],
            ["6-months", filterSixMonths],
            ["last-year", filterLastYear],
        ])

        const filter = map.get(functionKey)

        setTimeout(() => {
            setTopTracksArtist(() => {
                const newState = getTopSongsArtist(artist, filter())

                return newState
            })
        }, 0);
    }

    return (
        <div className="h-screen">
        <div className="flex flex-col justify-between">
            <ListTop20Tracks 
                artist={artist} 
                handleChangeTrackArtistQuery={handleChangeTrackArtistQuery} 
                data={topTracksArtist} 
                onBackButton={onBack}/>
        </div>
        <Footer bgToChange={"artists"}/>
    </div>
    )
}