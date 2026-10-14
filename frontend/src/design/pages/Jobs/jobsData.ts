import type { JobPosting } from "../Home/homeData";

export type JobStatus = "상시채용" | "모집중" | "모집마감";
export type JobWithMeta = JobPosting & {
  status: JobStatus;
  registeredOrder: number;
  salaryVisible: boolean;
  image: string;
};


// 데모 공고는 제거했습니다. 실제 공고 API 연결 후 이 배열 대신 API 응답을 사용합니다.
export const jobsWithMeta: JobWithMeta[] = [];

export function getJobDetail(_job: JobWithMeta) {
  return {
    vessel: "정보 없음",
    experience: "정보 없음",
    employment: "정보 없음",
    schedule: "정보 없음",
    duties: [] as string[],
    requirements: [] as string[],
    recruitmentSteps: [] as string[],
    company: {
      description: "기업 상세 정보는 API 연동 후 표시됩니다.",
      introduction: "기업 소개는 API 연동 후 표시됩니다.",
      address: "정보 없음",
      website: "",
      phone: "",
      fax: "",
      manager: "",
      email: "",
    },
  };
}
