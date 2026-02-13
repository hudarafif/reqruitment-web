import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ auth, profile }) {
    // Inisialisasi form dengan data lama (jika ada) atau kosong
    const { data, setData, post, processing, errors } = useForm({
        nik: profile?.nik || '',
        full_name: profile?.full_name || auth.user.name,
        phone: profile?.phone || '',
        birth_place: profile?.birth_place || '',
        birth_date: profile?.birth_date || '',
        gender: profile?.gender || '',
        religion: profile?.religion || '',
        address: profile?.address || '',
        ktp_address: profile?.ktp_address || '',
        height: profile?.height || '',
        weight: profile?.weight || '',
        last_education: profile?.last_education || '',
        school_name: profile?.school_name || '',
        major: profile?.major || '',
        gpa: profile?.gpa || '',
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

                        <form onSubmit={submit} className="space-y-6 max-w-4xl">
                            {/* Personal Info Section */}
                            <div className="border-b pb-4 mb-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Pribadi</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                                    <div>
                                        <label className="block font-medium text-sm text-gray-700">Tempat Lahir</label>
                                        <input
                                            type="text"
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                            value={data.birth_place}
                                            onChange={(e) => setData('birth_place', e.target.value)}
                                        />
                                        {errors.birth_place && <div className="text-red-500 text-sm mt-1">{errors.birth_place}</div>}
                                    </div>

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

                                    <div>
                                        <label className="block font-medium text-sm text-gray-700">Jenis Kelamin</label>
                                        <select
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                            value={data.gender}
                                            onChange={(e) => setData('gender', e.target.value)}
                                        >
                                            <option value="">Pilih Jenis Kelamin</option>
                                            <option value="Male">Laki-laki</option>
                                            <option value="Female">Perempuan</option>
                                        </select>
                                        {errors.gender && <div className="text-red-500 text-sm mt-1">{errors.gender}</div>}
                                    </div>

                                    <div>
                                        <label className="block font-medium text-sm text-gray-700">Agama</label>
                                        <select
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                            value={data.religion}
                                            onChange={(e) => setData('religion', e.target.value)}
                                        >
                                            <option value="">Pilih Agama</option>
                                            <option value="Islam">Islam</option>
                                            <option value="Kristen">Kristen</option>
                                            <option value="Katolik">Katolik</option>
                                            <option value="Hindu">Hindu</option>
                                            <option value="Buddha">Buddha</option>
                                            <option value="Khonghucu">Khonghucu</option>
                                            <option value="Lainnya">Lainnya</option>
                                        </select>
                                        {errors.religion && <div className="text-red-500 text-sm mt-1">{errors.religion}</div>}
                                    </div>

                                    <div>
                                        <label className="block font-medium text-sm text-gray-700">Tinggi Badan (cm)</label>
                                        <input
                                            type="number"
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                            value={data.height}
                                            onChange={(e) => setData('height', e.target.value)}
                                        />
                                        {errors.height && <div className="text-red-500 text-sm mt-1">{errors.height}</div>}
                                    </div>

                                    <div>
                                        <label className="block font-medium text-sm text-gray-700">Berat Badan (kg)</label>
                                        <input
                                            type="number"
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                            value={data.weight}
                                            onChange={(e) => setData('weight', e.target.value)}
                                        />
                                        {errors.weight && <div className="text-red-500 text-sm mt-1">{errors.weight}</div>}
                                    </div>

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
                                </div>
                            </div>

                            {/* Address Section */}
                            <div className="border-b pb-4 mb-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Alamat</h3>
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label className="block font-medium text-sm text-gray-700">Alamat KTP</label>
                                        <textarea
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                            rows="3"
                                            value={data.ktp_address}
                                            onChange={(e) => setData('ktp_address', e.target.value)}
                                        />
                                        {errors.ktp_address && <div className="text-red-500 text-sm mt-1">{errors.ktp_address}</div>}
                                    </div>

                                    <div>
                                        <label className="block font-medium text-sm text-gray-700">Alamat Domisili</label>
                                        <textarea
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                            rows="3"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                        />
                                        {errors.address && <div className="text-red-500 text-sm mt-1">{errors.address}</div>}
                                    </div>
                                </div>
                            </div>

                            {/* Education Section */}
                            <div className="border-b pb-4 mb-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Pendidikan Terakhir</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block font-medium text-sm text-gray-700">Jenjang Pendidikan</label>
                                        <select
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                            value={data.last_education}
                                            onChange={(e) => setData('last_education', e.target.value)}
                                        >
                                            <option value="">Pilih Jenjang</option>
                                            <option value="SMA/SMK">SMA/SMK</option>
                                            <option value="D3">D3</option>
                                            <option value="S1">S1</option>
                                            <option value="S2">S2</option>
                                            <option value="S3">S3</option>
                                        </select>
                                        {errors.last_education && <div className="text-red-500 text-sm mt-1">{errors.last_education}</div>}
                                    </div>

                                    <div>
                                        <label className="block font-medium text-sm text-gray-700">Nama Sekolah / Perguruan Tinggi</label>
                                        <input
                                            type="text"
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                            value={data.school_name}
                                            onChange={(e) => setData('school_name', e.target.value)}
                                        />
                                        {errors.school_name && <div className="text-red-500 text-sm mt-1">{errors.school_name}</div>}
                                    </div>

                                    <div>
                                        <label className="block font-medium text-sm text-gray-700">Jurusan</label>
                                        <input
                                            type="text"
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                            value={data.major}
                                            onChange={(e) => setData('major', e.target.value)}
                                        />
                                        {errors.major && <div className="text-red-500 text-sm mt-1">{errors.major}</div>}
                                    </div>

                                    <div>
                                        <label className="block font-medium text-sm text-gray-700">Nilai Rata-rata / IPK</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                            value={data.gpa}
                                            onChange={(e) => setData('gpa', e.target.value)}
                                        />
                                        {errors.gpa && <div className="text-red-500 text-sm mt-1">{errors.gpa}</div>}
                                    </div>
                                </div>
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