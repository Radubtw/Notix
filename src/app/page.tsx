import Image from "next/image";
import Login from "../components/login"
import Menu from "../components/menu"
export default function Home() {
  return (
    // TODO: Check for session, if no session found then display login page, login interaction with database, afterwards, display menu 
    // <Login/> 
    <Menu/>
  )
}
