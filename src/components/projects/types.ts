export interface ProjectData {
  id: string;
  title: string;
  description: string;
  image: string;
  github?: string;
  demo?: string;
  desktopImageSrc?: string;
  desktopImageAlt?: string;
  mobileImageSrc?: string;
  mobileImageAlt?: string;
  requestAccess?: boolean;
  stack?: string[];
}
