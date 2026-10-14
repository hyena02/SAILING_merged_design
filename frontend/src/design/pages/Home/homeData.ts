import type { IconName } from "../../components/common/Icon";

export interface JobPosting {
  id: number;
  company: string;
  title: string;
  role: string;
  location: string;
  pay: string;
  deadline: string;
  logoCode: string;
  urgent?: boolean;
}

export interface JobCategory {
  icon: IconName;
  name: string;
  count: number;
}

export interface CommunityPost {
  id: number;
  category: string;
  title: string;
  author: string;
  time: string;
  views: number;
  comments: number;
  hot?: boolean;
}


// 실제 DB/API 연결 전까지는 데모 데이터를 표시하지 않습니다.
// 페이지 디자인의 타입만 유지하며, 화면 데이터는 API에서 받아오도록 연결해야 합니다.
export const urgentJobs: JobPosting[] = [];
export const recentJobs: JobPosting[] = [];
export const categories: JobCategory[] = [];
export const communityPosts: CommunityPost[] = [];
export const popularKeywords: string[] = [];
export const regions: string[] = ["지역 전체"];
export const jobTypes: string[] = ["직무 전체"];
