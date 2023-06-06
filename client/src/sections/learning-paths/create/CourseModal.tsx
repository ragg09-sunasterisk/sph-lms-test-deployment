import Modal from '@/src/shared/components/Modal/Modal';
import SearchBar from '@/src/shared/components/SearchBar/SearchBar';
import Table from '@/src/shared/components/Table';
import XmarkIcon from '@/src/shared/icons/XmarkIcon';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ListItem } from '@/src/shared/components/Table/ListItem';
import Pagination from '@/src/shared/components/Pagination';
import Button from '@/src/shared/components/Button';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { updateForm } from '@/src/features/learning-path/learningPathSlice';
import { type Course } from '../../../shared/utils/interface';

enum HeaderEnum {
  Name = 'name',
  Uploaded_By = 'uploaded_by',
  Data_Uploaded = 'created_at',
  Date_Modified = 'updated_at',
}

interface CourseModalProps {
  title: string;
  state: boolean;
  submitButtonTitle?: string;
  closeModal: () => void;
}

interface CourseModalForm {
  courses: string[];
}

const CourseModal = ({
  state,
  submitButtonTitle = 'Submit',
  title,
  closeModal,
}: CourseModalProps): JSX.Element => {
  const { courses } = useAppSelector((state) => state.learningPath.values);
  const [page, setPage] = useState(1);
  const [newCourses, setNewCourses] = useState<Course[]>([]);

  const dispatch = useAppDispatch();
  const { register, reset, handleSubmit } = useForm<CourseModalForm>();

  useEffect(() => {
    setNewCourses(courses);
  }, [courses]);

  const handleClose = (): void => {
    setNewCourses(courses);
    closeModal();
    reset();
  };

  const handleCheckboxChange = (data: string): void => {
    const newData: Course = JSON.parse(data);
    if (newCourses.some((course) => course.id === newData.id)) {
      setNewCourses(newCourses.filter((course) => course.id !== newData.id));
    } else setNewCourses([...newCourses, newData]);
  };

  const updateCoursesOrder = (courses: Course[]): Course[] => {
    return courses.map((course, index) => ({ ...course, order: index }));
  };

  const removeUncheckedCourses = (courses: Course[], serializedCourses: Course[]): Course[] => {
    return updateCoursesOrder(
      courses.filter((course) => serializedCourses.some((c) => c.id === course.id))
    );
  };

  const onSubmit = ({ courses: courseList }: CourseModalForm): void => {
    const serializedCourses: Course[] = courseList.map((c) => JSON.parse(c));
    let parsedCourses = [...courses];

    if (parsedCourses.length) {
      parsedCourses = removeUncheckedCourses(courses, serializedCourses);
    }

    serializedCourses.forEach((course) => {
      if (!parsedCourses.some((c) => c.id === course.id)) {
        parsedCourses.push({ ...course, order: parsedCourses.length });
      }
    });

    dispatch(updateForm({ courses: parsedCourses }));
    closeModal();
    reset();
  };

  return (
    <Modal isOpen={state}>
      <div className="flex flex-col">
        <div className="flex justify-between p-4">
          <h2 className="text-base font-medium text-neutral-900">{title}</h2>
          <XmarkIcon className="cursor-pointer" onClick={handleClose} />
        </div>
        <div className="p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <SearchBar placeholder="Search" onSearchEvent={() => {}} />
            </div>
            <Table
              checkbox={false}
              sortable={false}
              header={[
                { text: 'Name' },
                { text: 'Uploaded by' },
                { text: 'Date uploaded' },
                { text: 'Date modified' },
              ]}
            >
              {dummyData.map((data) => {
                return (
                  <ListItem<Course>
                    key={data.id}
                    data={data}
                    headerEnum={HeaderEnum}
                    register={register}
                    checkboxName="courses"
                    isChecked={newCourses.some((course) => course.id === data.id)}
                    onCheckboxChange={handleCheckboxChange}
                  />
                );
              })}
            </Table>
            <div className="flex justify-center items-center h-14">
              <Pagination
                currentPage={page}
                maxPages={5}
                totalPages={10}
                onChangePage={(page) => {
                  setPage(page);
                }}
              />
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                onClick={handleClose}
                buttonClass="border border-textGray py-[6px] !px-4 !font-medium"
                text="Cancel"
              />
              <Button
                type="submit"
                disabled={!newCourses.length}
                buttonClass={`border border-red !text-red py-[6px] !w-36 !font-medium ${
                  !newCourses.length ? 'opacity-50 !border-red' : ''
                }`}
                text={submitButtonTitle}
              />
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default CourseModal;

const dummyData = [
  {
    id: 1,
    name: 'HTML Crash Course',
    img_path: '/image1.jpg',
    uploaded_by: 'John Doe',
    created_at: '04-27-2023',
    updated_at: '04-30-2023',
  },
  {
    id: 2,
    name: 'CSS Crash Course',
    img_path: '/image1.jpg',
    uploaded_by: 'Jane Dough',
    created_at: '04-15-2023',
    updated_at: '04-23-2023',
  },
  {
    id: 3,
    name: 'JavaScript Crash Course',
    img_path: '/image1.jpg',
    uploaded_by: 'James Bow',
    created_at: '04-02-2023',
    updated_at: '05-13-2023',
  },
  {
    id: 4,
    name: 'React Crash Course',
    img_path: '/image1.jpg',
    uploaded_by: 'Jon Bro',
    created_at: '04-27-2023',
    updated_at: '04-27-2023',
  },
  {
    id: 5,
    name: 'Django Crash Course',
    img_path: '/image1.jpg',
    uploaded_by: 'Jen Yo',
    created_at: '04-27-2023',
    updated_at: '04-27-2023',
  },
];
