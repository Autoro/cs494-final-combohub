import { useUserContext } from "@/contexts/userContext";
import { Avatar, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

export default function UserMenu() {
  const { user, logIn, logOut } = useUserContext();
  const [menuElement, setMenuElement] = useState<HTMLButtonElement | null>(null);
  const router = useRouter();

  const handleMenuOpen = (e: MouseEvent<HTMLButtonElement>) => {
    if (!user) {
      logIn();
    } else {
      setMenuElement(e.currentTarget);
    }
  };

  const handleMenuClick = (choice: string) => {
    switch (choice) {
      case "profile":
        router.push("/profile");
        break;
      case "logout":
        logOut();
        break;
    }

    setMenuElement(null);
  };

  const handleMenuClose = () => setMenuElement(null);

  return (
    <>
      <IconButton onClick={handleMenuOpen} sx={{ ml: "auto", p: 0, color: "white" }}>
        {
          user
            ? <Avatar src={user.photoURL ?? ""} alt={user.displayName ?? ""} />
            : <Box component="span" className="material-symbols-outlined" sx={{ width: 40, height: 40, lineHeight: "40px" }}>person</Box>
        }
      </IconButton>

      <Menu
        open={!!menuElement}
        anchorEl={menuElement}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={() => handleMenuClick("logout")}>Logout</MenuItem>
      </Menu>
    </>
  );
}
