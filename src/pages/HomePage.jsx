// Generic imports
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import { Footer } from '../components/Footer';

export function HomePage() {
    return (
        <div className="h-screen flex flex-col justify-center">
            <div className="flex flex-col items-center px-5 mb-28 text-center">
                <Logo/>
            </div>
            <Footer bgToChange={"main"}/>
        </div>
    )
}