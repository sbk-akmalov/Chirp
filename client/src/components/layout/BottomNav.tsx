import useAuth from "@/hooks/useAuth";
import { Link, useLocation } from "react-router-dom";
import {
  TbHome,
  TbHomeFilled,
  TbBell,
  TbBellFilled,
  TbMail,
  TbMailFilled,
  TbBookmark,
  TbBookmarkFilled,
  TbUser,
  TbUserFilled,
  TbZoomFilled,
  TbZoom,
  TbPlus,
} from "react-icons/tb";
import useScroll from "@/hooks/useScroll";

const BottomNav = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const { isScrollingDown, isAtTop, isAtBottom } = useScroll();
  const shouldShowBottomNav = isAtTop || isAtBottom || !isScrollingDown;

  return (
    <div
      className={`sm:hidden border-custom-gray-2 border-t bg-custom-white fixed bottom-0 w-full h-[53px] p-[6px] flex items-center justify-around z-10 ${
        shouldShowBottomNav ? "opacity-100" : "opacity-50"
      } transition-opacity duration-300`}
    >
      <Link to="/">
        {isActive("/") ? (
          <TbHomeFilled className="w-[30px] h-[30px]" />
        ) : (
          <TbHome className="w-[30px] h-[30px] " />
        )}
      </Link>

      <Link to="/search">
        {isActive("/search") ? (
          <TbZoomFilled className="w-[30px] h-[30px]" />
        ) : (
          <TbZoom className="w-[30px] h-[30px] " />
        )}
      </Link>

      <Link to="/notifications">
        {isActive("/notifications") ? (
          <TbBellFilled className="w-[30px] h-[30px]" />
        ) : (
          <TbBell className="w-[30px] h-[30px] " />
        )}
      </Link>

      <Link to="/messages">
        {isActive("/messages") ? (
          <TbMailFilled className="w-[30px] h-[30px]" />
        ) : (
          <TbMail className="w-[30px] h-[30px] " />
        )}
      </Link>

      <Link to="/bookmarks">
        {isActive("/bookmarks") ? (
          <TbBookmarkFilled className="w-[30px] h-[30px]" />
        ) : (
          <TbBookmark className="w-[30px] h-[30px] " />
        )}
      </Link>

      <Link to={`/${user?.username}`}>
        {isActive(`/${user?.username}`) ? (
          <TbUserFilled className="w-[30px] h-[30px]" />
        ) : (
          <TbUser className="w-[30px] h-[30px] " />
        )}
      </Link>

      <button className="absolute bottom-[75px] right-[18px] flex items-center justify-center bg-custom-blue-3 rounded-full text-custom-white w-[54px] h-[54px] hover:bg-custom-blue-4">
        <TbPlus className="w-[25px] h-[25px]" />
      </button>
    </div>
  );
};

export default BottomNav;
