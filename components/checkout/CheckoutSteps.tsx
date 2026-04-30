'use client';
import { motion } from 'framer-motion';

interface Step { id: number; label: string; }

interface Props {
  steps: Step[];
  currentStep: number;
}

export function CheckoutSteps({ steps, currentStep }: Props) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <motion.div
              animate={{
                backgroundColor: step.id <= currentStep ? '#171717' : '#e5e7eb',
                color:           step.id <= currentStep ? '#ffffff' : '#9ca3af',
              }}
              className="w-9 h-9 rounded-full flex items-center justify-center
                         text-sm font-bold"
            >
              {step.id < currentStep ? '✓' : step.id}
            </motion.div>
            <span className={`text-xs mt-1.5 font-medium
              ${step.id <= currentStep ? 'text-neutral-900' : 'text-neutral-400'}`}>
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <motion.div
              className="h-px flex-1 mb-5 mx-2"
              animate={{ backgroundColor: step.id < currentStep ? '#171717' : '#e5e7eb' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}