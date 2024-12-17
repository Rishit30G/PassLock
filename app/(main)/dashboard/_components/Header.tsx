import { ModeToggle } from "@/components/ModeToggle";
import { LogOutIcon } from "lucide-react";
import { signOutUser } from "@/actions/users.action";
import { Button } from "@/components/ui/button";

const Header = () => {

  const handleSubmit = async () => {
    try {
      await signOutUser();
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  return (
    <div className="container max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center pt-5 pb-14">
        <h4 className="poppins-regulat text-2xl">PassLock</h4>
        <div className="flex items-center justify-center gap-5">
          <ModeToggle />
            <Button type="submit" className="w-9 h-9 cursor-pointer" variant="outline" onClick={handleSubmit}>
              <LogOutIcon />
            </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
