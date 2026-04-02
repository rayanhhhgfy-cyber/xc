import { ReactNode, useState } from "react";

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface ExperimentTabsProps {
  tabs: Tab[];
  children: (activeTab: string) => ReactNode;
}

export default function ExperimentTabs({ tabs, children }: ExperimentTabsProps) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  return (
    <div className="w-full">
      <div className="flex gap-0.5 xs:gap-1 overflow-x-auto pb-1 xs:pb-1.5 sm:pb-2 mb-3 xs:mb-4 sm:mb-5 md:mb-6 scrollbar-none -mx-2 xs:-mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 xl:-mx-12 px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex items-center gap-0.5 xs:gap-1 px-2 xs:px-3 sm:px-4 md:px-5 py-1.5 xs:py-2 sm:py-2.5 md:py-3 rounded-lg text-xs xs:text-xs sm:text-sm md:text-base font-medium border transition whitespace-nowrap flex-shrink-0 ${
              active === tab.id ? "tab-active" : "tab-inactive"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      {children(active)}
    </div>
  );
}
