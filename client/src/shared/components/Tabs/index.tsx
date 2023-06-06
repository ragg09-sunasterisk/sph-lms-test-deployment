/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { setActiveTab } from '@/src/features/tab/tabSlice';
import { Children, Fragment, useEffect, useState, type FC, type ReactElement } from 'react';
import { type ChildElementObject } from '../../utils/interface';
import { type TabProps } from './Tab';

interface TabsProps {
  children: ReactElement<TabProps> | Array<ReactElement<TabProps>>;
}

const Tabs: FC<TabsProps> = ({ children }) => {
  const { activeTab } = useAppSelector((state) => state.tab);
  const dispatch = useAppDispatch();
  const [childrenList, setChildrenList] = useState<ChildElementObject>({});

  useEffect(() => {
    let tab = 0;
    const childrenListObj: ChildElementObject = {};

    Children.map(children, (child) => {
      if (
        Object.hasOwnProperty.call(child.type, 'name') &&
        Object.getOwnPropertyDescriptors(child.type).name?.value === 'Tab'
      ) {
        childrenListObj[tab] = {
          id: tab,
          title: child.props.title,
          childContent: child,
        };
        tab++;
      }
    });

    setChildrenList(childrenListObj);
  }, [children, activeTab]);

  return (
    <Fragment>
      <div className="hidden md:flex mb-4 border-b">
        <div className="flex space-x-3 font-medium text-sm text-dark capitalize items-center">
          {Object.values(childrenList).map(({ title, id }) => (
            <div
              key={id}
              className={`${
                activeTab !== id ? '' : ' bg-primary-400 border-base border-b-[2px]'
              } p-2.5 cursor-pointer flex pointer-events-auto`}
              onClick={() => {
                dispatch(setActiveTab(id));
              }}
            >
              {title}
            </div>
          ))}
        </div>
      </div>

      <div>{childrenList[activeTab]?.childContent}</div>
    </Fragment>
  );
};
export default Tabs;
