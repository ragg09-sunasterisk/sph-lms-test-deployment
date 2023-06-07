import React, { Fragment, useState, type ReactElement } from 'react';

interface Tab {
  name: string;
  content: ReactElement;
}

interface TabsProps {
  tabs: Tab[];
}

const TabTemp: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab: Tab): void => {
    setActiveTab(tab);
  };

  return (

    <Fragment>
    <div className="hidden md:flex mb-4 border-b">
     <div className="flex space-x-3 font-medium text-sm text-dark capitalize items-center">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            className={`p-2.5 cursor-pointer flex pointer-events-auto ${tab === activeTab ? 'bg-primary-400 border-base border-b-[2px]' : ''}`}
            onClick={() => { handleTabClick(tab); }}
          >
            {tab.name}
          </div>
        ))}
      </div>
    </div>

    <div className="tab-content">{activeTab.content}</div>
    </Fragment>
  );
};

export default TabTemp;
