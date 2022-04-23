const Navbar = (props) => {
  return (
    <nav className="w-full">
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center" aria-label="Home" role="img">
                        <p className="ml-2 lg:ml-4 text-xl lg:text-2xl font-bold">Retro</p>
                    </div>
                    <div>
                        <div id="menu" className="">
                            <ul className="flex text-3xl text-base items-center py-8 flex flex-row justify-center relative bg-transparent z-20">
                                <li className="text-lg lg:text-xl hover:text-purple-600 cursor-pointer ml-10 pt-10 pt-0">
                                      <a className="font-semibold">Connect wallet</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
  );
};

export default Navbar;
