export type Partner = {
  id: number; name: string; category: string; country: string; ports: string[]; services: string[];
  description: string; phone: string; fax: string; email: string; website: string; address: string;
  manager: string; views: number; badge?: "NEW" | "HOT"; joined: string; logoCode: string;
};


// 예시 업체 데이터는 제거했습니다. 실제 STORE_INFO API 응답을 사용해야 합니다.
export const partners: Partner[] = [];
