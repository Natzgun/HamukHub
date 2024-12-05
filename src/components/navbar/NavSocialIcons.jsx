import { HiArrowNarrowRight } from "react-icons/hi";
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdOutlineScience } from "react-icons/md";

const NavSocialIcons = () => {
  return (
    <div className="hidden  md:flex fixed flex-col top-[35%] left-0 text-gray-300">
      <ul>
        <li className="w-[160px] h-[60px] bg-slate-600 duration-300 flex justify-between items-center ml-[-95px] hover:ml-[-10px]">
          <a
            className="flex justify-around items-center w-full"
            href="https://github.com/Natzgun"
            target="_blank"
          >
            Github <FaGithub size={30} />
          </a>
        </li>

        <li className="w-[160px] h-[60px] bg-slate-600 duration-300 flex justify-between items-center ml-[-95px] hover:ml-[-10px]">
          <a
            className="flex justify-around items-center w-full"
            href="https://www.gob.pe/pronabec"
            target="_blank"
          >
            Pronabec <FaLinkedin size={30} />
          </a>
        </li>

        <li className="w-[160px] h-[60px] bg-slate-600 duration-300 flex justify-between items-center ml-[-95px] hover:ml-[-10px]">
          <a
            className="flex justify-around items-center w-full"
            href="https://github.com/Natzgun"
            target="_blank"
          >
            Research <MdOutlineScience size={30} />
          </a>
        </li>

        <li className="w-[160px] h-[60px] bg-slate-600 duration-300 flex justify-between items-center ml-[-95px] hover:ml-[-10px]">
          <a
            className="flex justify-around items-center w-full"
            href="https://github.com/Natzgun"
            target="_blank"
          >
            Twitter <FaTwitter size={30} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NavSocialIcons;
