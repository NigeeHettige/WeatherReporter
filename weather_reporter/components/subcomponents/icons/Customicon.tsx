import React from "react";

import { CustomIconProps } from "@/utils/types/interface";
function Customicon({ icon: Icon }: CustomIconProps) {
  return (
    <div className="bg-light_blue rounded-full w-10 h-10 flex items-center justify-center">
      <Icon className="  text-icon_blue" />
    </div>
  );
}

export default Customicon;
