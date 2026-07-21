import { Card, CardContent } from "@system/ui/shadcn/card";
import { CarouselItem } from "@system/ui/shadcn/carousel";
import type { Card as CardType } from "../../schemas/cardSchema";

const CarouselCard = ({
  card,
  isAnswerShow,
}: {
  card: CardType;
  isAnswerShow: boolean;
}) => {
  return (
    <CarouselItem>
      <div className="p-1">
        <Card className="h-full w-full">
          <CardContent className="flex h-full items-center justify-center p-6">
            <span className="text-4xl font-semibold">
              {!isAnswerShow ? card.front : card.back}
            </span>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
};

export default CarouselCard;
