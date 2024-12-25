import noteCodeLogo from "../assets/NoteCodeLogo.svg"

const Header = () => {
  return (
    <header className="relative z-5 mt-10 flex flex-col gap-8 items-center">
    <img src={noteCodeLogo} alt="Note Code Logo" />
    <h2 className="text-2xl font-semibold">Create & Share</h2>
    <h1 className="text-4xl font-semibold">Your Code easily</h1>
  </header>
  )
}

export default Header