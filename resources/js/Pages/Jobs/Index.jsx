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
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                                <span className="inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                    Full Time
                                </span>
                            </div>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-500 transition">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="prose prose-sm max-w-none text-gray-600 mb-8 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                            <div className="whitespace-pre-line leading-relaxed">
                                {selectedJob.description}
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                            <SecondaryButton onClick={closeModal}>
                                Tutup
                            </SecondaryButton>

                            {auth.user ? (
                                isApplied(selectedJob.id) ? (
                                    <PrimaryButton disabled className="opacity-50 cursor-not-allowed bg-green-600 hover:bg-green-600 focus:bg-green-600 active:bg-green-600">
                                        Sudah Dilamar
                                    </PrimaryButton>
                                ) : (
                                    <PrimaryButton onClick={() => handleApply(selectedJob.id)}>
                                        Lamar Sekarang
                                    </PrimaryButton>
                                )
                            ) : (
                                <Link href={route('login')} className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
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