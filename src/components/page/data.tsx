import { BookA, Contact, FolderGit, Home } from "lucide-react";

export const navData = [
    {
        text: "Home",
        url: "#",
        icon: <Home size={16} />,
    },
    // {
    //     text: "About",
    //     url: "#about",
    //     icon: <BookA size={16} />,
    // },
    {
        text: "Projects",
        url: "#projects",
        icon: <FolderGit size={16} />,
    },
    {
        text: "Contact",
        url: "#contact",
        icon: <Contact size={16} />,
    }
]