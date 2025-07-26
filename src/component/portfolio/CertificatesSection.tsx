import React from 'react';
import { useCertificates } from '@/hooks/useProjects';
import CertificateCard from './CertificateCard';
import { motion } from 'framer-motion';

const CertificatesSection: React.FC = () => {
  const { certificates, isLoading, error } = useCertificates();

  if (isLoading) return <div className="text-center py-12 text-gray-400">Loading certificates...</div>;
  if (error) return <div className="text-center py-12 text-red-400">Error loading certificates: {error.message}</div>;

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {certificates.map((certificate, index) => (
        <motion.div
          key={certificate.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1,
            ease: "easeOut" 
          }}
        >
          <CertificateCard certificate={certificate} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CertificatesSection;