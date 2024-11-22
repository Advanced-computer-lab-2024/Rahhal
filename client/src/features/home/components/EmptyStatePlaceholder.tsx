import PageStyles from "@/features/home/styles/EmptyStatePlaceholder.module.css";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

interface EmptyStatePlaceholderProps {
  img: string;
  img_alt: string;
  textOne: string;
  textTwo: string;
  buttonText: string;
  navigateTo: string;
}

export default function EmptyStatePlaceholder({
  img,
  img_alt,
  textOne,
  textTwo,
  buttonText,
  navigateTo,
}: EmptyStatePlaceholderProps) {
  const navigate = useNavigate();

  return (
    <div className={PageStyles["empty-state-placeholder"]}>
      <img src={img} alt={img_alt} />
      <br />
      <h1>{textOne}</h1>
      <br />
      <p>{textTwo}</p>
      <br />
      <button onClick={() => navigate(navigateTo)}>
        <div>{buttonText}</div>
        <div>
          <FaArrowRightLong size={19} />
        </div>
      </button>
    </div>
  );
}
