import { ChevronsUpDown, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function SidebarFooterComponent() {
  const { user } = useUser();
  const { signOut } = useClerk();

  const initials =
    user?.firstName?.[0] ||
    user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() ||
    "U";

  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 hover:bg-sidebar-accent transition-colors duration-100">
          <Avatar className="h-7.5 w-7.5 border border-primary/20">
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback className="bg-primary/15 text-[11px] font-semibold text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col text-left flex-1 min-w-0">
            <span className="text-[12.5px] font-medium leading-tight text-sidebar-foreground truncate">
              {user?.fullName || "User"}
            </span>
            <span className="text-[11px] text-muted-foreground truncate mt-0.5">
              {user?.primaryEmailAddress?.emailAddress}
            </span>
          </div>

          <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" side="top">
        <DropdownMenuItem onClick={() => navigate("/me")}>
          <User className="h-4 w-4 mr-2" />
          Account
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={() => signOut()}>
          <LogOut className="h-4 w-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
