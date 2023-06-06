import React, { useEffect } from 'react';
import Courses from './Courses';
import Button from '@/src/shared/components/Button';
import PlusIcon from '@/src/shared/icons/PlusIcon';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import {
  closeModal,
  courseModalEnum,
  openModal,
} from '@/src/features/learning-path/courseModalsSlice';
import CourseModal from './CourseModal';
import { changeEditMode, deleteCourse } from '@/src/features/learning-path/learningPathSlice';
import DeleteModal from '@/src/shared/components/Modal/DeleteModal';

const AddCourseSection = (): JSX.Element => {
  const { add, deleteC } = useAppSelector((state) => state.courseModals);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeEditMode(true));
  }, []);

  const handleDeleteCourse = (): void => {
    if (deleteC) {
      dispatch(deleteCourse(String(deleteC.id)));
      dispatch(closeModal(courseModalEnum.DELETE));
    }
  };

  return (
    <div>
      <Courses />
      <Button
        buttonClass="flex items-center space-x-1 border border-textGray !py-[5px] !px-2 text-[12px] !font-medium"
        text="Add course"
        onClick={() => dispatch(openModal({ type: courseModalEnum.ADD }))}
      >
        <PlusIcon />
      </Button>
      <CourseModal
        title="Add Course"
        state={add}
        closeModal={() => dispatch(closeModal(courseModalEnum.ADD))}
        submitButtonTitle="Add course"
      />
      <DeleteModal
        state={!!deleteC}
        closeModal={() => dispatch(closeModal(courseModalEnum.DELETE))}
        type="course"
        title={deleteC?.name ?? ''}
        onDelete={handleDeleteCourse}
      />
    </div>
  );
};

export default AddCourseSection;
