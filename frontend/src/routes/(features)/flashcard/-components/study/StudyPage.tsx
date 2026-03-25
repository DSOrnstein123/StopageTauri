import {
  Carousel,
  CarouselContent,
  type CarouselApi,
} from "@/shared/components/shadcn/carousel";
import { getRouteApi } from "@tanstack/react-router";
import CarouselCard from "./CarouselCard";
import { useState } from "react";
import EvaluateBar from "./EvaluateBar";
import { useSuspenseQuery } from "@tanstack/react-query";
import { deckCardsQueryOptions } from "../../-hooks/useCardsFetch";

const route = getRouteApi("/(features)/flashcards/$deckId/study");

const StudyPage = () => {
  const { deckId } = route.useParams();
  const { data: cards = [] } = useSuspenseQuery(deckCardsQueryOptions(deckId));

  const [api, setApi] = useState<CarouselApi>();
  const [isAnswerShow, setIsAnswerShow] = useState(false);

  return (
    <div className="flex size-full items-center justify-center gap-5">
      <Carousel
        setApi={setApi}
        opts={{ watchDrag: false }}
        className="w-full max-w-200"
      >
        <CarouselContent>
          {cards.map((card) => (
            <CarouselCard
              key={card.id}
              card={card}
              isAnswerShow={isAnswerShow}
            />
          ))}
        </CarouselContent>
      </Carousel>

      <EvaluateBar
        isAnswerShow={isAnswerShow}
        toogleAnwer={() => setIsAnswerShow((prev) => !prev)}
        nextCard={() => api?.scrollNext()}
      />
    </div>
  );
};

export default StudyPage;
