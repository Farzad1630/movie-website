import { Link } from "react-router-dom"

export const  Navnav = ()=>{

    return(
        <nav  className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <Link className="navbar-brand p-2 " style={{border: '1px solid gray ' , borderRadius:'5%'}} to="/">🎬 MovieApp</Link>
        </nav>
    )
}