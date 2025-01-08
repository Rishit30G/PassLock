import { ModeToggle } from "@/components/ModeToggle";
import { LogOutIcon } from "lucide-react";
import { signOutUser } from "@/actions/users.action";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Header = () => {

  const router = useRouter();
  const handleSubmit = async () => {
    try {
      const result = await signOutUser();
      if (typeof result === "object" && "error" in result) {
        toast.error(result.error);
        return;
      }
      router.push("/sign-in");
    } catch{
      toast.error("Failed to sign out");
    } 
  };

  return (
    <div className="container max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center pt-5 pb-14">
        <h4 className="poppins-regular text-2xl">PassLock</h4>
        <div className="flex items-center justify-center gap-5">
          <ModeToggle />
            <Button type="submit" className="w-9 h-9 cursor-pointer" variant="outline" onClick={handleSubmit} aria-label="Sign out">
              <LogOutIcon />
            </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
