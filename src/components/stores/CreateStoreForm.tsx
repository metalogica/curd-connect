import { useState, type FormEvent } from "react";

export type CreateStoreFormValues = {
  name: string;
  address: string;
  neighbourhood: string;
  description: string;
  galleryInput: string;
};

export function CreateStoreForm({
  onSubmit,
  isSubmitting,
  error,
}: {
  onSubmit: (values: CreateStoreFormValues) => void | Promise<void>;
  isSubmitting: boolean;
  error: string | null;
}) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [neighbourhood, setNeighbourhood] = useState("");
  const [description, setDescription] = useState("");
  const [galleryInput, setGalleryInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void onSubmit({ name, address, neighbourhood, description, galleryInput });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="border-b-4 border-black pb-4 mb-8">
        <h1 className="font-sans text-6xl font-black uppercase text-black leading-none tracking-tighter">
          Add Un<br />Resto
        </h1>
        <p className="font-mono text-black font-bold mt-4 uppercase">
          Found a hidden gem? Drop it here.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border-4 border-black p-6 md:p-8 brutal-shadow space-y-6"
      >
        <Field id="name" label="Nom du resto" value={name} onChange={setName} required />
        <Field id="address" label="Adresse" value={address} onChange={setAddress} required />
        <Field
          id="neighbourhood"
          label="Quartier (Neighbourhood)"
          value={neighbourhood}
          onChange={setNeighbourhood}
          placeholder="ex: Hochelaga, Le Plateau..."
          required
        />

        <div>
          <label htmlFor="description" className="block font-black uppercase mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full border-4 border-black p-3 font-mono focus:outline-none focus:bg-curd focus:border-black transition-colors resize-y"
            placeholder="What makes their poutine special?"
            required
          />
        </div>

        <div>
          <label htmlFor="gallery" className="block font-black uppercase mb-1">
            Photos (URLs séparées par des virgules)
          </label>
          <input
            id="gallery"
            type="text"
            value={galleryInput}
            onChange={(e) => setGalleryInput(e.target.value)}
            placeholder="https://picsum.photos/seed/resto1/800/600, ..."
            className="w-full border-4 border-black p-3 font-mono text-sm focus:outline-none focus:bg-curd focus:border-black transition-colors"
          />
          <p className="text-xs mt-1 uppercase font-bold opacity-60">
            Paste image URLs separated by commas.
          </p>
        </div>

        {error && (
          <div className="border-4 border-black bg-red-200 p-3 font-mono text-sm font-bold uppercase">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4 bg-black text-white font-black uppercase py-4 border-4 border-black hover:bg-white hover:text-black transition-colors brutal-shadow active:shadow-none active:translate-x-1 active:translate-y-1 text-lg tracking-widest disabled:opacity-50"
        >
          {isSubmitting ? "Envoi..." : "Sauvegarder"}
        </button>
      </form>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-black uppercase mb-1">
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border-4 border-black p-3 font-mono focus:outline-none focus:bg-curd focus:border-black transition-colors"
        required={required}
      />
    </div>
  );
}
