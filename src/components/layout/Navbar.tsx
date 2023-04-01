const Navbar = () => {
  return (
    <div className="fixed top-0 w-full bg-primary ">
      <div className="mx-auto flex items-center justify-between px-44 py-8 font-poppin text-xl font-bold text-secondary">
        Safe Haven
        <div className="flex items-center gap-10 text-lg font-medium text-tert">
          <div className="cursor-pointer">Home</div>
          <div className="cursor-pointer">About Us</div>
          <div className="cursor-pointer">Contact Us</div>
          <div>
            <button className="rounded-lg border-4 border-secondary bg-secondary px-6 py-2 font-poppin text-lg font-medium text-white">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
