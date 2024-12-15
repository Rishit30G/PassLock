import React from "react";

import { ModeToggle } from "@/components/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  return (
    <div className="container max-w-7xl mx-auto">
      <div className="flex justify-between items-center pt-5 pb-14">
        <h4 className="poppins-regulat text-2xl">PassLock</h4>
        <div className="flex items-center justify-center gap-5">
          <ModeToggle />
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="https://uttrakhandcoldandcuttings.co.in/images/sticker-memoji-iphone.jpg"
              className="object-cover cursor-pointer"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default Header;
