'use client';

import { useState, useRef, useEffect } from 'react';
import { TabNavigation, TabItem } from '@/components/tabs/TabNavigation';
import { WhyWhatContent } from '@/components/cicd-workflow/WhyWhatContent';
import { HowContent } from '@/components/cicd-workflow/HowContent';
import { OurPlanContent } from '@/components/cicd-workflow/OurPlanContent';

const TABS: TabItem[] = [
  { id: 'why-what', label: 'Why' },
  { id: 'how', label: 'How' },
  { id: 'our-plan', label: 'Our Plan' },
];

export default function CICDWorkflowPage() {
  const [activeTab, setActiveTab] = useState('how');
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Update container height based on active tab content
  useEffect(() => {
    if (containerRef.current) {
      const activePanel = containerRef.current.querySelector(`#tabpanel-${activeTab}`);
      if (activePanel) {
        setHeight(activePanel.scrollHeight);
      }
    }
  }, [activeTab]);

  return (
    <div className="pt-6 px-4">
      <div className="w-full max-w-4xl mx-auto">
        <TabNavigation tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Container with dynamic height */}
        <div ref={containerRef} className="relative" style={{ height: height || 'auto' }}>
          <div
            role="tabpanel"
            id="tabpanel-why-what"
            aria-labelledby="tab-why-what"
            className="absolute inset-0"
            style={{ visibility: activeTab === 'why-what' ? 'visible' : 'hidden' }}
          >
            <WhyWhatContent />
          </div>

          <div
            role="tabpanel"
            id="tabpanel-how"
            aria-labelledby="tab-how"
            className="absolute inset-0"
            style={{ visibility: activeTab === 'how' ? 'visible' : 'hidden' }}
          >
            <HowContent />
          </div>

          <div
            role="tabpanel"
            id="tabpanel-our-plan"
            aria-labelledby="tab-our-plan"
            className="absolute inset-0"
            style={{ visibility: activeTab === 'our-plan' ? 'visible' : 'hidden' }}
          >
            <OurPlanContent />
          </div>
        </div>
      </div>
    </div>
  );
}
