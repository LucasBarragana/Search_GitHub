'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGitHubStore } from '../store/githubStore';
import { fetchRepositories, fetchUser } from '../api/github';
import GitHubIconExplorer from '../utils/icons/githubicon';

export default function ExplorerPage() {
  const [username, setUsername] = useState('lodash');
  const { setRepositories, setOwner } = useGitHubStore();
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username.trim()) return;
    const user = await fetchUser(username); // Busca as informações do usuário
    const repos = await fetchRepositories(username); // Busca os repositórios
    setOwner(user); // Armazena o usuário no Zustand
    setRepositories(repos); // Armazena os repositórios no Zustand
    router.push('/pages/profile'); // Redireciona para a página do perfil
  };
  

  return (
    <div className='relative bg-gray-900 min-h-[92vh] flex flex-col items-center justify-center text-white px-4'>
      <div className='hidden md:block absolute inset-0 opacity-10'>
        <GitHubIconExplorer />
      </div>
      <div className='relative flex flex-col items-center justify-center text-white px-4'>
        <h1 className='text-6xl font-bold mb-4 text-center'>GitHub Explorer</h1>
        <p className='text-lg text-gray-400 mb-6 text-center max-w-md'>
          Descubra repositórios no GitHub de qualquer usuário. Digite o nome de usuário e veja os projetos!
        </p>
        <form onSubmit={handleSearch} className='flex flex-col sm:flex-row gap-4 w-full max-w-md'>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Digite o usuário do GitHub'
            className='flex-1 border p-3 rounded-md text-black focus:outline-none'
          />
          <button type='submit' className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition'>
            Buscar
          </button>
        </form>
        <footer className='mt-10 text-gray-500 text-sm text-center'>
          Projeto desenvolvido como teste para a empresa - Lucas Barragana
        </footer>
      </div>
    </div>
  );
}
