import { Scale, ThumbsUp } from "lucide-react";
import AccidentTypeCard from "./AccidentTypeCard";

interface AttorneyQuestionProps {
  onSelect: (hasAttorney: boolean) => void;
  compensationRange: { min: number; max: number };
}

const AttorneyQuestion = ({ onSelect, compensationRange }: AttorneyQuestionProps) => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="bg-card/50 rounded-lg p-4 mb-6 max-w-xs mx-auto">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Compensation amounts:</div>
            <div className="text-2xl font-bold text-primary">
              ${compensationRange.min.toLocaleString()} - ${compensationRange.max.toLocaleString()}
            </div>
          </div>
          <div className="mt-2 relative h-2 bg-secondary rounded-full overflow-hidden">
            <div className="absolute left-0 top-0 h-full bg-primary" style={{ width: "22%" }} />
          </div>
        </div>

        <div className="space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Are you currently represented by an attorney?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Having legal representation can change your options. Tell us if you already have a lawyer on your side.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <AccidentTypeCard
          icon={<Scale className="w-12 h-12" />}
          title="Yes"
          onClick={() => onSelect(true)}
        />
        <AccidentTypeCard
          icon={<ThumbsUp className="w-12 h-12" />}
          title="No"
          onClick={() => onSelect(false)}
        />
      </div>
    </div>
  );
};

export default AttorneyQuestion;