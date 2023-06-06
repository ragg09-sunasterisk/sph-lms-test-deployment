import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { lessonModalEnum, openModal } from '@/src/features/course/lessonModalsSlice';
import EditIcon from '@/src/shared/icons/EditIcon';
import FourDotsIcon from '@/src/shared/icons/FourDotsIcon';
import TrashIcon from '@/src/shared/icons/TrashIcon';
import type { Lesson } from '@/src/shared/utils';
import { type FC } from 'react';

interface LessonItemProps {
  lesson: Lesson;
}

const LessonItem: FC<LessonItemProps> = ({ lesson }) => {
  const { editMode } = useAppSelector((state) => state.course);
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center min-w-[70%] w-fit p-[17px] border rounded-md space-x-1 bg-white">
      <FourDotsIcon />
      <h3 className="flex-grow text-[14px]">{lesson.title}</h3>
      {editMode && (
        <div className="flex space-x-[10px]">
          <EditIcon
            className="opacity-50 cursor-pointer"
            onClick={() => dispatch(openModal({ type: lessonModalEnum.EDIT, lesson }))}
          />
          <TrashIcon
            className="opacity-50 cursor-pointer"
            onClick={() => dispatch(openModal({ type: lessonModalEnum.DELETE, lesson }))}
          />
        </div>
      )}
    </div>
  );
};

export default LessonItem;
