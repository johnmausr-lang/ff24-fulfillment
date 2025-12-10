"use client";

export default function UploadBox({ image, onFile }) {
  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    onFile(file, preview);
  }

  return (
    <div className="flex flex-col gap-3">
      <label className="text-white/70">Фото товара</label>

      <div
        className="
          w-full h-48 rounded-xl border border-white/10
          bg-white/5 backdrop-blur-xl flex items-center justify-center
          hover:bg-white/10 transition cursor-pointer
        "
        onClick={() => document.getElementById("fileInput").click()}
      >
        {image ? (
          <img
            src={image}
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          <span className="text-white/40">Нажмите для загрузки</span>
        )}
      </div>

      <input
        type="file"
        id="fileInput"
        className="hidden"
        accept="image/*"
        onChange={handleFile}
      />
    </div>
  );
}
