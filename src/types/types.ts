export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  bannerImage?: string; // Ảnh lớn cho trang chi tiết
  liveUrl: string;
  githubUrl: string;
  detailsUrl?: string; // URL dẫn đến trang chi tiết dự án (/project/[id])
  technologies?: { name: string; icon?: string }[];
  features?: string[];
  screenshots?: { url: string; caption?: string }[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  imageUrl: string;
  verificationUrl?: string;
}

export interface TechStack {
  id: string;
  name: string;
  iconUrl: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'other';
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  color:string;
}
// Thêm kiểu RawTechStack để xử lý dữ liệu JSON thô
export interface RawTechStack {
  id: string;
  name: string;
  iconUrl: string;
  color: string;
  category: string; // String thường từ JSON
  proficiency: string; // String thường từ JSON
}