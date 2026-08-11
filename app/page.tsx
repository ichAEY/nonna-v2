import DesktopClayTone from "./desktop-claytone";
import MobileClayTone from "./mobile-claytone";

export default function Page() {
  return (
    <div className="site-root">
      <div className="dct-desktop">
        <DesktopClayTone />
      </div>
      <MobileClayTone />
    </div>
  );
}
