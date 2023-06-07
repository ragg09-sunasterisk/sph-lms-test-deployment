import { useGetCourseQuery } from '@/src/services/courseAPI';
import ContentSection from '@/src/sections/courses/ContentSection';
import SettingsSection from '@/src/sections/courses/SettingsSection';
import EditSettingsButton from '@/src/sections/courses/SettingsSection/EditSettingsButton';
import LearningSection from '@/src/sections/courses/LearningSection/index';
import Breadcrumbs from '@/src/shared/components/Breadcrumbs';
import Tabs from '@/src/shared/components/Tabs';
import Tab from '@/src/shared/components/Tabs/Tab';
import Container from '@/src/shared/layouts/Container';
import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import { useAppDispatch } from '@/src/redux/hooks';
import { reset } from '@/src/features/course/courseSlice';
import TabTemp from '@/src/shared/components/TabTemp';

const CourseContent: React.FC = () => {
  const { query } = useRouter();
  const dispatch = useAppDispatch();
  const { data: course } = useGetCourseQuery(query.id, {
    skip: query.id === undefined,
  });
  const paths = [
    {
      text: 'Course',
      url: '/trainer/courses',
    },
    {
      text: course?.name,
      url: `/trainer/courses/${course?.id}`,
    },
  ];

  useEffect(() => {
    if (course) {
      dispatch(reset(course));
    }
  }, [course]);

  const tabs = [
    {
      name: 'Content',
      content: <ContentSection course={course} />
    },
    {
      name: 'Learners',
      content: <LearningSection />
    },
    {
      name: 'Settings',
      content: <SettingsSection />
    }
  ];

  return (
    <Fragment>
      <div className="ml-5 mt-5 border border-2">
         <TabTemp tabs={tabs} />
      </div>

      <div className="ml-5 mt-5">
        <Breadcrumbs paths={paths} />
        <Container className="px-28">
          <div className="text-[20px] font-semibold my-5 text-textGray flex justify-between line-clamp-1">
            <h1>{course?.name}</h1>
            <EditSettingsButton />
          </div>
          <Tabs>
            <Tab title="Content">
              <ContentSection course={course} />
            </Tab>
            <Tab title="Learners">
              <LearningSection />
            </Tab>
            <Tab title="Settings">
              <SettingsSection />
            </Tab>
          </Tabs>
        </Container>
      </div>
    </Fragment>
  );
};

export default CourseContent;
