// Generic imports
import {
  getTotalPlays,
  getDifferentSongs,
  getMinutesListened,
  getAverageDailyListened,
  getMostListenedHour,
  getMostListenedSeason
} from "../common/index.js";

// Assets import
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import { Footer } from "../components/Footer.jsx";

export function StatsPage() {
  return (
    <div>
      <div className="flex flex-col mb-24">
        <Logo className="w-12 h-12 my-5 self-center"/>
        <h1 className="text-3xl text-center mb-7">Overview All Data</h1>
        
        <div className="flex flex-col gap-7 mx-7 mb-5">
          <div className="flex justify-between py-4 px-6 bg-[#252133] rounded-lg">
            <p className="text-white-terciary">Total streams</p>
            <p className="text-pink-secondary text-xl font-semibold">{getTotalPlays()}</p>
          </div>
            
          <div className="flex justify-between py-4 px-6 bg-[#252133] rounded-lg text-center">
            <p className="text-white-terciary">Listened for nealy<b className="text-pink-secondary text-xl font-semibold"> {getAverageDailyListened()} </b>minutes every day</p>
          </div>

          <div className="flex justify-between text-center">
            <div className="flex flex-col py-4 px-7 gap-2 bg-[#252133] rounded-lg">
              <p className="text-pink-secondary text-2xl font-semibold ">{getDifferentSongs()}</p>
              <div>
                <p className="text-white-terciary">Tracks were</p>
                <p className="text-white-terciary">streamed</p>
              </div>
            </div>
            <div className="flex flex-col py-4 px-7 gap-2 justify-between bg-[#252133] rounded-lg text-center">
              <p className="text-white-terciary">Listened</p>
              <p className="text-pink-secondary text-2xl font-semibold">{getMinutesListened()}</p>
              <p className="text-white-terciary">minutes</p>
            </div>
          </div>

          <div className="flex justify-between gap-10 py-4 px-6 bg-[#252133] rounded-lg">
            <p className="text-pink-secondary self-center text-2xl font-semibold">{getMostListenedHour()}:00h</p>
            <p className="text-white-terciary">was your favorite hour</p>
          </div>

          <div className="flex flex-col gap-2 py-4 px-6 bg-[#252133] items-center rounded-lg">
            <p className="text-center text-white-terciary">The season you streamed the most tracks was:</p>
            <p className="text-pink-secondary text-2xl font-semibold">{getMostListenedSeason()}</p>
          </div>
        </div>
      </div>
      <Footer bgToChange={"stats"}/>
    </div>
  )
}