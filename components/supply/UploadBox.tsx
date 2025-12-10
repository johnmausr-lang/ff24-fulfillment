"use client";

interface UploadBoxProps {
  image: string | null;                // preview URL или null
  onFile: (file: File | null) => void; // callback при выборе файла
}

export default function UploadBox({ image, onFile }: UploadBoxProps) {
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    onFile(file);
  }

  return (
    <div className="space-y-3">
      <label className="text-sm opacity-70">Фото товара</label>

      <div className="border border-white/10 rounded-xl p-4 bg-white/5 flex flex-col items-center justify-center text-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="text-sm"
        />

        {image && (
          <img
            src={image}
            alt="preview"
            className="w-32 h-32 object-cover rounded-lg border border-white/10 mt-4"
          />
        )}
      </div>
    </div>
  );
}
