import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { useState } from 'react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        // Step 1: Info Dasar
        title: '',
        category: '',
        description: '',
        job_type: 'Full-time',
        workplace_type: 'Onsite',
        vacancy: 1,
        location: '',
        salary_min: '',
        salary_max: '',

        // Step 2: Kriteria
        gender: 'Any',
        min_experience: 0,
        min_education: 'SMA/SMK',
        min_age: '',
        max_age: '',
        skills: '',

        // Step 3: Quiz
        has_screening_question: false,

        is_active: true,
    });

    const [step, setStep] = useState(1);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.jobs.store'));
    };

    const renderStepIndicator = () => (
        <div className="flex justify-center mb-8">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step === i ? 'bg-indigo-600 text-white' : step > i ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                        {step > i ? '✓' : i}
                    </div>
                    {i < 4 && <div className={`w-12 h-1 ${step > i ? 'bg-green-500' : 'bg-gray-200'}`}></div>}
                </div>
            ))}
        </div>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create New Job</h2>}
        >
            <Head title="Create Job" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {renderStepIndicator()}

                        <form onSubmit={submit}>
                            {/* STEP 1: INFO DASAR */}
                            {step === 1 && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Langkah 1: Informasi Dasar</h3>

                                    <div>
                                        <label className="block font-medium text-sm text-gray-700">Judul Lowongan</label>
                                        <input
                                            type="text"
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                                            value={data.title}
                                            onChange={e => setData('title', e.target.value)}
                                            required
                                        />
                                        {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block font-medium text-sm text-gray-700">Kategori</label>
                                            <input
                                                type="text"
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                                                placeholder="e.g. IT, Finance, HR"
                                                value={data.category}
                                                onChange={e => setData('category', e.target.value)}
                                                required
                                            />
                                            {errors.category && <div className="text-red-500 text-sm mt-1">{errors.category}</div>}
                                        </div>
                                        <div>
                                            <label className="block font-medium text-sm text-gray-700">Jumlah Lowongan</label>
                                            <input
                                                type="number"
                                                min="1"
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                                                value={data.vacancy}
                                                onChange={e => setData('vacancy', e.target.value)}
                                                required
                                            />
                                            {errors.vacancy && <div className="text-red-500 text-sm mt-1">{errors.vacancy}</div>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block font-medium text-sm text-gray-700">Jenis Pekerjaan</label>
                                            <select
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                                                value={data.job_type}
                                                onChange={e => setData('job_type', e.target.value)}
                                            >
                                                <option value="Full-time">Full-time</option>
                                                <option value="Contract">Contract</option>
                                                <option value="Part-time">Part-time</option>
                                                <option value="Internship">Internship</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block font-medium text-sm text-gray-700">Tipe Tempat Kerja</label>
                                            <select
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                                                value={data.workplace_type}
                                                onChange={e => setData('workplace_type', e.target.value)}
                                            >
                                                <option value="Onsite">Onsite</option>
                                                <option value="Hybrid">Hybrid</option>
                                                <option value="Remote">Remote</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block font-medium text-sm text-gray-700">Area Penempatan (Alamat)</label>
                                        <textarea
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                                            rows="3"
                                            value={data.location}
                                            onChange={e => setData('location', e.target.value)}
                                            required
                                        ></textarea>
                                        {errors.location && <div className="text-red-500 text-sm mt-1">{errors.location}</div>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block font-medium text-sm text-gray-700">Gaji Min (Opsional)</label>
                                            <input
                                                type="number"
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                                                value={data.salary_min}
                                                onChange={e => setData('salary_min', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-medium text-sm text-gray-700">Gaji Max (Opsional)</label>
                                            <input
                                                type="number"
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                                                value={data.salary_max}
                                                onChange={e => setData('salary_max', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block font-medium text-sm text-gray-700">Deskripsi Pekerjaan</label>
                                        <textarea
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                                            rows="6"
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            required
                                        ></textarea>
                                        {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: KRITERIA KANDIDAT */}
                            {step === 2 && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Langkah 2: Kriteria Kandidat</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block font-medium text-sm text-gray-700">Jenis Kelamin</label>
                                            <select
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                                                value={data.gender}
                                                onChange={e => setData('gender', e.target.value)}
                                            >
                                                <option value="Any">Laki-laki / Perempuan</option>
                                                <option value="Male">Laki-laki</option>
                                                <option value="Female">Perempuan</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block font-medium text-sm text-gray-700">Minimal Pengalaman (Tahun)</label>
                                            <input
                                                type="number"
                                                min="0"
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                                                value={data.min_experience}
                                                onChange={e => setData('min_experience', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block font-medium text-sm text-gray-700">Minimal Pendidikan</label>
                                            <select
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                                                value={data.min_education}
                                                onChange={e => setData('min_education', e.target.value)}
                                            >
                                                <option value="SMA/SMK">SMA/SMK</option>
                                                <option value="D3">D3</option>
                                                <option value="S1">S1</option>
                                                <option value="S2">S2</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block font-medium text-sm text-gray-700">Usia Min (Opsional)</label>
                                            <input
                                                type="number"
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                                                value={data.min_age}
                                                onChange={e => setData('min_age', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-medium text-sm text-gray-700">Usia Max (Opsional)</label>
                                            <input
                                                type="number"
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                                                value={data.max_age}
                                                onChange={e => setData('max_age', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block font-medium text-sm text-gray-700">Keahlian (Pisahkan dengan koma)</label>
                                        <input
                                            type="text"
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                                            placeholder="e.g. PHP, Laravel, React, Communication"
                                            value={data.skills}
                                            onChange={e => setData('skills', e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-medium text-sm text-gray-700">Dokumen Pendukung</label>
                                        <p className="text-sm text-gray-500 mt-1">CV (Wajib). Dokumen lain bersifat opsional dan dapat diatur nanti.</p>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: QUIZ */}
                            {step === 3 && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Langkah 3: Quiz / Pertanyaan Screening</h3>

                                    <div className="bg-gray-50 p-4 rounded-lg border">
                                        <div className="flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input
                                                    id="screening"
                                                    type="checkbox"
                                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                    checked={data.has_screening_question}
                                                    onChange={e => setData('has_screening_question', e.target.checked)}
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="screening" className="font-medium text-gray-700">Tanyakan Ketersediaan</label>
                                                <p className="text-gray-500">Kandidat akan ditanya: "Apakah Anda bersedia segera bekerja jika terpilih?" (Ya/Tidak)</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 4: PREVIEW */}
                            {step === 4 && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Langkah 4: Preview Lowongan</h3>

                                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                        <h1 className="text-2xl font-bold text-gray-900">{data.title}</h1>
                                        <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-600">
                                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{data.category}</span>
                                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">{data.job_type}</span>
                                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">{data.workplace_type}</span>
                                            <span>{data.location}</span>
                                        </div>

                                        <div className="mt-6">
                                            <h4 className="font-semibold text-gray-900">Deskripsi Pekerjaan</h4>
                                            <p className="whitespace-pre-wrap mt-2 text-gray-700">{data.description}</p>
                                        </div>

                                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Kualifikasi</h4>
                                                <ul className="list-disc list-inside mt-2 text-gray-700 text-sm">
                                                    <li>Gender: {data.gender}</li>
                                                    <li>Pendidikan Min: {data.min_education}</li>
                                                    <li>Pengalaman: {data.min_experience} Tahun</li>
                                                    {(data.min_age || data.max_age) && <li>Usia: {data.min_age || '?'} - {data.max_age || '?'} Tahun</li>}
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Skill / Keahlian</h4>
                                                <p className="mt-2 text-gray-700 text-sm">{data.skills || '-'}</p>
                                            </div>
                                        </div>

                                        {data.salary_min && (
                                            <div className="mt-6">
                                                <h4 className="font-semibold text-gray-900">Penawaran Gaji</h4>
                                                <p className="text-gray-700 text-sm">Rp {parseInt(data.salary_min).toLocaleString()} - Rp {parseInt(data.salary_max || data.salary_min).toLocaleString()}</p>
                                            </div>
                                        )}

                                        {data.has_screening_question && (
                                            <div className="mt-6 bg-yellow-50 p-3 rounded text-sm text-yellow-800">
                                                * Termasuk pertanyaan screening ketersediaan kerja.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="mt-8 flex justify-between">
                                {step > 1 ? (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    >
                                        Kembali
                                    </button>
                                ) : (
                                    <Link
                                        href={route('admin.jobs.index')}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    >
                                        Batal
                                    </Link>
                                )}

                                {step < 4 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                    >
                                        Lanjut
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                    >
                                        {processing ? 'Mempublikasikan...' : 'Publikasikan Lowongan'}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
