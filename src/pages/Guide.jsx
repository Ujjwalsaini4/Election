import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { stepsData } from '../data/electionData';
import Card from '../components/ui/Card';

const Guide = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-3xl mx-auto w-full"
    >
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Voter Guide</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">Follow these steps to ensure your voice is heard.</p>
      </div>

      <div className="space-y-6">
        {stepsData.map((step) => (
          <motion.div key={step.step} variants={itemVariants}>
            <Card hover className="p-6 md:p-8 flex items-start gap-6 relative overflow-hidden">
              {/* Large background number */}
              <div className="absolute -right-4 -top-6 text-[120px] font-black text-slate-100 dark:text-slate-800/50 select-none z-0">
                {step.step}
              </div>
              
              <div className="relative z-10 flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Step {step.step}: {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                  {step.details}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Guide;
