export default function SidebarBtn({ logo, text }) {
  return (
    <div className="flex rounded-3xl hover:bg-zinc-900 py-1.5 px-4 transition-all">
      <img src={logo} alt="logo" />
      <p className="capitalize pl-5 text-white text-xl">{text}</p>
    </div>
  );
}
