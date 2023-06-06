import LearningPathCourseCard from '@/src/shared/components/Card/LearningPathCourseCard';
import ChevronDown from '@/src/shared/icons/ChevronDownIcon';
import type { Course } from '@/src/shared/utils';
import React from 'react';

const LearningPathContentSection = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-4 mb-16">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-dark font-medium">Description:</span>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur. Lectus sed interdum euismod rhoncus quis eu
          elementum. Sapien eu faucibus nisl tristique ultricies morbi pellentesque volutpat
          egestas. Sapien eu faucibus nisl tristique ultricies morbi pellentesque volutpat egestas.
          Sapien eu faucibus nisl tristique ultricies morbi pellentesque volutpat egestas.
        </p>
      </div>
      <div>
        {courses.map((course, index) => (
          <div key={course.id} className="flex flex-col items-center">
            <LearningPathCourseCard course={course} />
            {courses.length - 1 !== index && <ChevronDown height={40} width={40} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningPathContentSection;

const courses: Course[] = [
  {
    id: 1,
    name: 'HTML Crash Course',
    img_path: '/image1.jpg',
    lessons: [
      {
        id: '1',
        link: '',
        order: 1,
        title: 'Section 1',
      },
    ],
    categories: [],
    description: 'Description',
    is_active: true,
    order: 1,
    ratings: 5,
  },
  {
    id: 2,
    name: 'CSS Crash Course',
    img_path: '/image1.jpg',
    lessons: [
      {
        id: '1',
        link: '',
        order: 1,
        title: 'Section 1',
      },
    ],
    categories: [],
    description: 'Description',
    is_active: true,
    order: 1,
    ratings: 5,
  },
  {
    id: 3,
    name: 'JavaScript Crash Course',
    img_path: '/image1.jpg',
    lessons: [
      {
        id: '1',
        link: '',
        order: 1,
        title: 'Section 1',
      },
    ],
    categories: [],
    description: 'Description',
    is_active: true,
    order: 1,
    ratings: 5,
  },
];
