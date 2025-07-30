"use client";
import { FaChevronDown } from "react-icons/fa";

interface QuestionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

export default function QuestionItem({
  question,
  answer,
  isOpen,
  onClick,
}: QuestionItemProps) {
  return (
    <div
      className={`
        rounded-xl shadow-lg p-6 border border-white/20
        bg-white/90 backdrop-blur-sm
        transition-all duration-300
        hover:shadow-xl hover:bg-white/95
        ${isOpen ? "ring-2 ring-primary/30" : ""}
      `}
    >
      {/* رأس السؤال */}
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-right gap-4"
        aria-expanded={isOpen}
      >
        <span className="text-primary-dark text-xl font-bold flex-1">
          {question}
        </span>
        <FaChevronDown
          className={`flex-shrink-0 transform transition-transform duration-300 ${
            isOpen ? "rotate-180 text-primary" : "text-secondary"
          }`}
          size={18}
        />
      </button>

      {/* إجابة السؤال */}
      <div
        className={`
          overflow-hidden
          transition-all duration-500 ease-in-out
          ${isOpen ? "max-h-[500px] mt-4 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="pt-2 pb-1">
          <p className="text-gray-700 text-base leading-relaxed border-t border-gray-100 pt-3">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
