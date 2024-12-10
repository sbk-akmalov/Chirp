import { Link, useNavigate } from "react-router-dom";
import { TbMenu2 } from "react-icons/tb";
import useScroll from "@/hooks/useScroll";
import useAuth from "@/hooks/useAuth";
import { logout } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import queryClient from "@/config/queryClient";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import LoadingPage from "../LoadingPage";

const TopNav = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear();
      navigate("/auth", { replace: true });
    },
  });

  const handleLogout = () => {
    mutate();
  };

  const { isScrollingDown, isAtTop, isAtBottom } = useScroll();
  const shouldShowTopNav = isAtTop || isAtBottom || !isScrollingDown;

  if (isPending) {
    return <LoadingPage />;
  }

  return (
    <div
      className={`sm:hidden px-4 bg-custom-white fixed ${
        shouldShowTopNav ? "top-0" : "-top-[53px]"
      } w-full h-[53px] flex items-center justify-center z-10 border-b border-custom-gray-2 transition-all duration-300`}
    >
      <Link to="/" className="w-[34px] h-[34px]">
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
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button className="absolute right-4 top-[50%] -translate-y-[50%]">
            <TbMenu2 className="w-[28px] h-[28px]" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="block sm:hidden mt-[10px] mr-[10px] w-[280px]"
        >
          <DropdownMenuItem onClick={() => navigate("/settings")}>
            Settings and privacy
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            Log out @{user?.username}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TopNav;
