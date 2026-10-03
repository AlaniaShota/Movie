import Navigation from "./navigation";
import { IoIosSearch } from "react-icons/io";

export default function Header() {
  return (
    <header className="flex flex-row items-center justify-between ">
      <div className="flex flex-row items-center justify-between gap-6 w-auto">
      
        <h1 className=" cursor-default text-brand-red text-2xl font-medium">MovieDB</h1>
        <Navigation />
      </div>
      <IoIosSearch className="text-2xl"/>
    </header>
  );
}
//bg-brand-helmet flex gap-6 items-center justify-between p-6 my-6 m-auto rounded-2xl w-auto max-w-7xl
