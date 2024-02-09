// Generic imports
import { Link } from "react-router-dom";
import { ImStatsDots } from "react-icons/im";
import { FaMicrophoneAlt } from "react-icons/fa";
import { MdAudiotrack } from "react-icons/md";
import { FaHome } from "react-icons/fa";

export function Footer({bgToChange}){
    return (
    <div className="flex bg-[#1C1827] py-2 justify-between items-center border-t-0 rounded-t-md fixed bottom-0 w-screen">
        <Link to="/">
            <div className="px-7 py-5">
                <FaHome color={`${bgToChange === "main" ? '#7C00FF' : '#65636F'}`} className="h-8 w-8" />
            </div>
        </Link>
        <Link to="/stats">
            <div className="px-7 py-5">
                <ImStatsDots color={`${bgToChange === "stats" ? '#7C00FF' : '#65636F'}`} className="h-7 w-7" />
            </div>
        </Link>

        <Link to="/artists">
            <div className="px-7 py-5">
                <FaMicrophoneAlt color={`${bgToChange === "artists" ? '#7C00FF' : '#65636F'}`} className="h-7 w-7" />
            </div>
        </Link>

        <Link to="/tracks">
            <div className="px-7 py-5">
                <MdAudiotrack color={`${bgToChange === "tracks" ? '#7C00FF' : '#65636F'}`} className="h-8 w-8" />
            </div>
        </Link>
    </div>
    )
}
