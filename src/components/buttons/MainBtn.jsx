import { Link } from "react-router-dom";

export default function MainBtn({ text, bgColor, hoverBgColor, toPath, onclick }) {
  return (
    <Link to={toPath} className={`${bgColor} ${hoverBgColor} text-xl px-4 py-1 rounded-3xl `} onClick={onclick}>
      {text}
    </Link>
  );
}
