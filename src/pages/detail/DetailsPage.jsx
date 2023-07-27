import Navbar from "../../layout/navbar/navbar"
import Header from "../../components/header/Header"
import { useParams } from "react-router-dom"
import './detailsPage.css'

export default function DetailsPage(){
    const {id}= useParams()
    return(
        <div>
            <Navbar />
            <Header type="list" />
            <div className="mt-4 bg-gray-100 0mx-8 px-8 py-8">
                <h1 className="text-2xl">{id}</h1>
            </div>
        </div>
    )
}