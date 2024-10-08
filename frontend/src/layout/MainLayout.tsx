import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { SidebarSlicePath, toggleSidebar } from '../provider/slice/Sidebar.slice';
import { MdOutlineSpaceDashboard } from "react-icons/md"; 
import { FiUser } from "react-icons/fi";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { FiBox } from "react-icons/fi";
import { Link, useLocation } from 'react-router-dom';
import { BiBriefcaseAlt2 } from "react-icons/bi";
import { HiMiniArchiveBoxXMark } from "react-icons/hi2";


const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const selector = useSelector(SidebarSlicePath);
  const dispatch = useDispatch();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <div className="flex items-start lg:gap-x-2">
        <Sidebar collapsed={selector.collapsed} breakPoint="lg" toggled={selector.toggle}>
          <Menu>
            <MenuItem className="lg:hidden" onClick={() => dispatch(toggleSidebar())}>
              {selector.toggle ? <IoIosArrowDropright className="text-2xl" /> : <IoIosArrowDropleft className="text-2xl" />}
            </MenuItem>

            <MenuItem 
              component={<Link to="/" />}
              icon={<MdOutlineSpaceDashboard className="text-2xl" />}
              className={isActive("/") ? "bg-blue-100 text-blue-800 font-bold shadow-lg rounded-lg" : "hover:bg-gray-100"}
            >
              Dashboard
            </MenuItem>

            <MenuItem 
              component={<Link to="/orders" />}
              icon={<FiBox className="text-2xl" />}
              className={isActive("/orders") ? "bg-blue-100 text-blue-800 font-bold shadow-lg rounded-lg" : "hover:bg-gray-100"}
            >
              Orders
            </MenuItem>

            <MenuItem 
              component={<Link to="/user" />}
              icon={<FiUser className="text-2xl" />}
              className={isActive("/user") ? "bg-blue-100 text-blue-800 font-bold shadow-lg rounded-lg" : "hover:bg-gray-100"}
            >
              Users
            </MenuItem>

            <MenuItem 
              component={<Link to="/items" />}
              icon={<BiBriefcaseAlt2 className="text-2xl" />}
              className={isActive("/items") ? "bg-blue-100 text-blue-800 font-bold shadow-lg rounded-lg" : "hover:bg-gray-100"}
            >
              Items
            </MenuItem>
            <MenuItem 
              component={<Link to="/archiveitems" />}
              icon={<HiMiniArchiveBoxXMark className="text-2xl" />}
              className={isActive("/archiveitems") ? "bg-blue-100 text-blue-800 font-bold shadow-lg rounded-lg" : "hover:bg-gray-100"}
            >
              Archive Items
            </MenuItem>
          </Menu>
        </Sidebar>

        <div className="w-full">
          {children}
        </div>
      </div>
    </>
  );
};

export default MainLayout;
