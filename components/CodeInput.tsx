import React from 'react';

interface CodeInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

const CodeInput: React.FC<CodeInputProps> = ({ value, onChange, disabled }) => {
  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-lg shadow-lg">
      <div className="flex-shrink-0 p-3 bg-gray-700/50 rounded-t-lg">
        <h2 className="text-lg font-semibold text-gray-200">Git Hook Scripts</h2>
      </div>
      <div className="flex-grow p-1">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Paste your Git hook scripts here..."
          className="w-full h-full p-3 bg-transparent text-gray-300 font-mono resize-none focus:outline-none disabled:opacity-60"
        />
      </div>
    </div>
  );
};

export default CodeInput;
