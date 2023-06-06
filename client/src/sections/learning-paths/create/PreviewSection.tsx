import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { changeEditMode } from '@/features/learning-path/learningPathSlice';
import React, { useEffect } from 'react';
import InitialSection from './InitialSection';
import LearningPathCourseCard from '@/src/shared/components/Card/LearningPathCourseCard';
import ChevronDown from '@/src/shared/icons/ChevronDownIcon';

const PreviewSection = (): JSX.Element => {
  const {
    values: { courses },
  } = useAppSelector((state) => state.learningPath);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeEditMode(false));
  }, []);

  return (
    <div>
      <InitialSection />
      <div className="flex flex-col items-center">
        {courses.length &&
          courses.map((course, index) => (
            <div key={course.id} className="flex flex-col items-center">
              <LearningPathCourseCard course={course} />
              {index !== courses.length - 1 && <ChevronDown height={40} width={40} />}
            </div>
          ))}
      </div>
    </div>
  );
};

export default PreviewSection;
