import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import ProgressIndicator from "./shared/ProgressIndicator";
import CompensationDisplay from "./shared/CompensationDisplay";
import QuestionHeader from "./shared/QuestionHeader";

interface IncidentDescriptionFormProps {
  onSubmit: (description: string) => void;
  compensationRange: { min: number; max: number };
}

const IncidentDescriptionForm = ({ onSubmit, compensationRange }: IncidentDescriptionFormProps) => {
  const [description, setDescription] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [currentRange, setCurrentRange] = useState(compensationRange);
  const [isLoading, setIsLoading] = useState(true);
  const [zipError, setZipError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    
    if (newDescription.length >= 100) {
      setCurrentRange({
        min: 65000,
        max: 105000
      });
    } else {
      setCurrentRange(compensationRange);
    }
  };

  const validateZipCode = (zip: string) => {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zip);
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newZip = e.target.value;
    setZipCode(newZip);
    
    if (newZip && !validateZipCode(newZip)) {
      setZipError("Please enter a valid US ZIP code (e.g., 12345 or 12345-6789)");
    } else {
      setZipError("");
    }
  };

  const handleNext = () => {
    if (!validateZipCode(zipCode)) {
      setZipError("Please enter a valid US ZIP code before continuing");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSubmit(description);
    }, 300);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="flex items-center justify-between gap-4 max-w-4xl mx-auto mb-8">
          <CompensationDisplay 
            min={currentRange.min} 
            max={currentRange.max}
            isLoading={isLoading} 
          />
          <ProgressIndicator value={55} />
        </div>
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

        <div className="space-y-2">
          <Input
            type="text"
            value={zipCode}
            onChange={handleZipCodeChange}
            placeholder="Enter incident ZIP code"
            className="bg-white/10 text-white placeholder:text-white/60"
          />
          {zipError && (
            <p className="text-red-500 text-sm">{zipError}</p>
          )}
        </div>

        <Button
          onClick={handleNext}
          className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white"
          disabled={description.length < 20 || !validateZipCode(zipCode)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default IncidentDescriptionForm;
