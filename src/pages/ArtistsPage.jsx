// Generic imports
import {
    filterFourWeeks,
    filterSixMonths,
    filterLastYear,
    getTopArtists
} from "../common/index.js";
import { useState } from "react";
import { ListTopArtists } from "../components/ListTopArtists.jsx";
import { ArtistInfo } from "./ArtistInfo.jsx";
import history from "../assets/data/history.json"

// Assets import
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import { Footer } from "../components/Footer.jsx";

export function ArtistsPage() {

    const [topArtists, setTopArtists] = useState(getTopArtists(history))
    const [selectedArtist, setSelected] = useState()

    const handleChangeArtistQuery = (functionKey) => {
        setTopArtists(undefined)

        const map = new Map([
            ["always", () => history],
            ["4-weeks", filterFourWeeks],
            ["6-months", filterSixMonths],
            ["last-year", filterLastYear],
        ])

        const filter = map.get(functionKey)

        setTimeout(() => {
            setTopArtists(() => {
                const newState = getTopArtists(filter())

                return newState
            })
        }, 0);
    }

    return (
        <div className="h-screen">
            <div className="flex flex-col justify-between">
                <Logo className="w-12 h-12 my-5 self-center" />
                {!selectedArtist ? (
                    <ListTopArtists
                        onSelectArtist={artist => setSelected(artist)}
                        handleChangeArtistQuery={handleChangeArtistQuery}
                        data={topArtists}
                    />
                ) : (
                    <ArtistInfo artist={selectedArtist} onBack={() => setSelected(undefined)}/>
                )}
            </div>
            <Footer bgToChange={"artists"}/>
        </div>
    )
}