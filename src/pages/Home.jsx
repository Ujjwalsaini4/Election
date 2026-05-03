import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Calendar, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const features = [
    {
      title: "Step-by-Step Guide",
      description: "Understand exactly what you need to do to register and cast your vote.",
      icon: CheckCircle2,
      link: "/guide",
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-900/20"
    },
    {
      title: "Interactive Timeline",
      description: "Keep track of important dates, from nominations to results day.",
      icon: Calendar,
      link: "/timeline",
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Smart Assistant",
      description: "Have questions? Chat with our interactive assistant for quick answers.",
      icon: MessageSquare,
      link: "/assistant",
      color: "text-violet-500",
      bg: "bg-violet-50 dark:bg-violet-900/20"
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center space-y-16"
    >
      {/* Hero Section */}
      <motion.section variants={itemVariants} className="text-center max-w-3xl mx-auto pt-10 md:pt-20">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
          Your Complete Guide to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Election Process</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
          Empowering you with clear, accessible, and interactive information. Know your rights, understand the timeline, and get ready to make your voice heard.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/guide" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8">
              Get Started <ArrowRight className="ml-2 w-5 h-5 inline" />
            </Button>
          </Link>
          <Link to="/assistant" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto text-lg px-8">
              Ask Assistant
            </Button>
          </Link>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section variants={itemVariants} className="w-full">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <Link key={idx} to={feature.link} className="block group focus-ring rounded-xl">
              <Card hover className="h-full p-6 sm:p-8 flex flex-col items-center text-center">
                <div className={`p-4 rounded-full ${feature.bg} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Home;
