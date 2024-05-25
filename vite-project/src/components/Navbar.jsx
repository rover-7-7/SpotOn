import Glowing from "./Glowing";
import Timedisplay from "./Timedisplay";
function Navbar() {
  return (
    <div>
      <ul className="flex flex-row gap-20 bg-black ml-40">
        <Glowing name="Home" />
        <Glowing name="About" />
        <Glowing name="Contact" />
        <Glowing name="Logout" />
        <div className="mt-6">
          <Timedisplay />
        </div>
      </ul>
    </div>
  );
}

export default Navbar;
