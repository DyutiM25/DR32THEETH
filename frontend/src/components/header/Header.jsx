const Header = () => {
  return (
    <header className="bg-white top-0 mt-0 z-10">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-80 px-4 py-4 h-40 overflow-hidden">
        <a href="#">
          <img
            src="../src/assets/images/header-1.png"
            alt="Header 1"
            className="w-40 sm:w-48 lg:w-60 object-cover"
          />
        </a>
        <a href="#">
          <img
            src="../src/assets/images/header-2.png"
            alt="Header 2"
            className="w-40 sm:w-48 lg:w-60 object-cover"
          />
        </a>
        <a href="#">
          <img
            src="../src/assets/images/header-3.png"
            alt="Header 3"
            className="w-40 sm:w-48 lg:w-60 object-cover"
          />
        </a>
      </div>
    </header>
  );
};

export default Header;
