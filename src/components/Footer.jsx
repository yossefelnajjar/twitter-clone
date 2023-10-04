export default function Footer() {
  return (
    <div className="flex gap-2 flex-wrap px-3">
      <p className="w-max opacity-30 hover:opacity-100 cursor-pointer">Terms of Service</p>
      <p className="w-max opacity-30 hover:opacity-100 cursor-pointer">Privacy Policy</p>
      <p className="w-max opacity-30 hover:opacity-100 cursor-pointer">Cookie Policy</p>
      <p className="w-max opacity-30 hover:opacity-100 cursor-pointer">Imprint</p>
      <p className="w-max opacity-30 hover:opacity-100 cursor-pointer">Ads info</p>
      <p className="w-max opacity-30 hover:opacity-100 cursor-pointer">© {new Date().getFullYear()} Twitter,Inc.</p>
    </div>
  )
}
