import {Search} from "../../assets/icons"
import {Logo} from "../../assets/images"
export default function Header({placeholder}:{placeholder:string}) {
  return (
    <>
      <div className="grid grid-cols-3 items-center pt-1 px-2 bg-primary w-screen h-12 z-10">
        <img src={Logo} alt="Logo" className="w-10 h-10"/>
        <div className="justify-self-center flex justify-end items-center w-55 h-8 bg-bg-light rounded-md shadow-md">
          <input className="w-45 flex color-black font-Manrope ml-2 text-[0.625rem] focus:outline-none" placeholder={placeholder} />
          <div className="w-8 h-full bg-bg flex justify-center items-center rounded-r-md justify-self-end"><Search className="w-5 h-5" /></div>
        </div>
        
      </div> 
    </>
  )
}
