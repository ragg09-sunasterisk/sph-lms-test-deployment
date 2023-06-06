import { useAppDispatch } from '@/src/redux/hooks';
import { changeEditMode } from '@/src/features/course/courseSlice';
import { Fragment, type FC, useEffect } from 'react';
import InitialSection from './InitialSection';
import AddLessonSection from './AddLessonSection';

const PreviewSection: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeEditMode(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <InitialSection />
      <h3 className="text-[14px] mb-2 font-semibold">List of lessons</h3>
      <AddLessonSection />
    </Fragment>
  );
};

export default PreviewSection;
