export type CommunityPost = {
  id: number;
  category: string;
  title: string;
  content: string[];
  author: string;
  date: string;
  views: number;
  comments: number;
  likes: number;
  dislikes: number;
  hot?: boolean;
};


// 데모 게시글은 제거했습니다. 실제 COMMUNITY API 응답을 사용해야 합니다.
export const communityPosts: CommunityPost[] = [];
