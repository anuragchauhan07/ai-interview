import { JSX } from "react";

const formatText = (text: string): JSX.Element[] => {
  // Clean up the text first - remove extra asterisks and clean up formatting
  const cleanText = text.replace(/\*\*/g, '').trim();
  
  // Split into sections, but keep the delimiter with the content
  const sections = cleanText.split(/(?=\d+\.\s)/);
  
  return sections.map((section, index) => {
    // Check if this section starts with a number
    const numberMatch = section.match(/^(\d+\.\s)([\s\S]*)/);
    
    if (numberMatch) {
      const [_, number, content] = numberMatch;
      // Split content into paragraphs but keep them in the same section
      const paragraphs = content.split('\n').filter(p => p.trim());
      
      return (
        <div key={index} className="flex gap-2 mb-4">
          <span className="font-semibold text-gray-900 min-w-[24px]">
            {number}
          </span>
          <div className="flex-1">
            {paragraphs.map((paragraph, pIndex) => (
              <p key={pIndex} className="text-gray-700 leading-relaxed mb-2">
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </div>
      );
    }
    
    // For text not starting with numbers
    return (
      <div key={index} className="mb-4">
        {section.split('\n').filter(p => p.trim()).map((paragraph, pIndex) => (
          <p key={pIndex} className="text-gray-700 leading-relaxed mb-2">
            {paragraph.trim()}
          </p>
        ))}
      </div>
    );
  });
};

const StyledText = ({ text }: { text: string }) => (
  <div className="prose prose-sm max-w-none">
    {formatText(text)}
  </div>
);

export default StyledText;
