import React from 'react';
import Image from 'next/image';
import { Certificate } from '@/types/types';

interface CertificateCardProps {
  certificate: Certificate;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate }) => {
  return (
    <div className="bg-gray-900/70 rounded-2xl overflow-hidden cursor-target hover:scale-[1.02] transition-transform duration-300">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={certificate.imageUrl}
          alt={certificate.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
};

export default CertificateCard;