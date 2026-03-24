'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, User } from 'lucide-react';
import Image from 'next/image';

const items = [
  {
    number: 1,
    title: 'Faster Time-to-Market',
    content: 'Automate testing and deployment to launch features, fixes, and promotions quickly especially critical during peak retail seasons.',
  },
  {
    number: 2,
    title: 'Higher Reliability & Security',
    content: 'Ensure consistent environments, reduce production errors, and enforce security compliance controls across the pipeline.',
  },
  {
    number: 3,
    title: 'Greater Team Autonomy & Agility',
    content: 'Empower developers with self-service workflows, faster feedback loops, and ownership from code to customer experience.',
  },
];

export function WhyWhatContent() {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [isDiagramExpanded, setIsDiagramExpanded] = useState(true);

  const toggleItem = (index: number) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="py-12 w-full">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Image src="/badge.png" alt="Badge" width={32} height={32} />
        <h2 className="text-2xl font-semibold text-slate-800 text-center">
          Benefits of Owning DevOps Infrastructure
        </h2>
      </div>

      <div className="max-w-2xl mx-auto px-4 space-y-4">
        {items.map((item, index) => (
          <div key={item.number} className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold text-sm">
              {item.number}
            </div>
            <div className="flex-1">
              <button
                onClick={() => toggleItem(index)}
                className="inline-flex items-center gap-1 text-left group"
              >
                <h3 className="text-lg font-semibold text-slate-800">{item.title}</h3>
                <div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center group-hover:bg-yellow-100 transition-colors">
                  {expandedItems.has(index) ? (
                    <Minus className="w-3 h-3 text-slate-500 group-hover:text-yellow-600" />
                  ) : (
                    <Plus className="w-3 h-3 text-slate-500 group-hover:text-yellow-600" />
                  )}
                </div>
              </button>
              <AnimatePresence initial={false}>
                {expandedItems.has(index) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-slate-500 pt-2">{item.content}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      {/* Architecture Diagram Section */}
      <div className="max-w-2xl mx-auto px-4 mt-12">
        <button
          onClick={() => setIsDiagramExpanded(!isDiagramExpanded)}
          className="inline-flex items-center gap-1 text-left group mb-4"
        >
          <h3 className="text-lg font-semibold text-slate-800">It'll look like...</h3>
          <div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center group-hover:bg-yellow-100 transition-colors">
            {isDiagramExpanded ? (
              <Minus className="w-3 h-3 text-slate-500 group-hover:text-yellow-600" />
            ) : (
              <Plus className="w-3 h-3 text-slate-500 group-hover:text-yellow-600" />
            )}
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isDiagramExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <svg
          viewBox="0 0 500 260"
          className="w-full h-auto"
          role="img"
          aria-label="DevOps Infrastructure Architecture Diagram"
        >
          {/* Arrow markers */}
          <defs>
            <marker
              id="arch-arrow-default"
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path d="M0,0 L8,4 L0,8 L1,4 Z" fill="#38bdf8" />
            </marker>
          </defs>

          {/* Cloud region boundary */}
          <rect
            x="120"
            y="20"
            width="295"
            height="220"
            rx="12"
            fill="#f8fafc"
            stroke="#e2e8f0"
            strokeWidth="2"
          />

          {/* Developer node (outside cloud) */}
          <g transform="translate(30, 40)">
            <rect x="0" y="0" width="80" height="60" rx="8" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1.5" />
            <g transform="translate(28, 8)">
              <User size={24} style={{ color: '#94a3b8' }} />
            </g>
            <text x="40" y="52" textAnchor="middle" className="text-[10px] fill-slate-500 font-medium">
              Developer
            </text>
          </g>

          {/* GitLab node */}
          <g transform="translate(160, 40)">
            <rect x="0" y="0" width="60" height="60" rx="8" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1.5" />
            <image href="/gitlab.png" x="14" y="8" width="32" height="32" />
            <text x="30" y="56" textAnchor="middle" className="text-[10px] fill-slate-500 font-medium">
              GitLab
            </text>
          </g>

          {/* Jenkins node */}
          <g transform="translate(160, 160)">
            <rect x="0" y="0" width="60" height="60" rx="8" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1.5" />
            <image href="/jenkins-color.png" x="14" y="8" width="32" height="32" />
            <text x="30" y="56" textAnchor="middle" className="text-[10px] fill-slate-500 font-medium">
              Jenkins
            </text>
          </g>

          {/* Dify node */}
          <g transform="translate(300, 40)">
            <rect x="0" y="0" width="60" height="60" rx="8" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1.5" />
            <image href="/dify.svg" x="14" y="8" width="32" height="32" />
            <text x="30" y="56" textAnchor="middle" className="text-[10px] fill-slate-500 font-medium">
              Dify
            </text>
          </g>

          {/* Kubernetes node */}
          <g transform="translate(300, 160)">
            <rect x="0" y="0" width="60" height="60" rx="8" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1.5" />
            <image href="/kubernetes.png" x="14" y="8" width="32" height="32" />
            <text x="30" y="56" textAnchor="middle" className="text-[10px] fill-slate-500 font-medium">
              Kubernetes
            </text>
          </g>

          {/* Connection lines */}
          {/* Developer → GitLab */}
          <path
            d="M 110 70 L 160 70"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeLinecap="round"
            markerEnd="url(#arch-arrow-default)"
            className="flowchart-edge-flowing"
            style={{ strokeDasharray: '6 14' }}
          />

          {/* Jenkins → GitLab (pull) */}
          <path
            d="M 190 160 L 190 100"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeLinecap="round"
            markerEnd="url(#arch-arrow-default)"
            className="flowchart-edge-flowing"
            style={{ strokeDasharray: '6 14' }}
          />

          {/* Jenkins → Dify (deploy) */}
          <path
            d="M 220 175 L 300 70"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeLinecap="round"
            markerEnd="url(#arch-arrow-default)"
            className="flowchart-edge-flowing"
            style={{ strokeDasharray: '6 14' }}
          />

          {/* Jenkins → Kubernetes (deploy) */}
          <path
            d="M 220 190 L 300 190"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeLinecap="round"
            markerEnd="url(#arch-arrow-default)"
            className="flowchart-edge-flowing"
            style={{ strokeDasharray: '6 14' }}
          />

          {/* Dashed box around GitLab and Jenkins */}
          <rect
            x="150"
            y="30"
            width="80"
            height="200"
            rx="8"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Dashed box around Dify and Kubernetes */}
          <rect
            x="290"
            y="30"
            width="80"
            height="200"
            rx="8"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Aliyun icon in bottom left of cloud region */}
          <image href="/aliyun.jpg" x="380" y="205" width="28" height="28" />
        </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}