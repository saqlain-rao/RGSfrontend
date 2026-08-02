export interface Project {
  _id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  client: string;
  duration: string;
  technologies: string[];
  location: string;
  mainImage: string;
  gallery: string[];
  beforeAfter: {
    beforeImage: string;
    afterImage: string;
  };
  status: 'Completed' | 'Ongoing';
  featured: boolean;
  createdAt: string;
}

export interface Service {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  image: string;
  features: string[];
  isActive: boolean;
  order: number;
}

export interface Settings {
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  googleMapsUrl: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
  };
  heroContent: {
    heading: string;
    subheading: string;
    backgroundImage: string;
  };
  aboutPreview: {
    heading: string;
    text: string;
    image: string;
  };
  whyChooseUs: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  statistics: Array<{
    label: string;
    value: string;
    suffix: string;
  }>;
}

export interface Testimonial {
  _id: string;
  clientName: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  image: string;
  isActive: boolean;
}

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  order: number;
  isActive: boolean;
}
