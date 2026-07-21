import { Button } from "@system/shared/ui/shadcn/button";
import { Separator } from "@system/shared/ui/shadcn/separator";
import capitalize from "@system/shared/utils/capitalize";

const REVIEW_GRADES = ["again", "hard", "good", "easy"] as const;
// type ReviewGrade = (typeof REVIEW_GRADES)[number];

const EvaluateBar = ({
  isAnswerShow,
  toogleAnwer,
  nextCard,
}: {
  isAnswerShow: boolean;
  toogleAnwer: () => void;
  nextCard: () => void;
}) => {
  return (
    <div className="absolute bottom-0 left-0 flex w-full flex-col bg-white">
      <Separator />

      <div className="flex w-full justify-center gap-2 py-3">
        {!isAnswerShow ? (
          <Button onClick={toogleAnwer}>Show answer</Button>
        ) : (
          REVIEW_GRADES.map((grade) => (
            <Button
              key={grade}
              onClick={() => {
                toogleAnwer();
                nextCard();
              }}
            >
              {capitalize(grade)}
            </Button>
          ))
        )}
      </div>
    </div>
  );
};

export default EvaluateBar;
