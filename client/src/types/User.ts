export type User = {
  _id: string;
  username: string;
  email: string;
  authProvider: string;
  providerId: string;
  imageUrl: string;
  description: string;
  authKey: string;
  createdAt: Date;
  updatedAt: Date;
  token: string;
};

export type SocialIcon = {
  name: string;
  icon: string;
  url: string;
};

export type BranchItem = {
  _id: string;
  branchId: string;
  title: string;
  index: number;
  url: string;
  style: string;
  status: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};


export type Branch = {
    _id: string;
    userId: string;
    name: string;
    description: string;
    socialIcons: SocialIcon[];
    items: BranchItem[];
    createdAt: Date;
    updatedAt: Date;
  };