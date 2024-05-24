/* eslint-disable react/jsx-key */
import { IconCreate, IconHeart, IconHome, IconMessenger } from "../assets/Icon";
import { SearchSVG } from "../assets/svg";
import ButtonSVG from "../components/Button/ButtonSVG.jsx";
import Input from "./Input/InputSearch.jsx";

const Header = () => {
  return (
    <>
      <header className="bg-white shadow px-48 border-b border-gray-400">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex px-2 lg:px-0">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="hidden lg:block h-8 w-auto"
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt="Workflow logo"
                />
              </div>
            </div>
            <Input Icon={SearchSVG} text="Search" />
            {/* icons*/}
            <div className="ml-4 flex items-center gap-2">
              {/* eslint-disable-next-line react/jsx-key */}
              {[
                <IconHome />,
                <IconMessenger />,
                <IconCreate />,
                <IconHeart />,
              ].map((icon, index) => (
                <ButtonSVG key={index}>{icon}</ButtonSVG>
              ))}

              {/* Profile dropdown */}
              <div className="ml-4 relative flex-shrink-0">
                <div
                  className="flex rounded-full border-gray-700 transition duration-150 ease-in-out"
                  id="user-menu"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://firebasestorage.googleapis.com/v0/b/shoes-shopping-web.appspot.com/o/shoesPlus-avatar%2F1682910717564avtdepnehihi.jpg?alt=media&token=ff4428a9-30bb-4176-830c-3e15f3bd8d10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
