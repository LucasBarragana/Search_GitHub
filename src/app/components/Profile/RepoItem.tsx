'use client'

import Link from "next/link";
import { FaCodeBranch, FaStar } from "react-icons/fa";
import { Repository } from '@/app/store/githubStore'; // Certifique-se de importar o tipo corretamente.

type RepoItemProps = {
  repo: Repository;
  setSelectedRepo: (repo: Repository) => void;
};

export default function RepoItem({ repo, setSelectedRepo }: RepoItemProps) {
  return (
    <div className="p-4 text-blue-800 bg-white hover:bg-gray-50">
      <Link href={`/pages/repository/${repo.name}`} className="text-blue-500" onClick={() => setSelectedRepo(repo)}>
        <p className="text-xl font-semibold">{repo.name}</p>
        <p className="text-gray-500 mb-4 text-sm">{repo.description || 'Sem descrição disponível.'}</p>
        <div className="flex gap-4 items-center">
          <span className="flex items-center text-gray-800 gap-1">
            <FaCodeBranch className="text-sm" />
            {repo.forks_count}
          </span>
          <span className="flex items-center text-gray-800 gap-1">
            <FaStar className="text-sm" />
            {repo.stargazers_count}
          </span>
        </div>
      </Link>
    </div>
  );
}
