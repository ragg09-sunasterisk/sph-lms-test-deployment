import React, { useState } from 'react';
import TrashIcon from '@/src/shared/icons/TrashIcon';

interface CardProps {
  numSelected: number;
  selectedNames: string[];
}

const SelectionModal: React.FC<CardProps> = ({
  numSelected,
  selectedNames
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = (): void => {
    setExpanded(!expanded);
  };

  const containerStyle = `fixed z-50 bottom-0 left-0 w-full max-h-96 ${
    expanded ? 'h-1/3' : 'h-1/7'
  } bg-white rounded-t-lg shadow-2xl shadow-black overflow-y-auto transition-all duration-500`;

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  return (
    <div className={containerStyle} onClick={handleContainerClick}>
      <div className="flex justify-center items-center">
        <div>
          <div
            className="bg-sky-900 h-2 w-20 rounded-full m-2 cursor-pointer"
            onClick={toggleExpand}
          />
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between pb-3">
          <h2 className="mb-4 underline">{numSelected} item(s) selected</h2>
          <div>
            <button className="bg-gray-100 px-3 py-2 rounded-lg mr-2">
              Cancel
            </button>
            <button className="bg-sky-900 text-white px-3 py-2 rounded-lg">
              Update Course Progresses
            </button>
          </div>
        </div>
        {expanded && (
          <div className="bg-gray-100 rounded-lg p-6 relative">
            {selectedNames.map((name, index) => (
              <div
                key={index}
                className="flex items-center mb-2 hover:bg-gray-200 p-2 rounded-lg"
              >
                <p className="mr-4">{name}</p>
                <button className="bg-transparent text-gray hover:text-white hover:bg-red-500 transition duration-500 ease-in-out rounded-full p-1 ml-auto">
                  <TrashIcon />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectionModal;
