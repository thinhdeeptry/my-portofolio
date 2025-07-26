import { useEffect, useState } from 'react';
import { Project, Certificate, TechStack } from '@/types/types';

// Projects hook
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        // Option 1: Fetch from local data
        const data = await import('@/data/projects.json');
        setProjects(data.default);

        // Option 2: Fetch from API
        // const response = await fetch('/api/projects');
        // const data = await response.json();
        // setProjects(data);

        setIsLoading(false);
        console.log("data.default: ", data.default)
        console.log("projects ", projects)

      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load projects'));
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);
  useEffect(() => {
    console.log("projects updated:", projects);
  }, [projects]);

  return { projects, isLoading, error };
}

// Certificates hook
export function useCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCertificates() {
      try {
        // Option 1: Fetch from local data
        const data = await import('@/data/certificates.json');
        setCertificates(data.default);

        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load certificates'));
        setIsLoading(false);
      }
    }

    fetchCertificates();
  }, []);

  return { certificates, isLoading, error };
}

// Tech stack hook
export function useTechStack() {
  const [techStack, setTechStack] = useState<TechStack[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchTechStack() {
      try {
        // Option 1: Fetch from local data
        const data = await import('@/data/techstack.json');
        setTechStack(
          data.default.map((item: any) => ({
            ...item,
            category: item.category as TechStack['category'],
          }))
        );

        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load tech stack'));
        setIsLoading(false);
      }
    }

    fetchTechStack();
  }, []);

  return { techStack, isLoading, error };
}