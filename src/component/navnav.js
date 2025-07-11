import { Link } from "react-router-dom"

export const  Navnav = ()=>{

    return(
        <nav  className="navbar navbar-expand-lg px-4 navClass" >
            <Link className="navbar-brand p-2 navLink" style={{borderRadius:'5%',color:'white'}} to="/">🎬 MovieApp</Link>
        </nav>
    )
}