'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useGitHubStore } from '../../../store/githubStore';
import Badge from '@/app/components/RepositoryList/Badge';
import ListSection from '@/app/components/RepositoryList/ListenSection';
import { useGitHub } from '@/app/hooks/useGitHub';  


export default function RepositoryDetails() {
  const params = useParams();
  const { name } = params as { name: string };  // Obtendo o nome do repositório
  const { selectedRepo } = useGitHubStore();

  const owner = selectedRepo?.owner?.login || '';

  // Passando o username (owner) e o repoName (name) para o hook
  const { repoError, starError, ownerError, pulls, issues, forks, pullError, issueError, forkError } = useGitHub(owner, name);

  if (repoError || starError || ownerError || pullError || issueError || forkError) {
    return <p className="text-center text-red-500">Erro ao carregar os dados.</p>;
  }

  if (!selectedRepo) {
    return <p className="text-center text-gray-600">Não encontramos nenhum usuário com este nome.</p>;
  }

  if (!selectedRepo) {
    return <p className="text-center text-gray-500">Carregando...</p>;
  }

  return (
    <div className='relative bg-gray-100 text-gray-800'>
      <div className="relative px-6 py-10 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">{selectedRepo?.name}</h1>
        
        <div className="flex flex-wrap justify-center gap-6 text-gray-700 ">
          <Badge imgSrc="/imgs/stars.png" count={selectedRepo.stargazers_count} label="Stars" section="#"/>
          <Badge imgSrc="/imgs/forks.png" count={selectedRepo.forks_count} label="Forks" section="#forks"/>
          <Badge imgSrc="/imgs/issues.png" count={selectedRepo.open_issues_count} label="Issues Abertas" section="#issues"/>
          <Badge imgSrc="/imgs/pullrequest.png" count={selectedRepo.pulls?.length || 0} label="Pull Requests" section="#pulls"/>
        </div>

        <div className="text-center mt-6">
          <Link href={selectedRepo.html_url} target="_blank" className="text-blue-500 font-semibold hover:underline">
            Ver no GitHub
          </Link>
        </div>

        <ListSection 
          id='pulls'
          title="Últimas Pull Requests" 
          items={pulls || []} 
          emptyMessage="No momento, não existe nenhuma pull request acessível ou realizada." 
        />

        <ListSection 
          id='issues'
          title="Issues Abertas" 
          items={issues || []} 
          emptyMessage="No momento, não existe nenhuma issue acessível ou aberta." 
        />

        <ListSection 
          id="forks"
          title="Forks" 
          items={(Array.isArray(forks) ? forks : []).map((fork) => ({
            id: fork.id,
            html_url: fork.html_url,
            title: fork.full_name || fork.owner?.login || "Fork sem nome"
          }))} 
          emptyMessage="No momento, não existe nenhum fork acessível." 
        />
      </div>
    </div>
  );
}
