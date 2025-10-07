export type Application = {
  id: string,
  job: Job,
  jobseeker: Jobseeker,
  appliedOn: string,
  status: string,
  jobTitle: string,
  employerName: string
};

export type BaseUser = {
  id: string,
  role: "Jobseeker" | "Employer",
  userName: string,
  phoneNumber: string,
  email: string,
  country: Country,
  city: string,
  bio: string,
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

export enum Degree {
  Bachelors,
  Masters,
  Doctors
};

export type Employer = BaseUser & {
  role: "Employer",
  name: string
  staffCount: StaffCount,
  jobs: Job[]
};

export type Job = {
  id: string,
  employerId: string,
  countryId: number,
  title: string,
  description: string,
  employerName: string,
  type: JobType,
  salary: number,
  currencySymbol: string,
  city: string,
  countryName: string,
  requiredDegree: Degree,
  applicantsNo: number,
  skills: Skill[]
};

export type Jobseeker = BaseUser & {
  role: "Jobseeker",
  firstName: string,
  lastName: string,
  age: number,
  skills: Skill[],
  courses: Course[],
  applications: Application[]
};

export enum JobType {
  OnSite,
  Hybrid,
  Remote
};

export type Skill = {
  id: number,
  title: string
};

export enum StaffCount {
  LessThan50 = "LessThan50",
  Between50And100 = "Between50And100",
  Between100And500 = "Between100And500",
  MoreThan500 = "MoreThan500"
}

export type University = {
  id: string,
  name: string,
  city: string,
  country: Country
};

export type User = Jobseeker | Employer;
