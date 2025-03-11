import { socialData } from "./data";

const SocialLinks: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      {socialData.map((s) => (
        <a
          href={s.src}
          className="transition-all cursor-pointer hover:drop-shadow-[0_0_3px_#ccc]"
          target="_blank"
          rel="noopener noreferrer"
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
