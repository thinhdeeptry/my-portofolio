import { useEffect, useState } from 'react';
import { Project, Certificate, TechStack, RawTechStack } from '@/types/types';

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
        setProjects(
          data.default.map((project: Project) => ({
            ...project,
            detailsUrl: project.detailsUrl ?? '', // Provide a default or computed value if missing
          }))
        );

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
        // Fetch from local data
        const data = await import('@/data/techstack.json');
        
        // Validate and convert each item
        const validTechStack = data.default.map((item: RawTechStack) => {
          // Validate category
          const validCategory = validateCategory(item.category);
          // Validate proficiency
          const validProficiency = validateProficiency(item.proficiency);
          
          return {
            ...item,
            category: validCategory,
            proficiency: validProficiency
          } as TechStack;
        });
        
        setTechStack(validTechStack);
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
// Helper functions to validate and convert types
function validateCategory(category: string): TechStack['category'] {
  const validCategories: TechStack['category'][] = ["frontend", "backend", "devops", "database", "other"];
  
  if (validCategories.includes(category as TechStack['category'])) {
    return category as TechStack['category'];
  }
  
  // Fallback to "other" if invalid
  console.warn(`Invalid category: ${category}. Using "other" instead.`);
  return "other";
}

function validateProficiency(proficiency: string): TechStack['proficiency'] {
  const validProficiencies: TechStack['proficiency'][] = ["beginner", "intermediate", "advanced", "expert"];
  
  if (validProficiencies.includes(proficiency as TechStack['proficiency'])) {
    return proficiency as TechStack['proficiency'];
  }
  
  // Fallback to "intermediate" if invalid
  console.warn(`Invalid proficiency: ${proficiency}. Using "intermediate" instead.`);
  return "intermediate";
}