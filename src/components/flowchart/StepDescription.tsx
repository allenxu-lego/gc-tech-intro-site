'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  User,
  Gitlab,
  GitPullRequest,
  Code2Icon,
  CheckCircle,
  CircleHelp,
  Cloud,
  Rocket,
  CloudCheck,
  ArrowRight,
  Download,
  LogIn,
  TestTube,
  TestTube2Icon,
  Search,
  Info,
  X,
  Package,
  Upload,
  ArrowRightCircleIcon,
} from 'lucide-react';
import type { NodeId } from './FlowchartContext';

interface StepDescriptionProps {
  activeNode: NodeId | null;
  onStartWorkflow?: () => void;
  onContinue?: () => void;
  hasNextStep?: boolean;
}

interface StepInfo {
  title: string;
  description: string | React.ReactNode;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties; strokeWidth?: number }>;
  accent: string;
}

/**
 * InfoPopup component - shows a floating info box when info icon is clicked.
 */
interface InfoPopupProps {
  content: React.ReactNode;
  title?: string;
}

function InfoPopup({ content, title }: InfoPopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span className="relative inline-flex items-center">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
        type="button"
      >
        <Info size={14} className={`transition-colors ${isOpen ? 'text-blue-500' : 'text-slate-400 hover:text-blue-500'}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 left-0 top-6 w-64 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden text-left"
          >
            <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-200">
              <span className="text-xs font-semibold text-slate-700">{title || 'Info'}</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="p-0.5 hover:bg-slate-200 rounded transition-colors"
              >
                <X size={12} className="text-slate-400" />
              </button>
            </div>
            <div className="px-3 py-2 text-xs text-slate-600">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

const steps: Record<string, StepInfo> = {
  default: {
    title: 'Git Flow & DevOps Automation',
    description: (<>
      Click to walk through the Git flow and automated DevOps workflow.
    </>),
    icon: Play,
    accent: '#64748b',
  },
  developer: {
    title: 'Code Submission',
    description: (
      <>
        The developer pushes feature branch code to the 
        <img src="/gitlab.png" alt="GitLab" className="inline-block w-5 h-5 mx-1 align-middle" />
        <strong>Gitlab repository</strong>.
      </>
    ),
    icon: User,
    accent: '#3b82f6',
  },
  gitlab: {
    title: 'Source Code Management',
    description: (
      <>
      Tapestry managed<img src="/gitlab.png" alt="GitLab" className="inline-block w-5 h-5 mx-1 align-middle" /><strong>GitLab platform</strong> serves as the code storage, version control and collaboration tool.
      </>
    ),
    icon: Gitlab,
    accent: '#f97316',
  },
  'merge-request': {
    title: 'Create Pull Request',
    description: (
      <>
        Create a <strong>Pull Request</strong> to merge code.
      </>
    ),
    icon: GitPullRequest,
    accent: '#8b5cf6',
  },
  'code-review': {
    title: 'Code Review Automation',
    description: (
      <>
        <strong>Code review</strong> is (optionally) auto triggered by a <strong>Pull Request</strong> merge action for checking code quality, security, and implementation best practices.
      </>
    ),
    icon: Code2Icon,
    accent: '#22c55e',
  },
  'merge-complete': {
    title: 'Merge Complete',
    description: (
      <>
        Code successfully <strong>merges</strong> into the target(main) branch after passing <strong>code review</strong>, which is the completion of the <strong>git flow</strong>.
      </>
    ),
    icon: CheckCircle,
    accent: '#10b981',
  },
  'deploy-decision': {
    title: 'DevOps Automation Pipeline',
    description: (
      <>
        Tapestry managed<img src="/jenkins-color.png" alt="Jenkins" className="inline-block w-5 h-5 mx-1 align-middle" />
        <strong>Jenkins platform</strong> is the centralized <strong>DevOps orchestration centre</strong> for both <strong>applications</strong> and <strong>AI workflows</strong>.
      </>
    ),
    icon: CircleHelp,
    accent: '#eab308',
  },
  'jenkins-for-svc': {
    title: 'CI/CD for Service',
    description: (
      <>
        <img src="/jenkins-color.png" alt="Jenkins" className="inline-block w-5 h-5 mx-1 align-middle" />
        Jenkins executes the standard deployment pipeline for services.
        <br/><strong>Steps:</strong><br/>
        1)<GitPullRequest size={16} className="inline-block mx-1 align-middle text-blue-500" />Pull source code from <img src="/gitlab.png" alt="GitLab" className="inline-block w-5 h-5 mx-1 align-middle" /> <ArrowRight size={16} className="inline-block mx-1 align-middle text-blue-500" />
        2)<TestTube size={16} className="inline-block mx-1 align-middle text-blue-500" />Run Unit Test<ArrowRight size={16} className="inline-block mx-1 align-middle text-blue-500" />
        3)<Search size={16} className="inline-block mx-1 align-middle text-blue-500" />
        Code Scan
        <InfoPopup
          title="Code Scan"
          content={
            <div className="space-y-1">
              <p><strong>Sonar Scan</strong></p>
              <p>Bugs, Code Smells and Security Hotspots.</p>
              <p><strong>Synk Scan</strong></p>
              <p>CVE vulnerabilities of dependencies.</p>
            </div>
          }
        />
        <ArrowRight size={16} className="inline-block mx-1 align-middle text-blue-500" /><br/>
        4)<Package size={16} className="inline-block mx-1 align-middle text-blue-500" />Buid Image
        <InfoPopup
          title="Build Image"
          content={
            <div className="space-y-1">
              <p>Build <img src="/docker.png" alt="docker" className="inline-block w-8 h-8 mx-1 align-middle" />Image.</p>
            </div>
          }
        />
        <ArrowRight size={16} className="inline-block mx-1 align-middle text-blue-500" />
        5)<Upload size={16} className="inline-block mx-1 align-middle text-blue-500" />Push Image
        <InfoPopup
          title="Push Image"
          content={
            <div className="space-y-1">
              <p>Push <img src="/docker.png" alt="docker" className="inline-block w-8 h-8 mx-1 align-middle" />Image to ACR on <img src="/aliyun.jpg" alt="Aliyun" className="inline-block w-5 h-5 mx-1 align-middle" />.</p>
            </div>
          }
        />
        <ArrowRight size={16} className="inline-block mx-1 align-middle text-blue-500" />
        6)<Rocket size={16} className="inline-block mx-1 align-middle text-blue-500" />Deploy to <img src="/aliyun.jpg" alt="Aliyun" className="inline-block w-5 h-5 mx-1 align-middle" />as
        <img src="/kubernetes.png" alt="kubernetes" className="inline-block w-5 h-5 mx-1 align-middle" />service.
      </>
    ),
    icon: Rocket,
    accent: '#0ea5e9',
  },
  'aliyun-cloud': {
    title: 'Ali Cloud',
    description: (
      <>
        Deploy services to Tapestry managed <img src="/aliyun.jpg" alt="Aliyun" className="inline-block w-5 h-5 mx-1 align-middle" /><strong>Ali Cloud</strong> infrastructure.
      </>
    ),
    icon: Cloud,
    accent: '#f97316',
  },
  'jenkins-for-dify': {
    title: 'CI/CD for AI Workflow',
    description: (
      <>
        <img src="/jenkins-color.png" alt="Jenkins" className="inline-block w-5 h-5 mx-1 align-middle" /><strong>Jenkins CI/CD pipeline</strong> deploys AI workflow DSL to the<img src="/dify.svg" alt="Dify" className="inline-block w-5 h-5 mx-1 align-middle" /><strong>platform</strong>.
        <br/><strong>Steps:</strong><br/>
        1)<Download size={16} className="inline-block mx-1 align-middle text-blue-500" />Pull DSL from <img src="/gitlab.png" alt="GitLab" className="inline-block w-5 h-5 mx-1 align-middle" /> <ArrowRight size={16} className="inline-block mx-1 align-middle text-blue-500" />
        2)<LogIn size={16} className="inline-block mx-1 align-middle text-blue-500" />Log in<img src="/dify.svg" alt="Dify" className="inline-block w-5 h-5 mx-1 align-middle" /><ArrowRight size={16} className="inline-block mx-1 align-middle text-blue-500" /><br/>
        3)<Rocket size={16} className="inline-block mx-1 align-middle text-blue-500" />Deploy DSL to <img src="/dify.svg" alt="Dify" className="inline-block w-5 h-5 mx-1 align-middle" /><ArrowRight size={16} className="inline-block mx-1 align-middle text-blue-500" />
        4)<CheckCircle size={16} className="inline-block mx-1 align-middle text-blue-500" />Verify Deployment
      </>
    ),
    icon: Rocket,
    accent: '#8b5cf6',
  },
  'dify': {
    title: 'AI Platform',
    description: (
      <>
        Tapestry managed<img src="/dify.svg" alt="Dify" className="inline-block w-5 h-5 mx-1 align-middle" />
        system serves as the central AI orchestration platform.
      </>
    ),
    icon: CloudCheck,
    accent: '#06b6d4',
  },
  'production': {
    title: 'Live in Production',
    description: (
      <>
        Deployment complete. Deliverable is live in target environment.
      </>
    ),
    icon: CloudCheck,
    accent: '#22c55e',
  },
};

const nodeSequence: NodeId[] = [
  'developer',
  'gitlab',
  'merge-request',
  'code-review',
  'merge-complete',
  'deploy-decision',
  'jenkins-for-svc',
  'aliyun-cloud',
  'jenkins-for-dify',
  'dify',
  'production',
];

export default function StepDescription({ activeNode, onStartWorkflow, onContinue, hasNextStep }: StepDescriptionProps) {
  const stepKey = activeNode || 'default';
  const step = steps[stepKey] || steps.default;
  const stepNumber = activeNode ? nodeSequence.indexOf(activeNode) + 1 : 0;
  const isDefault = stepNumber === 0;

  return (
    <div className="h-24 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={stepKey}
          className="flex flex-col items-center gap-2 text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2">
            {stepNumber > 0 && (
              <span
                className="inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold"
                style={{ backgroundColor: step.accent }}
              >
                {stepNumber}
              </span>
            )}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={isDefault ? onStartWorkflow : undefined}
                className={`flex items-center justify-center ${isDefault ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
                disabled={!isDefault}
              >
                <step.icon
                  size={18}
                  style={{ color: step.accent }}
                  strokeWidth={2}
                />
              </button>
              <h2
                className="text-lg font-semibold"
                style={{ color: stepNumber === 0 ? '#475569' : '#1e293b' }}
              >
                {step.title}
              </h2>
              {!isDefault && (
                <button
                  type="button"
                  onClick={onContinue}
                  className="flex items-center justify-center cursor-pointer hover:scale-110 transition-transform ml-1"
                  title={hasNextStep ? "Continue to next step" : "Return to start"}
                >
                  <ArrowRightCircleIcon
                    size={18}
                    style={{ color: step.accent }}
                    strokeWidth={2}
                  />
                </button>
              )}
            </div>
          </div>
          <div className="text-sm text-slate-500 max-w-[600px]">{step.description}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}