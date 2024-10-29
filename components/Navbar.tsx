"use client";
import { useCallback, useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import AccountMenu from "./AccountMenu";

// 화면 아래로 스크롤할 시 어두워지게 하는 offset 값
const TOP_OFFSET = 66;

export default function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    // 스크롤 핸들링
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);
  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4
      md:px-16
      py-6
      flex
      flex-row
      items-center
      transition
      furation-500
      ${showBackground ? "bg-zinc-900 bg-opacity-90" : ""}`}
      >
        <img
          className="h-4 lg:h-7"
          src="/images/logo.png"
          alt="Logo"
        />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="홈" />
          <NavbarItem label="시리즈" />
          <NavbarItem label="영화" />
          <NavbarItem label="New! 요즘 대세 콘텐츠" />
          <NavbarItem label="내가 찜한 콘텐츠" />
          <NavbarItem label="언어" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">찾아보기</p>
          {/* 좁은 화면에선 Chevron을 클릭해서 메뉴가 드롭다운 되도록함 */}
          <BsChevronDown className={`text-white transition ${showMobileMenu ? "rotate-180" : ""}`} />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img
                src="/images/default-blue.png"
                alt=""
              />
            </div>
            <BsChevronDown className={`text-white transition ${showAccountMenu ? "rotate-180" : ""}`} />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
}
