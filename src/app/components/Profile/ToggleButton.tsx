'use client'

export default function ToggleButton({ active, onClick, icon, label, count }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, count: number }) {
    return (
      <button
        onClick={onClick}
        className={`py-2 px-4 rounded flex items-center gap-2 ${active ? 'underline underline-offset-8 decoration-[#FD8C73]' : 'text-gray-500'}`}
      >
        {icon}
        {label}
        <span className="text-sm bg-gray-100 border px-2 py-1 rounded-full">{count}</span>
      </button>
    );
}
