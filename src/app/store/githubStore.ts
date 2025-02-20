import { create } from 'zustand';

type Owner = {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  company: string;
  location: string;
  blog: string;
  instagram_username: string;
};


type PullRequest = {
  id: number;
  title: string;
  user: {
    login: string;
  };
  created_at: string;
  updated_at: string;
  url: string;
  html_url: string;
};


type Issue = {
  id: number;
  title: string;
  user: {
    login: string;
  };
  created_at: string;
  updated_at: string;
  url: string;
  html_url: string
};

export type Repository = {
  id: number;
  name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  language: string;
  created_at: string;
  fork: boolean;
  archived: boolean;
  mirror_url: string;
  open_issues_count: number;
  forks: Repository[];
  pulls: PullRequest[];
  issues: Issue[];
  full_name: string;
};

type GitHubStore = {
  username: string;
  owner: Owner | null;
  repositories: Repository[];
  starredRepositories: Repository[];
  selectedRepo: Repository | null;
  selectedType: string[];
  setUsername: (username: string) => void;
  setOwner: (owner: Owner | null) => void;
  setRepositories: (repos: Repository[]) => void;
  setStarredRepositories: (repos: Repository[]) => void;
  setSelectedRepo: (repo: Repository | null) => void;
  setSelectedType: (types: string[] | ((prev: string[]) => string[])) => void;
};

export const useGitHubStore = create<GitHubStore>((set) => ({
  username: '',
  owner: null,
  repositories: [],
  starredRepositories: [],
  selectedRepo: null,
  selectedType: [],
  setUsername: (username: string) => set(() => ({ username })),
  setOwner: (owner: Owner | null) => set(() => ({ owner })),
  setRepositories: (repos: Repository[]) => set(() => ({ repositories: repos })),
  setStarredRepositories: (repos: Repository[]) => set(() => ({ starredRepositories: repos })),
  setSelectedRepo: (repo: Repository | null) => set(() => ({ selectedRepo: repo })),
  setSelectedType: (type) =>
    set((state) => ({
      selectedType: typeof type === 'function' ? type(state.selectedType) : type,
    })),
}));
