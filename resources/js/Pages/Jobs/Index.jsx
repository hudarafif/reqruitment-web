import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';

export default function JobIndex({ auth, jobs, appliedJobIds }) {
    const Layout = auth.user ? AuthenticatedLayout : GuestLayout;

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter jobs based on search query
    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleApply = (jobId) => {
        if (!confirm('Apakah Anda yakin ingin melamar posisi ini?')) return;
        router.post(route('jobs.apply', jobId), {}, {
            onSuccess: () => closeModal(),
        });
    };

    const openModal = (job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedJob(null), 300); // Clear after animation
    };

    const isApplied = (jobId) => appliedJobIds.includes(jobId);

    return (
        <Layout
            header={auth.user ? <h2 className="font-semibold text-xl text-gray-800 leading-tight">Job Vacancies</h2> : null}
        >
            <Head title="Job Vacancies Development" />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
                        Temukan Karir Impianmu KING
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-indigo-100">
                        Bergabunglah dengan tim kami dan bangun masa depan yang cerah.
                    </p>
                    <div className="mt-8 max-w-xl mx-auto">
                        <div className="relative rounded-md shadow-sm">
                            <TextInput
                                type="text"
                                className="block w-full rounded-md border-transparent pl-4 pr-10 py-3 text-gray-900 placeholder-gray-500 focus:border-white focus:ring-white sm:text-sm"
                                placeholder="Cari posisi pekerjaan..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="px-4 flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Lowongan Tersedia
                            <span className="ml-2 text-sm font-normal text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                                {filteredJobs.length}
                            </span>
                        </h2>
                    </div>

                    {filteredJobs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-0">
                            {filteredJobs.map((job) => (
                                <div key={job.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
                                    <div className="p-6 flex-grow">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 leading-tight">{job.title}</h3>
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mt-2">
                                                    Full Time
                                                </span>
                                            </div>
                                            {/* Icon Placeholder */}
                                            <div className="bg-indigo-50 p-2 rounded-lg">
                                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="mt-4 text-gray-600 text-sm line-clamp-3">
                                            {job.description}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                                        <div className="grid grid-cols-2 gap-3">
                                            <SecondaryButton
                                                onClick={() => openModal(job)}
                                                className="justify-center w-full"
                                            >
                                                Detail
                                            </SecondaryButton>

                                            {auth.user ? (
                                                isApplied(job.id) ? (
                                                    <button disabled className="w-full bg-green-100 text-green-700 font-bold py-2 px-4 rounded-md text-sm text-center cursor-not-allowed border border-green-200">
                                                        Sudah Dilamar
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleApply(job.id)}
                                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md text-sm text-center transition shadow-md hover:shadow-none"
                                                    >
                                                        Lamar
                                                    </button>
                                                )
                                            ) : (
                                                <Link href={route('login')} className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md text-sm text-center transition">
                                                    Login
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-white rounded-xl shadow-sm border border-gray-100 mx-4 sm:mx-0">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada lowongan ditemukan</h3>
                            <p className="mt-1 text-sm text-gray-500">Coba kata kunci pencarian yang lain.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Job Details Modal */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="2xl">
                {selectedJob && (
                    <div className="p-6">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                                        {selectedJob.job_type || 'Full Time'}
                                    </span>
                                    {selectedJob.workplace_type && (
                                        <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
                                            {selectedJob.workplace_type}
                                        </span>
                                    )}
                                    {selectedJob.category && (
                                        <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                                            {selectedJob.category}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-500 transition">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                            {/* Description */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Deskripsi Pekerjaan</h3>
                                <div className="prose prose-sm max-w-none text-gray-600 whitespace-pre-line leading-relaxed">
                                    {selectedJob.description}
                                </div>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                        <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        Info Lowongan
                                    </h4>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        <li className="flex justify-between">
                                            <span className="text-gray-500">Lokasi:</span>
                                            <span className="font-medium text-gray-900 text-right">{selectedJob.location || '-'}</span>
                                        </li>
                                        {/* <li className="flex justify-between">
                                            <span className="text-gray-500">Kuota:</span>
                                            <span className="font-medium text-gray-900">{selectedJob.vacancy} Orang</span>
                                        </li> */}
                                        {selectedJob.salary_min && (
                                            <li className="flex justify-between">
                                                <span className="text-gray-500">Gaji:</span>
                                                <span className="font-medium text-green-600">
                                                    Rp {parseInt(selectedJob.salary_min).toLocaleString('id-ID')}
                                                    {selectedJob.salary_max ? ` - ${parseInt(selectedJob.salary_max).toLocaleString('id-ID')}` : '+'}
                                                </span>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                        <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        Kualifikasi
                                    </h4>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        <li className="flex justify-between">
                                            <span className="text-gray-500">Pendidikan:</span>
                                            <span className="font-medium text-gray-900">{selectedJob.min_education || 'Semua Jenjang'}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-gray-500">Pengalaman:</span>
                                            <span className="font-medium text-gray-900">{selectedJob.min_experience} Tahun</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-gray-500">Gender:</span>
                                            <span className="font-medium text-gray-900">
                                                {selectedJob.gender === 'Male' ? 'Laki-laki' : selectedJob.gender === 'Female' ? 'Perempuan' : 'L/P'}
                                            </span>
                                        </li>
                                        {(selectedJob.min_age || selectedJob.max_age) && (
                                            <li className="flex justify-between">
                                                <span className="text-gray-500">Usia:</span>
                                                <span className="font-medium text-gray-900">
                                                    {selectedJob.min_age || 0} - {selectedJob.max_age || '45+'} Tahun
                                                </span>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>

                            {/* Skills */}
                            {selectedJob.skills && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Keahlian Dibutuhkan</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedJob.skills.split(',').map((skill, index) => (
                                            <span key={index} className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                                                {skill.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100 mt-6">
                            <SecondaryButton onClick={closeModal}>
                                Tutup
                            </SecondaryButton>

                            {auth.user ? (
                                isApplied(selectedJob.id) ? (
                                    <PrimaryButton disabled className="opacity-50 cursor-not-allowed bg-green-600 hover:bg-green-600 focus:bg-green-600 active:bg-green-600 border-none ring-0">
                                        <span className="flex items-center">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                            Sudah Dilamar
                                        </span>
                                    </PrimaryButton>
                                ) : (
                                    <PrimaryButton onClick={() => handleApply(selectedJob.id)}>
                                        Lamar Sekarang
                                    </PrimaryButton>
                                )
                            ) : (
                                <Link href={route('login')} className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                                    Login untuk Melamar
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </Layout>
    );
}