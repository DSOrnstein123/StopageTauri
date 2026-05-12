import { getRouteApi, Link } from "@tanstack/react-router";
import Dashboard from "./Dashboard";
import { Button } from "@/shared/components/shadcn/button";
import { useSuspenseQuery } from "@tanstack/react-query";
import { decksFetchQueryOption } from "../../hooks/useDecksFetch";

const route = getRouteApi("/(features)/flashcards/$deckId");

const DeckDetails = () => {
  const { deckId } = route.useParams();
  const { data: decks } = useSuspenseQuery(decksFetchQueryOption);
  const { name: deckName } = decks.find((deck) => deck.id == deckId)!;

  return (
    <div>
      <h1 className="mb-2">{deckName}</h1>
      <div className="mb-4">
        <span className="font-bold">Description: </span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro ratione
        iusto, quaerat sequi officiis quisquam magni provident quas ad suscipit,
        debitis quasi. At iste ipsum maxime quia animi, ratione eaque.
      </div>

      <Dashboard />

      <Button asChild className="w-full">
        <Link to={"/flashcards/$deckId/study"} params={{ deckId: deckId }}>
          Study
        </Link>
      </Button>
    </div>
  );
};

export default DeckDetails;
