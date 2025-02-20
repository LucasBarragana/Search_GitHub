'use client'

import { useState } from "react";
import Image from "next/image";
import { FaBuilding, FaMapMarkerAlt, FaLink, FaInstagram, FaChevronDown } from "react-icons/fa";
import { useGitHubStore } from "../../store/githubStore";
import Link from "next/link";

export default function ProfileCard() {
  const owner = useGitHubStore((state) => state.owner);
  const [showExtraInfo, setShowExtraInfo] = useState(false);

  if (!owner) return <p className="text-center">Carregando perfil...</p>;

  return (
    <div className="p-6 space-y-4 flex flex-col items-center">
      {/* Avatar, Nome e Bio - Centralizados */}
      <div className="flex flex-col items-center text-center">
        <Image
          src={owner.avatar_url}
          alt="userName"
          width={120}
          height={120}
          className="rounded-full border"
        />
        <h2 className="text-2xl font-bold mt-2">{owner.name}</h2>
        {owner.bio && <p className="text-gray-600 text-sm">{owner.bio}</p>}
      </div>

      {/* Botão para exibir informações extras em telas pequenas */}
      <button
        className="flex gap-2 text-center text-blue-500 md:hidden "
        onClick={() => setShowExtraInfo(!showExtraInfo)}
      >
        <p>{showExtraInfo ? "Ocultar Informações" : "Informações Adicionais"}</p>        
        <p><FaChevronDown /></p>
      </button>

      {/* Informações Extras - Alinhadas à Esquerda */}
      <div 
        className={`flex flex-col items-start text-left w-full max-w-xs ${showExtraInfo ? "block" : "hidden"} md:flex`}
      >
        {owner.company && (
          <p className="flex items-center gap-2 text-gray-700">
            <FaBuilding className="text-gray-500" /> {owner.company}
          </p>
        )}

        {owner.location && (
          <p className="flex items-center gap-2 text-gray-700">
            <FaMapMarkerAlt className="text-red-500" /> {owner.location}
          </p>
        )}

        {owner.blog && (
          <Link
            href={owner.blog.startsWith("http") ? owner.blog : `https://${owner.blog}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-500 hover:underline"
          >
            <FaLink /> {owner.blog}
          </Link>
        )}

        {owner.instagram_username && (
          <Link
            href={`https://instagram.com/${owner.instagram_username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-pink-500 hover:underline"
          >
            <FaInstagram /> @{owner.instagram_username}
          </Link>
        )}
      </div>
    </div>
  );
}
