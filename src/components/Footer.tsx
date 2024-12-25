import { langs, LanguageName } from "@uiw/codemirror-extensions-langs";
import linkIcon from "../assets/link.svg";
import shareIcon from "../assets/Share.svg";
import { IDropdownOption } from "../common/models";
import DropdownButton from "./DropdownButton";
import { toast } from "react-toastify";

interface IFooterProps {
  onClickShare: () => void;
  onSelectLanguage: (language: LanguageName) => void;
  onSelectTheme: (theme: "light" | "dark") => void;
  itemId?: string;
  theme?: "light" | "dark";
  language: LanguageName;
  hasMadeChanges: boolean;
}

const Footer = ({
  onClickShare,
  onSelectLanguage,
  onSelectTheme,
  itemId,
  language,
  theme,
  hasMadeChanges,
}: IFooterProps) => {
  const allLanguages: IDropdownOption[] = Object.keys(langs)
    .sort()
    .map((l) => ({
      label: l,
      value: l,
    }));

  const allThemes: IDropdownOption[] = ["light", "dark"].map((t) => ({
    label: t,
    value: t,
  }));

  const handleCopyLink = () => {
    const baseUrl = window.location.origin;
    const linkToCopy = `${baseUrl}/${itemId}`;

    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => toast.success("Link copied!"))
      .catch((err) => toast.error("Failed to copy:", err));
  };

  return (
    <footer className="mt-auto flex xsm:flex-row flex-col xsm:items-center">
      <div className="flex justify-between xsm:mb-0 mb-4 xsm:gap-4">
        <DropdownButton
          initialValue={language ?? "c"}
          options={allLanguages}
          onSelect={(value) => onSelectLanguage(value as LanguageName)}
        />
        <DropdownButton
          initialValue={typeof theme === "string" ? theme : "light"}
          options={allThemes}
          onSelect={(value) => onSelectTheme(value as "light" | "dark")}
        />
      </div>
      <div className="xsm:ml-auto flex gap-5 items-center justify-between">
        {itemId && (
          <div
            className=" flex gap-2 cursor-pointer text-gray-400 hover:opacity-80 transition-all duration-300"
            onClick={handleCopyLink}
          >
            <img src={linkIcon} alt="Copy to Clipboard" />
            <span>.../{itemId}</span>
          </div>
        )}
        <button
          className={`px-3 py-1 bg-gray-500 rounded-2xl flex items-center gap-2 ${
            !hasMadeChanges
              ? "opacity-70"
              : "hover:bg-slate-500/80 transition-colors duration-300"
          } text-white `}
          onClick={onClickShare}
          disabled={!hasMadeChanges}
        >
          <img src={shareIcon} alt="Share" />
          <span>Share</span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
