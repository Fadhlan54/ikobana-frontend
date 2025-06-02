import SideNavContent from "./SideNavContent";

export default function SideNav() {
  return (
    <div className="hidden h-[calc(100svh_-_70px)] w-[15rem] overflow-y-auto border-r border-neutral-3 bg-white py-4 scrollbar-webkit lg:block shrink-0">
      <SideNavContent />
    </div>
  );
}
