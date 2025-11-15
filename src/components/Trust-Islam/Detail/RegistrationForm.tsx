// components/RegistrationForm.tsx
import React from 'react';
import { FaUser, FaPhone, FaEnvelope, FaUniversity } from 'react-icons/fa';
import { FormState, Errors } from '../types/form';

interface RegistrationFormProps {
  showForm: boolean;
  form: FormState;
  errors: Errors;
  loading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmitForm: (e: React.FormEvent) => void;
  setShowForm: (show: boolean) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  showForm,
  form,
  errors,
  loading,
  handleChange,
  onSubmitForm,
  setShowForm
}) => {
  if (!showForm) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <FaUser className="text-blue-600" />
            Form Pendaftaran
          </h3>
          <button 
            onClick={() => setShowForm(false)} 
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmitForm} className="space-y-6">
          {/* Nama dan Gender */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                Nama <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  placeholder="Nama lengkap" 
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? "border-red-400" : "border-gray-200"
                  }`} 
                />
              </div>
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Jenis Kelamin</label>
              <div className="flex gap-4 items-center">
                <label className="inline-flex items-center gap-2">
                  <input 
                    type="radio" 
                    name="gender" 
                    value="Laki-laki" 
                    checked={form.gender === "Laki-laki"} 
                    onChange={handleChange} 
                    className="text-blue-600"
                  />
                  <span>Laki-laki</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input 
                    type="radio" 
                    name="gender" 
                    value="Perempuan" 
                    checked={form.gender === "Perempuan"} 
                    onChange={handleChange} 
                    className="text-blue-600"
                  />
                  <span>Perempuan</span>
                </label>
              </div>
            </div>
          </div>

          {/* Alamat */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Alamat</label>
            <textarea 
              name="address" 
              value={form.address} 
              onChange={handleChange} 
              placeholder="Contoh: Jl. Merdeka No. 1, Karawang" 
              className="w-full border border-gray-200 rounded-xl px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              rows={3} 
            />
          </div>

          {/* Telepon dan Email */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                No HP <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-3 text-gray-400" />
                <input 
                  name="phone" 
                  value={form.phone} 
                  onChange={handleChange} 
                  placeholder="08xxxxxxxxxx" 
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.phone ? "border-red-400" : "border-gray-200"
                  }`} 
                />
              </div>
              {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input 
                  name="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  placeholder="nama@domain.com" 
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? "border-red-400" : "border-gray-200"
                  }`} 
                />
              </div>
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Mahasiswa */}
          <div className="flex flex-col gap-4">
            <label className="inline-flex items-center gap-3">
              <input 
                type="checkbox" 
                name="is_student" 
                checked={form.is_student} 
                onChange={handleChange} 
                className="rounded text-blue-600"
              />
              <span className="font-medium">Saya mahasiswa</span>
            </label>
            
            {form.is_student && (
              <div>
                <div className="relative">
                  <FaUniversity className="absolute left-3 top-3 text-gray-400" />
                  <input 
                    name="university" 
                    value={form.university} 
                    onChange={handleChange} 
                    placeholder="Nama Universitas" 
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
            )}
          </div>

          {/* Bawa Anak */}
          <div className="flex flex-col gap-4">
            <label className="inline-flex items-center gap-3">
              <input 
                type="checkbox" 
                name="with_child" 
                checked={form.with_child} 
                onChange={handleChange} 
                className="rounded text-blue-600"
              />
              <span className="font-medium">Membawa anak?</span>
            </label>
            
            {form.with_child && (
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Jumlah Anak</label>
                <input 
                  type="number" 
                  min={0} 
                  name="num_of_children" 
                  value={form.num_of_children} 
                  onChange={handleChange} 
                  className={`w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.num_of_children ? "border-red-400" : "border-gray-200"
                  }`} 
                />
                {errors.num_of_children && <p className="text-sm text-red-500 mt-1">{errors.num_of_children}</p>}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button 
              type="button" 
              onClick={() => setShowForm(false)} 
              className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 font-medium text-gray-700 transition-colors"
            >
              Batal
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className={`px-6 py-3 rounded-xl font-semibold text-white transition-all ${
                loading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
              }`}
            >
              {loading ? "Memproses..." : "Daftar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;