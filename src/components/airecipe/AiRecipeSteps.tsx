import Image from "next/image";

interface AiRecipeStepsProps {
  steps: { description: string; image: string | File | null }[];
}

const AiRecipeSteps: React.FC<AiRecipeStepsProps> = ({ steps }) => {
  const formattedSteps = steps.map((step) => ({
    description: step.description,
    image: typeof step.image === "string" ? step.image : null,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-semibold mb-6 text-zinc-800">📌 조리 순서</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {formattedSteps.map((step, index) => (
          <div
            key={index}
            className="p-6 rounded-xl border border-zinc-100 hover:border-zinc-200 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-semibold">
                {index + 1}
              </span>
              <h3 className="font-medium text-zinc-800">Step {index + 1}</h3>
            </div>
            <p className="text-zinc-600 mb-4 leading-relaxed">{step.description}</p>
            {step.image && (
              <div className="mt-4 w-full h-80 relative rounded-xl overflow-hidden">
                <Image
                  src={step.image}
                  layout="fill"
                  objectFit="cover"
                  alt={`Step ${index + 1}`}
                  className="hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiRecipeSteps; 