import { useAppDispatch } from '@/src/redux/hooks';
import { courseModalEnum, openModal } from '@/src/features/learning-path/courseModalsSlice';
import Collapse from '@/src/shared/components/Collapse/Collapse';
import FourDotsIcon from '@/src/shared/icons/FourDotsIcon';
import type { Course, Lesson } from '@/src/shared/utils';

interface CourseItemProps {
  course: Course;
}

const CourseItem = ({ course }: CourseItemProps): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <Collapse
      label={course.name}
      onDelete={() => {
        dispatch(openModal({ type: courseModalEnum.DELETE, course }));
      }}
    >
      {/* Change to `course.lessons` during integration */}
      {lessons.length > 0 &&
        lessons.map((lesson) => {
          return (
            <div key={lesson.id} className="flex gap-1 items-center w-full py-4 px-6">
              <FourDotsIcon />
              <h3 className="text-xs">{lesson.title}</h3>
            </div>
          );
        })}
    </Collapse>
  );
};

export default CourseItem;

const lessons: Lesson[] = [
  {
    id: '1',
    order: 1,
    title: 'Section 1',
    link: '#',
  },
  {
    id: '2',
    order: 2,
    title: 'Section 2',
    link: '#',
  },
  {
    id: '3',
    order: 3,
    title: 'Section 3',
    link: '#',
  },
  {
    id: '4',
    order: 4,
    title: 'Section 4',
    link: '#',
  },
  {
    id: '5',
    order: 5,
    title: 'Section 5',
    link: '#',
  },
];
