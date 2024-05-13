import React from "react";
import { Button } from "./index";

function Follow({ img, name, username }) {
  return (
    <div className="flex justify-between items-center">
      <div className="overflow-hidden rounded-full h-14 w-14">
        <img src="https://pbs.twimg.com/profile_images/1688253072961593344/sHEKegy2_x96.jpg" />
      </div>
      <div className="flex flex-col">
        <h3 className="font-bold">Khamenei Media</h3>
        <p className="text-base">@Khamenei_m</p>
      </div>
      <Button className="bg-black text-white px-3.5 py-1">Follow</Button>
    </div>
  );
}

export default Follow;
