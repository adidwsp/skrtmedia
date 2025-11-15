// components/DonationModal.tsx
import React from 'react';
import Image from 'next/image';

interface DonationModalProps {
  showDonationDialog: boolean;
  donationAmount: string;
  bank: string;
  loading: boolean;
  uploadingProof: boolean;
  handleDonationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setBank: (bank: string) => void;
  setShowDonationDialog: (show: boolean) => void;
  confirmDonationAndRegister: () => void;
  setDonationAmount: (amount: string) => void;
}

const DonationModal: React.FC<DonationModalProps> = ({
  showDonationDialog,
  donationAmount,
  bank,
  loading,
  uploadingProof,
  handleDonationChange,
  setBank,
  setShowDonationDialog,
  confirmDonationAndRegister,
  setDonationAmount
}) => {
  if (!showDonationDialog) return null;

  const quickAmounts = [10000, 25000, 50000, 100000, 250000, 500000];

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white flex-shrink-0">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Langkah Terakhir</h3>
              <p className="text-blue-100 text-sm mt-1">Tambahkan nominal infaq terbaik Anda</p>
            </div>
            <button 
              onClick={() => { setShowDonationDialog(false); }} 
              className="text-white hover:text-blue-200 transition-colors p-1 rounded-full hover:bg-white/10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Nominal Infaq */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-3">Nominal Infaq (Rp)</label>
            
            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => {
                    const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                    setDonationAmount(formatted);
                  }}
                  className="py-2 px-3 text-sm font-medium rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                >
                  {amount.toLocaleString('id-ID')}
                </button>
              ))}
            </div>

            {/* Input Nominal */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 font-semibold">Rp</span>
              </div>
              <input
                type="text"
                inputMode="numeric"
                value={donationAmount}
                onChange={handleDonationChange}
                placeholder="Masukkan nominal"
                className="block w-full border border-gray-300 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold placeholder-gray-400"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-400">IDR</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">Kosongkan jika tidak ingin berdonasi</p>
          </div>

          {/* Bank Transfer */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <label className="text-sm font-semibold text-gray-700 block mb-3">Pilih Bank Transfer</label>
            
            <select 
              value={bank} 
              onChange={(e) => setBank(e.target.value)} 
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option>Bank Jago</option>
            </select>

            {/* Bank Card */}
            <div className="mt-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-blue-200 text-sm font-medium">Nomor Rekening</div>
                  <div className="font-mono text-xl font-bold tracking-wider">5066 9354 7160</div>
                </div>
                <div className="bg-white/20 p-2 rounded-lg">
                  <div className="w-12 h-6 bg-white/50 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">JAGO</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-blue-200 text-sm">Atas Nama</span>
                  <span className="font-semibold">Adi Dwi Saputra</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-200 text-sm">Bank</span>
                  <span className="font-semibold">Bank Jago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Informasi Tambahan */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="bg-amber-100 p-2 rounded-full">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-amber-800 text-sm">Penting!</h4>
                <p className="text-amber-700 text-xs mt-1">
                  Pastikan transfer sesuai nominal yang Anda masukkan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-6 bg-white border-t border-gray-200">
          <div className="flex gap-3">
            <button 
              type="button" 
              onClick={() => { setShowDonationDialog(false); }}
              className="flex-1 px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors font-medium text-gray-700"
            >
              Kembali
            </button>
            <button 
              type="button" 
              disabled={loading || uploadingProof} 
              onClick={confirmDonationAndRegister}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                loading || uploadingProof 
                  ? "bg-gray-400 cursor-not-allowed text-white" 
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
              }`}
            >
              {loading || uploadingProof ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Memproses...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Daftar
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;