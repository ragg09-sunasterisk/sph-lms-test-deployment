import type { Course } from '@/src/shared/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  course: Course;
}

const LearningPathCourseCard = ({ course }: Props): JSX.Element => {
  const lessonCount = course.lessons?.length ?? 0;
  return (
    <Link href={`/trainer/courses/${course.id}`}>
      <div className="flex w-fit min-w-[420px] min-h-[128px] overflow-hidden bg-white border rounded-[5px] border-neutral-100">
        <Image
          src={course.img_path}
          width={150}
          height={150}
          alt={course.name}
          className="object-cover"
        />
        <div className="w-full p-4 flex flex-col gap-2">
          <h3>{course.name}</h3>
          <div className="flex flex-col text-xs">
            <span className="text-disabled">
              {lessonCount} {lessonCount === 1 ? 'lesson' : 'lessons'} available
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LearningPathCourseCard;
