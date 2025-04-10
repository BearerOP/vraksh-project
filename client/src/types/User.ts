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
  active: boolean;
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
  imageUrl: string;

  //Template Fields
  templateId: string;
  backgroundImageUrl: string;
  titleColor: string;
  descriptionColor: string;
  linkTextColor: string;
  linkBorderSize: string;
  linkBackgroundColor: string;
  titleFont: string;
  descriptionFont: string;
  buttonTextFont: string;
  avatarRounded: string;
};
