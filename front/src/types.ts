export interface Skill {
  id: number,
  title: string
}

export interface Country {
  id: number,
  countryCode: string,
  name: string,
  phoneCode: string,
  currencyCode: string,
  currencySymbol: string
}

export interface Course {
  id: number,
  name: string,
  degree: string,
  university: University,
  startDate: Date,
  endDate: Date,
  jobseekers: User[]
}

export interface Application {
  id: string,
  job: Job,
  jobseeker: User,
  appliedOn: Date,
  status: string
}

export interface User {
  id: number,
  name?: string,
  firstName?: string,
  lastName?: string,
  age?: number,
  email: string,
  phoneNumber?: string,
  city: string,
  country: Country,
  bio?: string,
  staffCount?: string,
  jobs?: Job[],
  skills?: Skill[],
  courses?: Course[],
  applications?: Application[]
}

export interface University {
  id: string,
  name: string,
  city: string,
  country: Country
}

export interface Job {
  id: string,
  title: string,
  description: string,
  type: string,
  employerName: string,
  salary: number,
  city: string,
  country: Country,
  requiredDegree: string,
  applicantsNo: number,
  skills: Skill[]
}