import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";

export interface SocialLink {
  name: string;
  src: string;
  icon: React.ReactNode;
}

export const socialData: SocialLink[] = [
  {
    name: "Linkedin",
    src: "https://www.linkedin.com/in/logan-chester-259807149/",
    icon: <FontAwesomeIcon icon={faLinkedin} className="text-white size-8" />,
  },
  {
    name: "Github",
    src: "https://github.com/loganchester",
    icon: <FontAwesomeIcon icon={faGithub} className="text-white size-8" />,
  },
  // {
  //   name: "Instagram",
  //   src: "https://www.instagram.com/loganjchester_/?hl=en",
  //   icon: <FontAwesomeIcon icon={faInstagram} className="text-white size-8" />,
  // }
];
