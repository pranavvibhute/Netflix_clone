import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import getAiRecommendation from "../lib/AIModel";
import RecommendedMovies from "../components/RecommendedMovies";

const steps = [
  {
    name: "genre",
    label: "What's your favorite genre?",
    options: [
      "Action",
      "Comedy",
      "Drama",
      "Horror",
      "Romance",
      "Sci-Fi",
      "Animation",
    ],
  },
  {
    name: "mood",
    label: "What's your favorite mood?",
    options: [
      "Excited",
      "Relaxed",
      "Thoughtful",
      "Scared",
      "Inspired",
      "Romantic",
    ],
  },
  {
    name: "decade",
    label: "Prepared decade?",
    options: ["2020s", "2010s", "2000s", "1990s", "Older"],
  },
  {
    name: "language",
    label: "Prepared language?",
    options: ["English", "Korean", "Spanish", "French", "Other"],
  },
  {
    name: "length",
    label: "Prepared movie length?",
    options: ["Short (<90 min)", "Medium (90-120 min)", "Long (>120 min)"],
  },
];

const initialState = steps.reduce((acc, step) => {
  acc[step.name] = "";
  return acc;
}, {});

const AIRecommendations = () => {
  const [inputs, setInputs] = useState(initialState);
  const [step, setStep] = useState(0);
  const [recommendation, setRecommendation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOption = (value) => {
    setInputs({ ...inputs, [steps[step].name]: value });
    console.log("Selected option:", value);
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      console.log(inputs);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const generateRecommendations = async () => {
    if(!inputs){
        toast("Please complete all steps before generating recommendations.");
    }
    setIsLoading(true);
    const userPrompt = `Given the following user inputs:
    - Decade: ${inputs.decade}
    - Genre: ${inputs.genre}
    - Mood: ${inputs.mood}
    - Language: ${inputs.language}
    - Length: ${inputs.length}
    Recommend 10 ${inputs.mood.toLowerCase()} ${inputs.language.toLowerCase()} ${inputs.genre.toLowerCase()} 
    movies from the ${inputs.decade} that are ${inputs.length.toLowerCase()}. 
    Return the list as plain JSON array of movie titles only, No extra text, no explanations, no code blocks,
    no mardown, just the JSON array:
    [
        "Movie Title 1",
        "Movie Title 2",
        "Movie Title 3",
        "Movie Title 4",
        "Movie Title 5",
        "Movie Title 6",
        "Movie Title 7",
        "Movie Title 8",
        "Movie Title 9",
        "Movie Title 10"
    ]`;

    const result = await getAiRecommendation(userPrompt);
    setIsLoading(false);
    if(result){
        const cleanedResult = result.replace(/```json\n/i, '')
                                    .replace(/\n```/i, '');
        try {
           const recommendationArray = JSON.parse(cleanedResult);
              setRecommendation(recommendationArray);
              console.log(recommendationArray); 
        } catch (error) {
            console.log(error);
        }
    }
    else {
        toast.error("Failed to generate recommendations. Please try again.");
    } 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#181818] via-[#232323] to-[#181818] relative overflow-hidden">
      {!(recommendation && recommendation.length > 0) && (<img
        src="/background_banner.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20 blur-[2px]"
      />)}
      {recommendation && recommendation.length > 0 ? (
        <div className="w-full max-w-7xl mx-auto mt-2">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">AI Recommended Movies</h2>
            <RecommendedMovies movieTitles={recommendation}/>
        </div>
      ) : (
      <div className="relative w-full max-w-md mx-auto rounded-2xl bg-[#181818]/90 shadow-2xl border border-[#333] px-8 py-10 mt-4 flex flex-col items-center min-h-[480px]">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-white tracking-tight drop-shadow-lg">
          AI Movie Recommendation
        </h2>
        <div className="w-full flex items-center mb-8">
          <div className="flex-1 h-2 bg-[#232323] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#e50914] transition-all duration-300"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
          <span className="ml-4 text-white text-sm font-semibold">
            {step + 1}/{steps.length}
          </span>
        </div>
        <div className="w-full flex flex-col flex-1">
          <div className="mb-6 flex-1">
            <h3 className="text-white text-lg font-semibold mb-6 text-center">
              {steps[step].label}
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {steps[step].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleOption(opt)}
                  className="w-full py-3 rounded-xl border-2 transition font-semibold
             text-white text-base flex items-center justify-center gap-2 bg-[#232323]
              border-[#333] hover:bg-[#e50914] hover:border-[#e50914] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#e50914] active:scale-95 duration-150"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-3">
            <button
              type="button"
              onClick={handleBack}
              disabled={step == 0}
              className="px-6 py-2 rounded-lg font-semibold transition border-2 border-[#444] text-white bg-[#181818] hover:border-[#e50914]"
            >
              Back
            </button>
            <button
              type="button"
              onClick={
                step === steps.length - 1
                  ? generateRecommendations
                  : handleNext
              }
                disabled={!inputs[steps[step].name] || isLoading}
              className="px-6 py-2 rounded-lg font-semibold transition border-2 border-[#e50914] text-white bg-[#e50914] hover:bg-[#b00606]"
            >
              {step === steps.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default AIRecommendations;
