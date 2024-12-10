import SideBar from "@/components/layout/SideBar";

const Bookmarks = () => {
  return (
    <div className="h-full flex">
      <div className="flex-grow max-w-[600px] border-x px-4">Bookmarks</div>
      <SideBar />
    </div>
  );
};

export default Bookmarks;
