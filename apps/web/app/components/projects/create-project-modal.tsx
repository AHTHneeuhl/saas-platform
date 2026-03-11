'use client';

export function CreateProjectModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="relative bg-white p-6 rounded-lg w-[400px]">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4">Create Project</h2>

        <input
          placeholder="Project name"
          className="w-full border p-2 rounded mb-3"
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded mb-4"
        />

        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Create
        </button>
      </div>
    </div>
  );
}
