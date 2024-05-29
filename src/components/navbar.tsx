import { Link } from "react-router-dom";
import logo from "../assets/6 CIPM.png";
export default function NavBar() {
  return (
    <>
      <header className="sm:px-2 px-1 py-1  w-full bg-caqui-200">
        <nav className="md:hidden sm:hidden lg:hidden  flex  max-container  ">
          <div className="text-gray-200">
            <Link className="text-sm text-stone-200	 font-bold" to="/home">
              {/* <img src={logo} height={30} width={30} /> */}
            </Link>
          </div>

          <div>
            <ul className="flex">
              <li className="mr-6">
                <Link className="text-sm text-stone-200	 font-bold" to="">
                  User{" "}
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
