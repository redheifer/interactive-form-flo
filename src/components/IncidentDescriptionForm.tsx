import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import ProgressIndicator from "./shared/ProgressIndicator";
import CompensationDisplay from "./shared/CompensationDisplay";
import QuestionHeader from "./shared/QuestionHeader";

interface IncidentDescriptionFormProps {
  onSubmit: (description: string) => void;
  compensationRange: { min: number; max: number };
}

const IncidentDescriptionForm = ({ onSubmit, compensationRange }: IncidentDescriptionFormProps) => {
  const [description, setDescription] = useState("");
  const [currentRange, setCurrentRange] = useState(compensationRange);
  const [isLoading, setIsLoading] = useState(false);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    
    // Update compensation range if description is substantial
    if (newDescription.length >= 100) {
      setCurrentRange({
        min: 63000,
        max: 150000
      });
    } else {
      setCurrentRange(compensationRange);
    }
  };

  const handleNext = () => {
    setIsLoading(true);
    // Simulate loading for 2 seconds before submitting
    setTimeout(() => {
      setIsLoading(false);
      onSubmit(description);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <ProgressIndicator value={55} />
        <CompensationDisplay 
          min={currentRange.min} 
          max={currentRange.max}
          isLoading={isLoading} 
        />
        <QuestionHeader 
          title="Describe your incident"
          description="A brief description of your accident will help us evaluate your case more accurately. Our AI system will analyze your description to provide a more precise compensation estimate."
        />
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        <Textarea
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Describe your incident..."
          className="min-h-[200px] bg-white/10 text-white placeholder:text-white/60"
          maxLength={2000}
        />
        <div className="flex justify-between text-sm text-white">
          <div>
            {description.length < 20 && "Please enter at least 20 characters"}
          </div>
          <div>
            {description.length}/2000
          </div>
        </div>
        <Button
          onClick={handleNext}
          className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white"
          disabled={description.length < 20}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default IncidentDescriptionForm;