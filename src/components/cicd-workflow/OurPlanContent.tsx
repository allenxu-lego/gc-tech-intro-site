import { Timeline } from './Timeline';

export function OurPlanContent() {
  return (
    <div className="py-12 w-full">
      <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">Our Plan</h2>
      <p className="text-slate-500 text-center max-w-2xl px-4 mx-auto">
        This section outlines our roadmap and strategic approach to DevOps excellence,
      </p>
      <Timeline />
    </div>
  );
}
