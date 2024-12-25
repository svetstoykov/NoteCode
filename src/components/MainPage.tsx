import { LanguageName, loadLanguage } from "@uiw/codemirror-extensions-langs";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { useEffect, useState } from "react";
import { htmlCode as defaultCode } from "../common/constants";
import { ICodeShareItem } from "../common/models";
import { toast, ToastContainer } from "react-toastify";
import { saveData, getData } from "../services/firebase";
import { generateUniqueId } from "../services/idGenerator";
import Footer from "./Footer";
import Header from "./Header";
import heroBackground from "../assets/Hero-Background-notecode.svg";
import { useParams } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";

const MainPage = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<LanguageName>("html");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [itemId, setItemId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasMadeChanges, setHasMadeChanges] = useState(false);
  const [currentItem, setCurrentItem] = useState<ICodeShareItem | undefined>();

  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      loadSharedCode(id);
    } else {
      setCode(defaultCode);
    }
  }, [id, setCode]);

  const customTheme = EditorView.theme({
    ".cm-gutters": {
      backgroundColor: "white",
    },
    "&.cm-editor": {
      transitionProperty:
        "color, background-color, border-color, text-decoration-color, fill, stroke",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      transitionDuration: "150ms",
    },
    "&.cm-editor.cm-focused": {
      outline: "none",
    },
  });

  const handleCodeChange = (code: string) => {
    setCode(code);

    if (id === undefined && code === defaultCode) {
      setHasMadeChanges(false);
    } else if (
      id !== undefined &&
      currentItem &&
      currentItem.content === code
    ) {
      setHasMadeChanges(false);
    } else {
      setHasMadeChanges(true);
    }
  };

  const handleSave = async () => {
    try {
      if (!code || code.trim().length === 0) {
        toast.error("Code snippet is empty!");
        return;
      }

      const id = generateUniqueId(10);
      const item = {
        content: code,
        language: language,
        theme: theme,
      };

      const savedData = await saveData<ICodeShareItem>(id, item);

      console.log(savedData);
      setItemId(id);
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  const loadSharedCode = async (id: string) => {
    try {
      setIsLoading(true);

      console.log("In loading....");

      // Add additional delay, for better animations
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const item = await getData<ICodeShareItem>(id);
      if (item === null) {
        return;
      }

      setItemId(id);
      setCode(item.content);
      setTheme(item.theme as "light" | "dark");
      setLanguage(item.language as LanguageName);
      setCurrentItem(item);
      setIsLoading(false);
    } catch (error) {
      console.error("Error retrieving item:", error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-custom-gradient"></div>
      <img
        src={heroBackground}
        className="object-cover -top-1/4 absolute -z-5 w-full h-full min-h-[70svh]"
        alt="Hero Background"
      />
      <div className="flex flex-col items-center mb-10">
        <Header />
        <main
          className={`flex flex-col p-5 mt-10 relative z-10 w-[90%] max-w-[1000px] h-[60svh] rounded-xl overflow-auto transition-colors ${
            theme === "dark" ? "bg-dark-gray dark-theme" : "bg-white"
          }`}
        >
          <section className="flex justify-center items-center flex-grow overflow-auto pb-3 rounded-md">
            {isLoading ? (
              <MutatingDots
                wrapperStyle={{ paddingTop: "3rem" }}
                visible={true}
                height="100"
                width="100"
                color="#9c6aee"
                secondaryColor="#9c6aee"
                radius="12"
              />
            ) : (
              <div className="w-full h-full overflow-auto">
                <CodeMirror
                  style={{ height: "100%", width: "100%" }}
                  value={code}
                  theme={theme}
                  extensions={[loadLanguage(language)!, customTheme]}
                  onChange={(value) => handleCodeChange(value)}
                />
              </div>
            )}
          </section>
          <Footer
            onClickShare={() => handleSave()}
            onSelectLanguage={(value) => setLanguage(value)}
            onSelectTheme={(value) => setTheme(value)}
            itemId={itemId}
            theme={theme}
            language={language}
            hasMadeChanges={hasMadeChanges}
          />
        </main>
      </div>
      <ToastContainer />
    </>
  );
};

export default MainPage;
