import React, { Fragment, useState } from 'react';
import ShowIcon from '@/src/shared/icons/ShowIcon';
import type { Learner } from '@/src/shared/utils';
import ProgressPercentage from '@/src/shared/components/ProgressPercentage';
import FilterIcon from '@/src/shared/icons/FilterIcon';
import SortDropdown, {
  type SortOption,
} from '@/src/shared/components/Dropdown/SortDropdown/SortDropdown';
import ArrowIcon from '@/src/shared/icons/ArrowIcon';
import AddLearnerModal from '../../../shared/components/Modal/AddLearnerModal';
import Button from '@/src/shared/components/Button';

const LearningPathLearnersSection: React.FC = () => {
  const staticLearners: Learner[] = [
    { id: 1, progress: 23, firstname: 'Elyric', lastname: 'Manatad' },
    { id: 2, progress: 100, firstname: 'John', lastname: 'Doe' },
    { id: 3, progress: 57, firstname: 'Francis', lastname: 'Delos Santos' },
    { id: 4, progress: 85, firstname: 'Vali', lastname: 'Ruziboev' },
    { id: 5, progress: 97, firstname: 'Mel Anthony', lastname: 'Ando' },
    { id: 6, progress: 75, firstname: 'Zion Keenen', lastname: 'Tavera' },
    { id: 7, progress: 40, firstname: 'Rene Angelo', lastname: 'Gunayon' },
    { id: 8, progress: 72, firstname: 'Jason', lastname: 'Chua' },
    { id: 9, progress: 63, firstname: 'EJ', lastname: 'Potot' },
    { id: 10, progress: 12, firstname: 'Johny', lastname: 'Shen' },
    { id: 11, progress: 12, firstname: 'Johny2', lastname: 'Shen' },
    { id: 12, progress: 63, firstname: 'EJ2', lastname: 'Potot' },
    { id: 13, progress: 72, firstname: 'Jason2', lastname: 'Chua' },
    { id: 14, progress: 40, firstname: 'Rene Angelo2', lastname: 'Gunayon' },
    { id: 15, progress: 75, firstname: 'Zion Keenen2', lastname: 'Tavera' },
    { id: 16, progress: 97, firstname: 'Mel Anthony2', lastname: 'Ando' },
    { id: 17, progress: 85, firstname: 'Vali2', lastname: 'Ruziboev' },
    { id: 18, progress: 57, firstname: 'Francis2', lastname: 'Delos Santos' },
    { id: 19, progress: 23, firstname: 'Elyric2', lastname: 'Manatad' },
    { id: 20, progress: 85, firstname: 'Alice', lastname: 'Smith' },
    { id: 22, progress: 63, firstname: 'Bob', lastname: 'Johnson' },
    { id: 23, progress: 92, firstname: 'Charlie', lastname: 'Davis' },
    { id: 24, progress: 76, firstname: 'Ella', lastname: 'Brown' },
    { id: 25, progress: 45, firstname: 'Frank', lastname: 'Miller' },
    { id: 26, progress: 67, firstname: 'Grace', lastname: 'Wilson' },
    { id: 27, progress: 54, firstname: 'Henry', lastname: 'Anderson' },
    { id: 28, progress: 80, firstname: 'Isabella', lastname: 'Lee' },
  ];

  const [, setSelectedSortOption] = useState('');
  const [visibleLearners, setVisibleLearners] = useState(6);
  const learnersToShow = staticLearners.slice(0, visibleLearners);
  const isShowMoreDisabled = visibleLearners >= staticLearners.length;
  const [isModalOpen, setIsModalOpen] = useState(false);

  document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';

  const sortOptions: SortOption[] = [
    { label: 'A - Z', value: 'A - Z' },
    { label: 'Z - A', value: 'Z - A' },
    {
      label: 'Progress',
      value: 'progress-high',
      icon: <ArrowIcon className="transform rotate-90" />,
    },
    {
      label: 'Progress',
      value: 'progress-low',
      icon: <ArrowIcon className="transform -rotate-90" />,
    },
  ];

  const handleSortOptionChange = (value: string): void => {
    setSelectedSortOption(value);
  };

  const handleShowMoreLearners = (): void => {
    const newVisibleLearners = visibleLearners + 6;
    setVisibleLearners(newVisibleLearners);
  };

  const handleShowModal = (): void => {
    setIsModalOpen(true);
  };

  const handleHideModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <Fragment>
      <div>
        <div className="w-full flex items-center justify-between mb-8">
          <div className="font-semibold text-sm">List of Learners</div>
          <div>
            <Button
              text="Add learner"
              buttonClass="px-4 py-2 text-sm bg-white text-blue-500 border-2 border-red"
              textColor="text-red"
              onClick={handleShowModal}
            />
          </div>
        </div>

        {staticLearners?.length > 0 ? (
          <div className="mx-4">
            <div className="flex items-center justify-between text-[15px] my-2 cursor-pointer">
              <div className="text-gray2 text-[12px] font-[400]">Ranked by progress %</div>
              <SortDropdown
                options={sortOptions}
                onChange={handleSortOptionChange}
                buttonText="Filter"
                buttonIcon={<FilterIcon />}
                buttonClass="w-auto h-[25px] text-[14px]"
              />
            </div>

            <div className={'px-4 transition-all duration-500'}>
              {learnersToShow?.map((col: any) => (
                <div className="grid gap-1 w-full py-2" key={col.id}>
                  <ProgressPercentage progress={col.progress} />
                  <div className="text-sm text-gray-500 font-semibold">
                    {col.firstname} {col.lastname}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center mt-2 mb-5">
              <ShowIcon className="mt-[3px]" />
              <button
                className={`text-[0.77rem] text-gray-600 font-semibold ml-1 underline underline-offset-[3px] ${
                  isShowMoreDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                onClick={handleShowMoreLearners}
                disabled={isShowMoreDisabled}
              >
                Show More Learners
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <h1 className="text-center font-semibold text-xl">No Learners Available</h1>
          </div>
        )}
        {/* THE MODAL */}
        {isModalOpen && (
          <AddLearnerModal learners={staticLearners} handleHideModal={handleHideModal} />
        )}
      </div>
    </Fragment>
  );
};

export default LearningPathLearnersSection;
