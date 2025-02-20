'use client';

import { useState, useMemo } from 'react';
import { useGitHubStore } from '@/app/store/githubStore';
import { FaSearch, FaFolderOpen, FaRegStar } from "react-icons/fa";
import ProfileCard from '@/app/components/Profile/ProfileCard';
import ToggleButton from '@/app/components/Profile/ToggleButton';
import FilterDropdown from '@/app/components/Profile/Filters';
import RepoItem from '@/app/components/Profile/RepoItem';

export default function Profile() {
  const { repositories, setSelectedRepo, starredRepositories } = useGitHubStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string[]>(['All']);
  const [selectedLanguage, setSelectedLanguage] = useState<string[]>(['All']);
  const [view, setView] = useState<'repositories' | 'favorites'>('repositories');
  
  const uniqueLanguages = useMemo(() => {
    const languages = new Set(repositories.map((repo) => repo.language).filter(Boolean));
    return Array.from(languages);
  }, [repositories]);

  const filteredRepositories = useMemo(() => {
    return (view === 'repositories' ? repositories : starredRepositories).filter((repo) => {
      const isTypeValid = selectedType.includes('All') || selectedType.includes(repo.fork ? 'Forks' : repo.archived ? 'Archived' : repo.mirror_url ? 'Mirrors' : 'Sources');
      const isLanguageValid = selectedLanguage.includes('All') || selectedLanguage.includes(repo.language);
      return isTypeValid && isLanguageValid && (searchTerm ? repo.name.toLowerCase().includes(searchTerm.toLowerCase()) : true);
    });
  }, [repositories, starredRepositories, view, searchTerm, selectedType, selectedLanguage]);

  return (
    <div className="max-w-6xl mx-auto py-10 px-2">
      <div className='block md:flex'>
        <div className='w-full md:w-[30%] '>
          <ProfileCard />
        </div>            
        <div className="w-full md:w-[70%]">
          {/* Botões de Alternância */}
          <div className="flex gap-6 mb-6">
            <ToggleButton
              active={view === 'repositories'}
              onClick={() => setView('repositories')}
              icon={<FaFolderOpen />}
              label="Repositórios"
              count={repositories.length}
            />
            <ToggleButton
              active={view === 'favorites'}
              onClick={() => setView('favorites')}
              icon={<FaRegStar />}
              label="Favoritos"
              count={starredRepositories.length}
            />
          </div>

          {/* Filtros */}
          <div className="block space-y-4 md:flex justify-between gap-4 mb-6 px-2">
            {/* Campo de pesquisa */}
            <div className="relative border-b-2 border-gray-200 flex items-center">
              <FaSearch className="absolute left-3 text-gray-500" />
              <input
                type="text"
                placeholder="Search Here"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 pl-10 w-full outline-none bg-transparent"
              />
            </div>

            <div className="flex gap-4">
              {/* Filtro de Tipo */}
              <FilterDropdown
                selectedValues={selectedType}
                setSelectedValues={setSelectedType}
                options={["All", "Sources", "Forks", "Archived", "Mirrors"]}
                label="Type"
              />

              {/* Filtro por Linguagem */}
              <FilterDropdown
                selectedValues={selectedLanguage}
                setSelectedValues={setSelectedLanguage}
                options={["All", ...uniqueLanguages]}
                label="Language"
              />
            </div>
          </div>

          {/* Listagem Condicional */}
          <div className="space-y-4">
            {filteredRepositories.length > 0 ? (
              filteredRepositories.map((repo) => (
                <RepoItem key={repo.id} repo={repo} setSelectedRepo={setSelectedRepo} />
              ))
            ) : (
              <p className="text-center text-gray-500">Nenhum repositório encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
