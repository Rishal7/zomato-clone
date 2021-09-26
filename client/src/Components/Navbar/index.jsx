import React, { useState } from "react";

// Icons
import { FaUserAlt } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { RiSearch2Line } from "react-icons/ri";

function MobileNav({ user, isDropdownOpen, setIsDropdownOpen }) {
  return (
    <>
      <div className="flex w-full items-center justify-between lg:hidden">
        <div className="w-28">
          <img
            src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png"
            alt="logo"
            className="w-full h-full"
          />
        </div>
        <div className="flex items-center gap-3 relative">
          <button className="bg-zomato-400 text-white py-2 px-3 rounded-full">
            Use App
          </button>
          {user ? (
            <>
              <div
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="border p-2 border-gray-300 text-zomato-400 w-14 h-14 rounded-full"
              >
                <img
                  src="data:image/jpeg;base64,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"
                  alt="avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              {isDropdownOpen && (
                <div className="absolute shadow-lg top-16 right-1 p-3 bg-white w-24 z-30 flex-col gap-2 border-2 border-gray-300 rounded">
                  <button>Sign Out</button>
                </div>
              )}
            </>
          ) : (
            <>
              <span
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="border p-2 border-gray-300 text-zomato-400 rounded-full"
              >
                <FaUserAlt />
              </span>
              {isDropdownOpen && (
                <div className="absolute shadow-lg  p-3 -bottom-20 -right-4 w-full bg-white flex-col gap-2">
                  <button>Sign In</button>
                  <button>Sign Out</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

function LargeNav({ user, isDropdownOpen, setIsDropdownOpen }) {
  return (
    <>
      <div className="hidden lg:inline container px-48 mx-auto">
        <div className="hidden gap-4 w-full items-center justify-around lg:flex">
          <div className="w-34">
            <img
              src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png"
              alt="logo"
              className="w-full h-full"
            />
          </div>
          <div className="w-3/4 bg-white shadow-md p-3 flex items-center gap-3 border-gray-200 rounded">
            <div className="flex items-center gap-2 border-r-2 border-gray-300 pr-2">
              <span className="text-zomato-300">
                <HiLocationMarker />
              </span>
              <input
                type="text"
                placeholder="Delhi NCR"
                className="focus:outline-none"
              />
              <IoMdArrowDropdown />
            </div>
            <div className="flex w-full items-center gap-3">
              <RiSearch2Line />
              <input
                type="text"
                placeholder="Search for restaurant, cuisine or a dish"
                className="w-full focus:outline-none"
              />
            </div>
          </div>
          {user ? (
            <div className="relative w-16">
              <div
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="border p-2 border-gray-300 text-zomato-400 w-full h-16 rounded-full"
              >
                <img
                  src="data:image/jpeg;base64,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"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              {isDropdownOpen && (
                <div className="absolute shadow-lg top-20 p-3 bg-white w-24 z-30 flex-col gap-2 border-2 border-gray-300 rounded">
                  <button>Signup</button>
                </div>
              )}
            </div>
          ) : (
            <div className="ml-28 flex gap-6">
              <button className="text-gray-500 text-xl hover:text-gray-800">
                Login
              </button>
              <button className="text-gray-500 text-xl hover:text-gray-800">
                Signup
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Navbar() {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  return (
    <>
      <nav className="p-4 flex bg-white shadow-md lg:shadow-none w-full items-center">
        <MobileNav
          user={user}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
        />
        <LargeNav
          user={user}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
        />
      </nav>
    </>
  );
}

export default Navbar;
