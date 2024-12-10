import SideBar from "@/components/layout/SideBar";

const Home = () => {
  return (
    <div className="h-full flex">
      <div className="flex-grow max-w-[600px] border-x px-4">Home</div>
      <SideBar />
    </div>
  );
};

export default Home;
