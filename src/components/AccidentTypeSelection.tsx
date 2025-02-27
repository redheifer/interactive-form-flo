
import {
  Car,
  Bike,
  Truck,
  HardHat,
  Stethoscope,
  PersonStanding,
  AlertCircle,
} from "lucide-react";
import AccidentTypeCard from "./AccidentTypeCard";

interface AccidentTypeSelectionProps {
  onSelect: (id: string) => void;
  selectedType: string | null;
}

const AccidentTypeSelection = ({ onSelect, selectedType }: AccidentTypeSelectionProps) => {
  const accidentTypes = [
    { id: "auto", title: "Automobile Accident", icon: <Car className="w-12 h-12" /> },
    { id: "pedestrian", title: "Pedestrian or Bicycle Accident", icon: <Bike className="w-12 h-12" /> },
    { id: "truck", title: "Truck Accident", icon: <Truck className="w-12 h-12" /> },
    { id: "motorcycle", title: "Motorcycle Accident", icon: <Bike className="w-12 h-12" /> },
    { id: "work", title: "Accident or Injury at Work", icon: <HardHat className="w-12 h-12" /> },
    { id: "medical", title: "Medical Negligence", icon: <Stethoscope className="w-12 h-12" /> },
    { id: "fall", title: "Fall or Slip", icon: <PersonStanding className="w-12 h-12" /> },
    { id: "other", title: "Other Injury or Accident", icon: <AlertCircle className="w-12 h-12" /> },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-4">
          <img 
            src="/lovable-uploads/a5188531-fe57-4015-a550-2914ae2b0547.png" 
            alt="LegalUplift Logo" 
            className="w-12 h-12"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            LegalUplift Compensation Calculator
          </h1>
        </div>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          The type of accident you were in can get you major compensation. 
          Tap below to see what yours is worth.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {accidentTypes.map((type) => (
          <AccidentTypeCard
            key={type.id}
            icon={type.icon}
            title={type.title}
            onClick={() => onSelect(type.id)}
            selected={selectedType === type.id}
          />
        ))}
      </div>
    </>
  );
};

export default AccidentTypeSelection;
