import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { timelineData } from '../data/electionData';
import Card from '../components/ui/Card';

const Timeline = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto w-full"
    >
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Election Timeline</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">Key dates and milestones for the upcoming election.</p>
      </div>

      <div className="relative">
        {/* Vertical line connecting timeline items */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 transform md:-translate-x-1/2"></div>

        <div className="space-y-8 relative">
          {timelineData.map((item, index) => {
            const IconComponent = Icons[item.icon] || Icons.Circle;
            const isEven = index % 2 === 0;

            return (
              <motion.div key={item.id} variants={itemVariants} className={`flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Timeline Content */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'}`}>
                  <Card hover className="p-6">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-sm font-semibold rounded-full mb-3">
                      {item.date}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{item.description}</p>
                  </Card>
                </div>

                {/* Timeline Icon */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 mt-6 md:mt-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white shadow-lg border-4 border-white dark:border-slate-900 z-10">
                  <IconComponent className="w-4 h-4" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Timeline;
