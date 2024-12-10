import StickyBox from "react-sticky-box";

const SideBar = () => {
  return (
    <StickyBox className="hidden lg:block w-[280px] xl:w-[360px] h-fit flex-none">
      <div className="py-4 pl-[30px] space-y-5">
        <div className="border rounded-xl h-[360px] p-4"></div>
        <div className="border rounded-xl h-[250px] p-4"></div>
      </div>
    </StickyBox>
  );
};

export default SideBar;
