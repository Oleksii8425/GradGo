export type Application = {
  id: string,
  job: Job,
  jobseeker: Jobseeker,
  appliedOn: string,
  status: string
};

export type Country = {
  id: number,
  countryCode: string,
  name: string,
  phoneCode: string,
  currencyCode: string,
  currencySymbol: string
};

export type Course = {
  id: number,
  name: string,
  degree: string,
  university: University,
  startDate: Date,
  endDate: Date,
  jobseekers: Jobseeker[]
};

export type Employer = User & {
  name: string
  staffCount: StaffCount,
  jobs: Job[]
};

export type Job = {
  id: string,
  title: string,
  description: string,
  type: string,
  employer: Employer,
  salary: number,
  country: Country,
  city: string,
  requiredDegree: string,
  applicantsNo: Int16Array,
  skills: Skill[]
};

export type Jobseeker = User & {
  firstName: string,
  lastname: string,
  age: number,
  skills: Skill[],
  courses: Course[],
  applications: Application[]
};

export type Skill = {
  id: number,
  title: string
};

export enum StaffCount {
  LessThan50,
  Between50And100,
  Between100And500,
  MoreThan500
};

export type University = {
  id: string,
  name: string,
  city: string,
  country: Country
};

export type User = {
  id: string,
  role: string,
  userName: string,
  phoneNumber: string,
  email: string,
  country: Country,
  city: string,
  bio: string,
};
