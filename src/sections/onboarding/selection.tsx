import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import Issuer from "@/assets/issuer.png";
import Investor from "@/assets/consumer.png";
import { Button } from "@/components/ui/button";

enum SelectionType {
  Investor = "investor",
  Issuer = "issuer",
}

interface SelectionCardProps {
  title: string;
  description: string;
  icon: SelectionType;
  selected: boolean;
}

export const SelectionCard = (props: SelectionCardProps) => {
  return (
    <div>
      <Card className={props.selected ? "border-[#6b65f9] w-[300px] h-[200px]  ": "w-[300px] h-[200px] "}>
        <CardHeader>
            <div className="mx-auto relative ">
          <Image
            src={props.icon === SelectionType.Issuer ? Issuer : Investor}
            alt={props.title}
            height={50}
          />
           <div className={props.selected ? "w-4 h-4 rounded-full bg-[#6b65f9] border-black absolute -top-4 -right-28" : "w-4 h-4 rounded-full border-[#6b65f9] absolute border -top-4 -right-28"}></div>
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle>{props.title}</CardTitle>
          <CardDescription>{props.description}</CardDescription>
        </CardContent>

      
      </Card>
    </div>
  );
};
