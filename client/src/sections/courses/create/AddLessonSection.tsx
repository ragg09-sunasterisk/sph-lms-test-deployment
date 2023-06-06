/* eslint-disable multiline-ternary */
import { useEffect, type FC } from 'react';
import Button from '@/src/shared/components/Button';
import PlusIcon from '@/src/shared/icons/PlusIcon';
import LessonModal from './LessonModal';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { closeModal, lessonModalEnum, openModal } from '@/src/features/course/lessonModalsSlice';
import { type LessonForm } from '@/src/shared/utils';
import {
  addLesson,
  changeEditMode,
  deleteLesson,
  updateLesson,
} from '@/src/features/course/courseSlice';
import { v4 as uuidv4 } from 'uuid';
import DeleteModal from '@/src/shared/components/Modal/DeleteModal';
import Lessons from './Lessons';

const AddLessonSection: FC = () => {
  const { add, edit, deleteL } = useAppSelector((state) => state.lessonModals);
  const { editMode } = useAppSelector((state) => state.course);
  const dispatch = useAppDispatch();

  const handleAddSubmit = (event: LessonForm): void => {
    dispatch(closeModal(lessonModalEnum.ADD));
    dispatch(addLesson({ id: uuidv4(), ...event }));
  };

  const handleEditSubmit = (event: LessonForm): void => {
    if (edit) {
      dispatch(updateLesson({ ...edit, ...event }));
      dispatch(closeModal(lessonModalEnum.EDIT));
    }
  };

  const handleDeleteLesson = (): void => {
    if (deleteL) {
      dispatch(deleteLesson(deleteL.id));
      dispatch(closeModal(lessonModalEnum.DELETE));
    }
  };

  useEffect(() => {
    dispatch(changeEditMode(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-2">
      <Lessons />
      {editMode && (
        <Button
          buttonClass="flex items-center space-x-1 border border-textGray !py-[5px] !px-2 text-[12px] !font-medium"
          text="Add lesson"
          onClick={() => dispatch(openModal({ type: lessonModalEnum.ADD }))}
        >
          <PlusIcon />
        </Button>
      )}
      <LessonModal
        title="Add new lesson"
        state={add}
        closeModal={() => dispatch(closeModal(lessonModalEnum.ADD))}
        onSubmit={handleAddSubmit}
      />
      <LessonModal
        title="Edit lesson"
        state={edit !== null}
        submitButtonTitle="Save"
        closeModal={() => dispatch(closeModal(lessonModalEnum.EDIT))}
        initialValues={edit}
        onSubmit={handleEditSubmit}
      />
      <DeleteModal
        state={deleteL !== null}
        closeModal={() => dispatch(closeModal(lessonModalEnum.DELETE))}
        type="lesson"
        title={deleteL?.title ?? ''}
        onDelete={handleDeleteLesson}
      />
    </div>
  );
};

export default AddLessonSection;
