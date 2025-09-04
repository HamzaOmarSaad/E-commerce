import { Facebook, Instagram, Map } from "iconsax-reactjs";
import { Twitter } from "lucide-react";
import React from "react";

function Footer() {
  return (
    <div className="footer  bg-zinc-300 py-5 mt-4 ">
      <div className=" flex justify-around">
        <div className="brand-info pt-4 w-30/100 ">
          <h1 className="text-4xl mb-3 ">SHOP.CO</h1>
          <p className="">
            Aspernatur m repellendus itaque asperiores saepe corporis.
            Consequuntur dolores eos possimus architecto?
          </p>
        </div>
        <div className="help-section pt-4 ">
          <h1 className="text-4xl mb-3 ">Help</h1>
          <ul>
            <li>Customer Support </li>
            <li>Delivery Details</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="contact us pt-4 ">
          <h1 className="text-4xl mb-3 ">contact us</h1>
          <div className="icons flex gap-5">
            <Facebook />
            <Instagram />
            <Twitter />
          </div>
          <hr className="my-4" />
          <div className="info flex gap-2 items-center">
            <Map size="16" />
            3434-wallstreat.NY
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
