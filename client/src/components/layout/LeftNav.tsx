import useAuth from "@/hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  TbHome,
  TbHomeFilled,
  TbSearch,
  TbBell,
  TbBellFilled,
  TbMail,
  TbMailFilled,
  TbBookmark,
  TbBookmarkFilled,
  TbUser,
  TbUserFilled,
  TbDots,
  TbPlus,
} from "react-icons/tb";
import defaultAvatar from "@/assets/defaultAvatar.png";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/lib/api";
import queryClient from "@/config/queryClient";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import LoadingPage from "../LoadingPage";

const LeftNav = () => {
  const { user } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownAlign, setDropdownAlign] = useState<"start" | "center">(
    "start"
  );

  useEffect(() => {
    const updateAlign = () => {
      if (window.matchMedia("(min-width: 1200px)").matches) {
        setDropdownAlign("center");
      } else {
        setDropdownAlign("start");
      }
    };

    updateAlign();

    window.addEventListener("resize", updateAlign);

    return () => {
      window.removeEventListener("resize", updateAlign);
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear();
      navigate("/auth", { replace: true });
    },
  });

  const handleSignOut = () => {
    mutate();
  };

  if (isPending) {
    return <LoadingPage />;
  }

  return (
    <div className="hidden px-[6px] xl:px-3 py-4 sm:flex flex-col items-center xl:items-start justify-between sticky top-0 left-0 h-screen xl:w-[280px] bg-custom-white">
      <div className="flex flex-col items-center w-full xl:items-start gap-4">
        <Link to="/" className="w-9 h-9 xl:ml-3">
          <svg
            viewBox="0 0 800 800"
            className="fill-custom-blue-3 dark:fill-[#F5F5F5]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              transform="translate(776,19)"
              d="m0 0 4 1v13l-5 47-8 53-9 47-9 40-11 42-12 39-14 41-10 24-4 4-126 63-19 10-6 3h116l-2 5-10 18-14 22-10 14-8 11-9 4-81 27-41 14-54 18-23 8h-2v2l2-1h138v3l-16 13-19 13-16 10-16 9-25 12-27 10-25 7-29 6-40 5-42 4-43 3-46 2-40 1-25 25-4 5-7 6-5 6-7 6-5 6-7 6-5 6-7 6-5 6-8 7-9 6-10 3h-11l-10-3-8-5-7-8-4-8-1-4v-16l4-10 8-10 178-178h2l2-4h2l2-4h2l2-4h2l2-4h2l2-4h2l2-4 6-5 5-6 7-6 5-6 7-6 5-6 7-6 5-6 7-6 5-6 7-6 5-6 7-6 105-105 4-8 1-9-3-9-6-7-9-4h-10l-8 4-10 9-258 258h-2l1-31 4-57 4-35 5-31 7-30 11-32 12-27 13-24 14-21 10-14 10-12 7-9h2l2-4 10-10 6-7h2v-2l8-7 15-14 14-11 13-10 17-12 23-15 24-14 28-15 34-16 32-13 26-10 43-14 42-12 36-9 42-9 39-7 46-7 47-5z"
            />
          </svg>
        </Link>

        <div className="flex flex-col items-center w-full">
          <Link to="/" className="group rounded-full xl:w-full">
            <div className="flex w-fit items-center gap-[14px] p-[11px] xl:py-[10px] xl:pl-[16px] xl:pr-[26px] group-hover:bg-custom-gray-2 rounded-full">
              {isActive("/") ? (
                <TbHomeFilled className="w-[29px] h-[29px]" />
              ) : (
                <TbHome className="w-[29px] h-[29px]" />
              )}
              <span
                className={`hidden xl:inline-block text-xl text-custom-black-2 ${
                  isActive("/") ? "font-semibold" : "font-normal"
                }`}
              >
                Home
              </span>
            </div>
          </Link>

          <Link to="/search" className="group rounded-full xl:w-full">
            <div className="flex w-fit items-center gap-[14px] p-[11px] xl:py-[10px] xl:pl-[16px] xl:pr-[26px] group-hover:bg-custom-gray-2 rounded-full">
              {isActive("/search") ? (
                <TbSearch className="w-[29px] h-[29px]" />
              ) : (
                <TbSearch className="w-[29px] h-[29px]" />
              )}
              <span
                className={`hidden xl:inline-block text-xl text-custom-black-2 ${
                  isActive("/search") ? "font-semibold" : "font-normal"
                }`}
              >
                Search
              </span>
            </div>
          </Link>

          <Link to="/notifications" className="group rounded-full xl:w-full">
            <div className="flex w-fit items-center gap-[14px] p-[11px] xl:py-[10px] xl:pl-[16px] xl:pr-[26px] group-hover:bg-custom-gray-2 rounded-full">
              {isActive("/notifications") ? (
                <TbBellFilled className="w-[29px] h-[29px]" />
              ) : (
                <TbBell className="w-[29px] h-[29px]" />
              )}
              <span
                className={`hidden xl:inline-block text-xl text-custom-black-2 ${
                  isActive("/notifications") ? "font-semibold" : "font-normal"
                }`}
              >
                Notifications
              </span>
            </div>
          </Link>

          <Link to="/messages" className="group rounded-full xl:w-full">
            <div className="flex w-fit items-center gap-[14px] p-[11px] xl:py-[10px] xl:pl-[16px] xl:pr-[26px] group-hover:bg-custom-gray-2 rounded-full">
              {isActive("/messages") ? (
                <TbMailFilled className="w-[29px] h-[29px]" />
              ) : (
                <TbMail className="w-[29px] h-[29px]" />
              )}
              <span
                className={`hidden xl:inline-block text-xl text-custom-black-2 ${
                  isActive("/messages") ? "font-semibold" : "font-normal"
                }`}
              >
                Messages
              </span>
            </div>
          </Link>

          <Link to="/bookmarks" className="group rounded-full xl:w-full">
            <div className="flex w-fit items-center gap-[14px] p-[11px] xl:py-[10px] xl:pl-[16px] xl:pr-[26px] group-hover:bg-custom-gray-2 rounded-full">
              {isActive("/bookmarks") ? (
                <TbBookmarkFilled className="w-[29px] h-[29px]" />
              ) : (
                <TbBookmark className="w-[29px] h-[29px]" />
              )}
              <span
                className={`hidden xl:inline-block text-xl text-custom-black-2 ${
                  isActive("/bookmarks") ? "font-semibold" : "font-normal"
                }`}
              >
                Bookmarks
              </span>
            </div>
          </Link>

          <Link
            to={`/${user?.username}`}
            className="group rounded-full xl:w-full"
          >
            <div className="flex w-fit items-center gap-[14px] p-[11px] xl:py-[10px] xl:pl-[16px] xl:pr-[26px] group-hover:bg-custom-gray-2 rounded-full">
              {isActive(`/${user?.username}`) ? (
                <TbUserFilled className="w-[29px] h-[29px]" />
              ) : (
                <TbUser className="w-[29px] h-[29px]" />
              )}
              <span
                className={`hidden xl:inline-block text-xl text-custom-black-2 ${
                  isActive(`/${user?.username}`)
                    ? "font-semibold"
                    : "font-normal"
                }`}
              >
                Profile
              </span>
            </div>
          </Link>

          <button className="flex items-center justify-center bg-custom-blue-3 rounded-full text-custom-white w-[54px] h-[54px] xl:w-full mt-3 text-lg font-semibold hover:bg-custom-blue-4">
            <p className="hidden xl:block">Post</p>
            <TbPlus className="xl:hidden w-[25px] h-[25px]" />
          </button>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full outline-none">
          <button className="p-[10px] rounded-full hover:bg-custom-gray-2 cursor-pointer w-full flex items-center justify-between">
            <div className="flex items-center gap-[11px]">
              <div className="w-11 h-11 rounded-full overflow-hidden object-cover">
                <img src={user?.avatar || defaultAvatar} alt="Avatar" />
              </div>
              <div className="leading-[22px] text-start hidden xl:block">
                <h1 className="font-semibold">{user?.name}</h1>
                <h4>@{user?.username}</h4>
              </div>
            </div>
            <div className="hidden xl:block">
              <TbDots className="w-[19px] h-[19px]" />
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={dropdownAlign}
          className="hidden sm:block ml-[2px] w-[300px]"
        >
          <DropdownMenuItem onClick={() => navigate("/settings")}>
            Settings and privacy
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut}>
            Log out @{user?.username}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LeftNav;
