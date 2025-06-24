import React, { useState } from "react";
import { Link } from "react-router";
import { HelpCircle, LogOut, Search, Settings } from "lucide-react";
import Logo from "../assets/Logo.png";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);

  const avatarUrl = user
    ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        user.username
      )}`
    : "";

  const handleLogout = async () => {
    const { message } = await logout();
    toast.success(message);
    setShowMenu(false);
  };

  return (
    <nav className="bg-black text-white flex justify-between items-center p-4 h-20 text-sm md:text-[15px] font-medium text-nowrap">
      <Link to={"/"}>
        <img
          src={Logo}
          alt="Logo"
          className="w-24 cursor-pointer brightness-125"
        />
      </Link>

      <ul className="hidden xl:flex space-x-6">
        <Link to={"/"}>
        <li className="cursor-pointer hover:text-[#e50914]">Home</li>
        </Link>
        <Link to={"/tv"}>
        <li className="cursor-pointer hover:text-[#e50914]">TV Shows</li>
        </Link>
        <Link to={"/movies-section"}>
        <li className="cursor-pointer hover:text-[#e50914]">Movies</li>
        </Link>
        <Link to={"/anime-section"}>
        <li className="cursor-pointer hover:text-[#e50914]">Anime</li>
        </Link>
        <Link to={"/games-section"}>
        <li className="cursor-pointer hover:text-[#e50914]">Games</li>
        </Link>
        <Link to={"/new-and-popular-section"}>
        <li className="cursor-pointer hover:text-[#e50914]">New & Popular</li>
        </Link>
        <Link to={"/upcoming-section"}>
        <li className="cursor-pointer hover:text-[#e50914]">Upcoming</li>
        </Link>
      </ul>
      <div className="flex items-center space-x-4 relative">
        <div className="relative hidden md:inline-flex">
          <input
            className="bg-[#333333] px-4 py-2 rounded-2xl min-w-72 pr-10 outline-none"
            type="text"
            placeholder="search..."
          />
          <Search className="absolute top-2 right-4 w-5 h-5" />
        </div>

        <Link to={user ? "ai-recommendations" : "signin"}>
        <button className="bg-[#e50914] px-5 py-2 rounded text-white cursor-pointer">
          Get AI Movie Suggestion
        </button>
        </Link>


        {!user ? (
          <Link to={"/signin"}>
            <button className="border border-[#333333] py-2 px-4 rounded cursor-pointer hover:border-[#e50914] hover:text-[#e50914]">
              Sign In
            </button>
          </Link>
        ) : (
          <div className="text-white font-medium">
            <img
              onClick={() => setShowMenu(!showMenu)}
              src={avatarUrl}
              alt=""
              className="w-10 h-10 rounded-full border-2 border-[#e50914] cursor-pointer"
            />
            {showMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-[#232323] bg-opacity-95 rounded-lg z-50 shadow-lg py-4 px-3 flex flex-col gap-2 border border-[#333333]">
                <div className="flex flex-col items-center mb-2">
                  <span className="text-white font-semibold text-base">
                    {user.username}
                  </span>
                  <span className="text-xs text-gray-400">{user.email}</span>
                </div>
                <button className="flex items-center px-4 py-3 rounded-lg gap-8 text-white bg-[#181818] hover:ring-1 ring-[#e50914] cursor-pointer">
                  <HelpCircle className="w-6 h-6" />
                  Help Center
                </button>

                <button className="flex items-center px-4 py-3 rounded-lg gap-8 text-white bg-[#181818] hover:ring-1 ring-[#e50914] cursor-pointer">
                  <Settings className="w-6 h-6" />
                  Settings
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-3 rounded-lg gap-8 text-white bg-[#181818] hover:ring-1 ring-[#e50914] cursor-pointer"
                >
                  <LogOut className="w-6 h-6" />
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
