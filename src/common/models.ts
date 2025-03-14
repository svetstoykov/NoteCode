import { Extension } from "@uiw/react-codemirror";

export interface ICodeShareItem {
  id?: string,
  content: string,
  theme: "light" | "dark" | Extension,
  language: string
}

export interface IDropdownOption {
  label: string;
  value: string;
}
