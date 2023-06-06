/* eslint-disable multiline-ternary */
import { type FC } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { reorderLessons } from '@/src/features/course/courseSlice';
import { useStrictDroppable } from '@/src/shared/hooks/useStrictDroppable';
import LessonItem from './LessonItem';

const Lessons: FC = () => {
  const {
    values: { lessons },
    editMode,
  } = useAppSelector((state) => state.course);
  const dispatch = useAppDispatch();
  const [enabled] = useStrictDroppable(false);

  return (
    <DragDropContext onDragEnd={(result) => dispatch(reorderLessons(result))}>
      {enabled && (
        <Droppable droppableId="lessons" isDropDisabled={!editMode}>
          {(droppableprovided, _) => (
            <div ref={droppableprovided.innerRef} {...droppableprovided.droppableProps}>
              {lessons.length > 0 ? (
                lessons.map((lesson, index) => (
                  <Draggable
                    isDragDisabled={!editMode}
                    key={lesson.id}
                    draggableId={lesson.id.toString()}
                    index={index}
                  >
                    {(provided, _) => (
                      <div
                        ref={provided.innerRef}
                        className="mb-2"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <LessonItem lesson={lesson} />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <p className="text-[14px] text-center w-[70%]">
                  No lessons yet, at least one lesson is required!
                </p>
              )}
              {droppableprovided.placeholder}
            </div>
          )}
        </Droppable>
      )}
    </DragDropContext>
  );
};

export default Lessons;
