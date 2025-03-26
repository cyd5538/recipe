import Image from "next/image";

interface RecipeStepsProps {
  steps: { description: string; image?: string }[];
}

const RecipeSteps: React.FC<RecipeStepsProps> = ({ steps }) => (
  <div className="mt-8">
    <h2 className="text-xl font-semibold mb-4">📌 요리 순서</h2>
    <div className="grid gap-6 md:grid-cols-2">
      {steps.map((step, index) => (
        <div key={index} className="p-4 shadow-sm rounded-xl border">
          <h3 className="text-xl mb-2 border border-zinc-700 rounded-full flex justify-center items-center w-8 h-8">{index + 1}</h3>
          <p>{step.description}</p>
          {step.image && (
            <div className="mt-3 w-full h-80 relative rounded-lg overflow-hidden">
              <Image src={step.image} layout="fill" objectFit="cover" alt={step.description} />
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);
export default RecipeSteps;