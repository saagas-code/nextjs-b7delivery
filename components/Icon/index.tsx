import Card from "./card.svg";
import Checked from "./checked.svg";
import Cupom from "./cupom.svg";
import Location from "./location.svg";
import Money from "./money.svg";
import RightArrow from "./right.svg";
import MailSent from "./MailSent.svg";
import Dots from "./dots.svg";
import Edit from "./edit.svg";
import Trash from "./trash.svg";



type Props = {
  icon: string;
  color: string;
  width: number;
  height: number;
};

export const Icon = ({ icon, color, width, height }: Props) => {
  return (
    <div>
      {icon === "card" && <Card color={color} />}
      {icon === "checked" && <Checked color={color} />}
      {icon === "cupom" && <Cupom color={color} />}
      {icon === "location" && <Location color={color} />}
      {icon === "money" && <Money color={color} />}
      {icon === "right" && <RightArrow color={color} />}
      {icon === "mailSent" && <MailSent color={color} />}
      {icon === "dots" && <Dots color={color} />}
      {icon === "edit" && <Edit color={color} />}
      {icon === "trash" && <Trash color={color} />}
    </div>
  )
};
