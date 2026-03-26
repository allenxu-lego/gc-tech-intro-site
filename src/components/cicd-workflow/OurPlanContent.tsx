import { Timeline } from './Timeline';
import Image from 'next/image';

export function OurPlanContent() {
  return (
    <div className="py-6 w-full">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Image src="/plan.jpeg" alt="Badge" width={20} height={20} className=' mb-4' />
        <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">Our Plan</h2>
      </div>
      <p className="text-slate-500 text-center max-w-2xl px-4 mx-auto">
        This section outlines our roadmap and strategic approach to DevOps excellence.
      </p>
      <Timeline />
    </div>
  );
}
