import heroBackground from "../src/assets/Hero-Background-notecode.svg";
import noteCodeLogo from "../src/assets/NoteCodeLogo.svg";
import shareIcon from "../src/assets/Share.svg";
import linkIcon from "../src/assets/link.svg";
import CodeMirror, { EditorView, Extension } from "@uiw/react-codemirror";
import {
  LanguageName,
  loadLanguage,
  langs,
} from "@uiw/codemirror-extensions-langs";
import { useState } from "react";
import { htmlCode } from "./common/constants";
import DropdownButton, { IDropdownOption } from "./components/DropdownButton";

function App() {
  const [code, setCode] = useState(htmlCode);
  const [language, setLanguage] = useState<LanguageName>("html");
  const [theme, setTheme] = useState<"light" | "dark" | "none" | Extension>(
    "light"
  );

  const allLanguages: IDropdownOption[] = Object.keys(langs).map((l) => ({
    label: l,
    value: l,
  }));

  const allThemes: IDropdownOption[] = ["light", "dark"].map((t) => ({
    label: t,
    value: t,
  }));

  const customTheme = EditorView.theme({
    ".cm-gutters": {
      backgroundColor: "white",
    },
    "&.cm-editor.cm-focused": {
      outline: "none",
    },
  });

  return (
    <>
      <div className="fixed inset-0 bg-custom-gradient"></div>
      <img
        src={heroBackground}
        className="object-cover absolute -z-5 w-full min-h-[70svh]"
        alt="Hero Background"
      />
      <div className="flex flex-col items-center h-full mb-10">
        <header className="relative z-5 mt-10 flex flex-col gap-8 items-center">
          <img src={noteCodeLogo} alt="Note Code Logo" />
          <h2 className="text-2xl font-semibold">Create & Share</h2>
          <h1 className="text-4xl font-semibold">Your Code easily</h1>
        </header>
        <main className="flex flex-col p-5 mt-10 relative z-10 w-[calc(100%-5rem)] max-w-[800px] min-h-[700px] rounded-xl bg-white">
          <section className="">
            <CodeMirror
              value={code}
              theme={theme}
              extensions={[loadLanguage(language)!, customTheme]}
              onChange={(value) => setCode(value)}
            />
          </section>
          <footer className="mt-auto flex xsm:flex-row flex-col xsm:items-center">
            <div className="flex justify-between xsm:mb-0 mb-4 xsm:gap-4">
              <DropdownButton
                options={allLanguages}
                onSelect={(value) => setLanguage(value as LanguageName)}
              />
              <DropdownButton
                options={allThemes}
                onSelect={(value) =>
                  setTheme(value as "light" | "dark" | Extension)
                }
              />
            </div>
            <div className="xsm:ml-auto flex gap-5 items-center justify-between">
              <div className=" flex gap-2 cursor-pointer hover:text-gray-400 transition-colors duration-300">
                <img src={linkIcon} alt="Copy to Clipboard" />
                <span>.../28xusy23</span>
              </div>
              <div className="cursor-pointer px-3 py-1 bg-gray-500 rounded-2xl flex gap-2 text-white hover:bg-slate-500/80 transition-colors duration-300">
                <img src={shareIcon} alt="Share" />
                <button className="text-lg">Share</button>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}

export default App;
