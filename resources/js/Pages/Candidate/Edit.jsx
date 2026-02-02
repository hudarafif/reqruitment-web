import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ auth, profile }) {
    // Inisialisasi form dengan data lama (jika ada) atau kosong
    const { data, setData, post, processing, errors } = useForm({
        nik: profile?.nik || '',
        full_name: profile?.full_name || auth.user.name,
        phone: profile?.phone || '',
        address: profile?.address || '',
        birth_date: profile?.birth_date || '',
        cv: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('biodata.update'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Lengkapi Biodata</h2>}
        >
            <Head title="Biodata Kandidat" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        
                        <form onSubmit={submit} className="space-y-6 max-w-xl">
                            {/* NIK */}
                            <div>
                                <label className="block font-medium text-sm text-gray-700">NIK (Nomor Induk Kependudukan)</label>
                                <input
                                    type="text"
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                    value={data.nik}
                                    onChange={(e) => setData('nik', e.target.value)}
                                />
                                {errors.nik && <div className="text-red-500 text-sm mt-1">{errors.nik}</div>}
                            </div>

                            {/* Nama Lengkap */}
                            <div>
                                <label className="block font-medium text-sm text-gray-700">Nama Lengkap</label>
                                <input
                                    type="text"
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                    value={data.full_name}
                                    onChange={(e) => setData('full_name', e.target.value)}
                                />
                                {errors.full_name && <div className="text-red-500 text-sm mt-1">{errors.full_name}</div>}
                            </div>

                            {/* No HP */}
                            <div>
                                <label className="block font-medium text-sm text-gray-700">No. WhatsApp / HP</label>
                                <input
                                    type="text"
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                />
                                {errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
                            </div>

                            {/* Tanggal Lahir */}
                            <div>
                                <label className="block font-medium text-sm text-gray-700">Tanggal Lahir</label>
                                <input
                                    type="date"
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                    value={data.birth_date}
                                    onChange={(e) => setData('birth_date', e.target.value)}
                                />
                                {errors.birth_date && <div className="text-red-500 text-sm mt-1">{errors.birth_date}</div>}
                            </div>

                            {/* Alamat */}
                            <div>
                                <label className="block font-medium text-sm text-gray-700">Alamat Domisili</label>
                                <textarea
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                />
                                {errors.address && <div className="text-red-500 text-sm mt-1">{errors.address}</div>}
                            </div>

                            {/* Upload CV */}
                            <div>
                                <label className="block font-medium text-sm text-gray-700">Upload CV (PDF)</label>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                    onChange={(e) => setData('cv', e.target.files[0])}
                                />
                                {errors.cv && <div className="text-red-500 text-sm mt-1">{errors.cv}</div>}
                                {profile?.cv_path && <p className="text-green-600 text-sm mt-1">✓ CV sudah diupload sebelumnya.</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Biodata'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}