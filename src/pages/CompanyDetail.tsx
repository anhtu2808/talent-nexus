import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockCompanies, mockJobs } from '@/data/mockData';
import { ArrowLeft, MapPin, Users, Building2, Star, Link as LinkIcon, Calendar, Briefcase, Heart } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Job } from '@/types';

const CompanyDetail = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('about');
    const company = mockCompanies.find(c => c.id === id);
    const companyJobs = mockJobs.filter(job => job.company === company?.name && job.isActive);

    if (!company) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 container py-20 text-center">
                    <h1 className="text-2xl font-bold mb-4">Company not found</h1>
                    <Link to="/companies">
                        <Button>Back to Companies</Button>
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Header />

            <main className="flex-1 pb-20">
                {/* Banner/Cover Image Concept */}
                <div className="h-64 bg-gradient-to-r from-green-600 to-green-900 relative">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="container h-full relative">
                        <Link to="/companies" className="absolute top-6 left-4 md:left-8 text-white/80 hover:text-white flex items-center gap-2 transition-colors">
                            <ArrowLeft className="w-5 h-5" /> Back to Companies
                        </Link>
                    </div>
                </div>

                <div className="container relative -mt-20">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Main Info */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Company Header Card */}
                            <div className="bg-white rounded-xl shadow-md border border-slate-100 p-8">
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className="w-32 h-32 rounded-xl bg-white p-2 shadow-sm border border-slate-100 shrink-0">
                                        <img
                                            src={company.logo}
                                            alt={company.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <h1 className="text-3xl font-bold text-slate-900 mb-2">{company.name}</h1>
                                        <div className="flex flex-wrap items-center gap-4 text-slate-600 mb-4">
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="w-4 h-4" />
                                                <span>{company.location}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Building2 className="w-4 h-4" />
                                                <span>{company.industry}</span>
                                            </div>

                                            <div className="flex items-center gap-2 text-slate-700">
                                                <Calendar className="w-4 h-4 text-green-600" />
                                                <span className="font-medium">{company.workingTime}</span>
                                            </div>
                                        </div>

                                        {/* Working Environment moved here */}
                                        <div className="flex flex-wrap gap-6 pb-6 border-t border-slate-100">
                                            <div className="flex items-center gap-2 text-slate-700">
                                                <Star className="w-4 h-4 text-yellow-500" />
                                                <span className="font-medium">{company.rating.toFixed(1)} / 5.0</span>
                                                <span className="text-slate-500 text-sm">({company.reviews} reviews)</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-3">
                                            <Button variant="accent">
                                                Follow Company
                                            </Button>
                                            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                                                Visit Website <LinkIcon className="ml-2 w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tabs Navigation */}
                            <div className="bg-white rounded-xl shadow-sm border border-slate-100 px-6 pt-4 sticky top-0 z-10">
                                <div className="flex items-center gap-8 border-b border-slate-200">
                                    <button
                                        onClick={() => setActiveTab('about')}
                                        className={`pb-4 font-medium text-sm transition-all relative ${activeTab === 'about' ? 'text-green-600 font-bold' : 'text-slate-500 hover:text-slate-800'}`}
                                    >
                                        About
                                        {activeTab === 'about' && (
                                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 rounded-t-full" />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('reviews')}
                                        className={`pb-4 font-medium text-sm transition-all relative ${activeTab === 'reviews' ? 'text-green-600 font-bold' : 'text-slate-500 hover:text-slate-800'}`}
                                    >
                                        Reviews <Badge variant="secondary" className="ml-1 bg-slate-100 text-slate-600">{company.reviews}</Badge>
                                        {activeTab === 'reviews' && (
                                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 rounded-t-full" />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('jobs')}
                                        className={`pb-4 font-medium text-sm transition-all relative ${activeTab === 'jobs' ? 'text-green-600 font-bold' : 'text-slate-500 hover:text-slate-800'}`}
                                    >
                                        Jobs <Badge variant="secondary" className="ml-1 bg-slate-100 text-slate-600">{companyJobs.length}</Badge>
                                        {activeTab === 'jobs' && (
                                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 rounded-t-full" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Tab Content: About */}
                            {activeTab === 'about' && (
                                <>
                                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
                                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                            <span className="w-1 h-6 bg-green-600 rounded-full"></span>
                                            About Us
                                        </h2>
                                        <div className="prose max-w-none text-slate-600 mb-8">
                                            <p className="whitespace-pre-line leading-relaxed">
                                                {company.introduction || company.description}
                                            </p>
                                        </div>

                                        {company.techStack ? (
                                            <div className="mt-8 border-t border-slate-100 pt-6">
                                                <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900 mb-6">
                                                    <span className="w-1 h-6 bg-green-600 rounded-full"></span>
                                                    Our expertise
                                                </h3>

                                                <div className="mb-6">
                                                    <div className="flex flex-wrap gap-2">
                                                        {company.techStack.keySkills.map((skill, idx) => (
                                                            <Badge key={idx} variant="outline" className="bg-white text-slate-600 border-slate-200 font-normal hover:border-green-500 hover:text-green-600 transition-colors px-3 py-1">
                                                                {skill}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="space-y-4 text-slate-700">
                                                    {company.techStack.mobile && (
                                                        <div className="flex flex-col md:flex-row md:items-start gap-2">
                                                            <span className="font-bold min-w-[120px]">Mobile:</span>
                                                            <span>{company.techStack.mobile}</span>
                                                        </div>
                                                    )}
                                                    {company.techStack.web && (
                                                        <div className="flex flex-col md:flex-row md:items-start gap-2">
                                                            <span className="font-bold min-w-[120px]">Web:</span>
                                                            <span>{company.techStack.web}</span>
                                                        </div>
                                                    )}
                                                    {company.techStack.backend && (
                                                        <div className="flex flex-col md:flex-row md:items-start gap-2">
                                                            <span className="font-bold min-w-[120px]">Back-end:</span>
                                                            <span>{company.techStack.backend}</span>
                                                        </div>
                                                    )}
                                                    {company.techStack.cloud && (
                                                        <div className="flex flex-col md:flex-row md:items-start gap-2">
                                                            <span className="font-bold min-w-[120px]">System & Cloud:</span>
                                                            <span>{company.techStack.cloud}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="bg-slate-50 p-4 rounded-lg mt-8">
                                                <h3 className="font-semibold text-slate-900 mb-2">Specialties</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {company.specialties?.map((specialty, idx) => (
                                                        <Badge key={idx} variant="secondary" className="bg-white hover:bg-white text-slate-700 font-normal border border-slate-200">
                                                            {specialty}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {company.reasonsToJoin && (
                                            <div className="mt-8 border-t border-slate-100 pt-6">
                                                <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900 mb-6">
                                                    <span className="w-1 h-6 bg-green-600 rounded-full"></span>
                                                    Why you will love working here
                                                </h3>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {company.reasonsToJoin.map((reason, idx) => (
                                                        <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                                                            <div className="mt-0.5 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                                                <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            </div>
                                                            <span className="text-slate-700">{reason}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Map Section */}
                                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
                                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                            <MapPin className="w-5 h-5 text-green-600" />
                                            Company Location
                                        </h2>
                                        <div className="bg-slate-100 h-80 rounded-lg flex items-center justify-center relative group cursor-pointer overflow-hidden">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <MapPin className="w-12 h-12 text-slate-300" />
                                            </div>

                                            {/* Mock Map Background */}
                                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>

                                            <Button variant="secondary" className="relative z-10 shadow-lg bg-white hover:bg-slate-50">
                                                View on Google Maps
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Tab Content: Reviews */}
                            {activeTab === 'reviews' && (
                                <div className="space-y-6">
                                    {/* Overall Rating */}
                                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
                                        <h3 className="text-xl font-bold text-slate-900 mb-6">Overall Rating</h3>
                                        <div className="flex flex-col md:flex-row gap-12 items-center">
                                            <div className="flex-1 w-full">
                                                <div className="flex items-center gap-4 mb-2">
                                                    <span className="text-5xl font-bold text-slate-900">{company.rating}</span>
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex text-orange-400">
                                                            {[1, 2, 3, 4, 5].map((s) => (
                                                                <Star key={s} className="w-5 h-5" fill={s <= Math.round(company.rating) ? "currentColor" : "none"} />
                                                            ))}
                                                        </div>
                                                        <span className="text-slate-500 text-sm">{company.reviews} reviews</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-2 mt-4">
                                                    {[
                                                        { stars: 5, pct: 89 },
                                                        { stars: 4, pct: 9 },
                                                        { stars: 3, pct: 2 },
                                                        { stars: 2, pct: 0 },
                                                        { stars: 1, pct: 0 }
                                                    ].map((row) => (
                                                        <div key={row.stars} className="flex items-center gap-3 text-sm">
                                                            <div className="flex items-center gap-1 w-12 shrink-0">
                                                                <span className="font-medium text-slate-700">{row.stars}</span>
                                                                <Star className="w-3 h-3 text-orange-400" fill="currentColor" />
                                                            </div>
                                                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                                <div className="h-full bg-orange-400 rounded-full" style={{ width: `${row.pct}%` }} />
                                                            </div>
                                                            <div className="w-8 text-right text-slate-500">{row.pct}%</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6">
                                                <div className="relative w-32 h-32 flex items-center justify-center">
                                                    <div className="absolute inset-0 rounded-full border-[6px] border-emerald-100"></div>
                                                    <div className="absolute inset-0 rounded-full border-[6px] border-emerald-500 border-l-transparent -rotate-45"></div>
                                                    <div className="text-center">
                                                        <span className="text-2xl font-bold text-emerald-600">96%</span>
                                                    </div>
                                                </div>
                                                <div className="max-w-[150px]">
                                                    <p className="font-medium text-slate-900">Promotes working here</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Reviews List */}
                                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
                                        <h3 className="text-xl font-bold text-slate-900 mb-6">{company.reviews} reviews</h3>
                                        <div className="space-y-8">
                                            {company.reviewsList?.map((review) => (
                                                <div key={review.id} className="border-b border-slate-100 pb-8 last:border-0 last:pb-0">
                                                    <div className="flex flex-col gap-2 mb-3">
                                                        <span className="text-sm text-slate-400">{review.date}</span>
                                                        <h4 className="font-bold text-lg text-slate-900">{review.title}</h4>
                                                    </div>
                                                    <div className="flex items-center gap-4 mb-4">
                                                        <div className="flex text-orange-400">
                                                            {[1, 2, 3, 4, 5].map((s) => (
                                                                <Star key={s} className="w-4 h-4" fill={s <= review.rating ? "currentColor" : "none"} />
                                                            ))}
                                                        </div>
                                                        {review.isRecommended && (
                                                            <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
                                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                                                </svg>
                                                                Promotes working here
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Rating Details Tooltip-ish display */}
                                                    <div className="bg-slate-50 p-4 rounded-lg mb-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                                        {Object.entries(review.details).map(([key, value]) => (
                                                            <div key={key} className="flex items-center justify-between text-sm">
                                                                <span className="text-slate-600 capitalize">{key.replace(/^./, str => str.toUpperCase())}</span>
                                                                <div className="flex text-orange-400 gap-0.5">
                                                                    {[1, 2, 3, 4, 5].map((s) => (
                                                                        <Star key={s} className="w-3 h-3" fill={s <= (value as number) ? "currentColor" : "none"} />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <p className="text-slate-700 leading-relaxed">
                                                        {review.content}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Tab Content: Jobs */}
                            {activeTab === 'jobs' && (
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-slate-900 mb-6">Open Positions ({companyJobs.length})</h3>
                                    {companyJobs.length > 0 ? (
                                        <div className="grid grid-cols-1 gap-4">
                                            {companyJobs.map((job) => (
                                                <Link to={`/jobs/${job.id}`} key={job.id} className="block group">
                                                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:border-green-500 hover:shadow-md transition-all">
                                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                            <div>
                                                                <h4 className="font-bold text-lg text-slate-900 group-hover:text-green-600 transition-colors mb-2">
                                                                    {job.title}
                                                                </h4>
                                                                <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm">
                                                                    <span className="flex items-center gap-1.5">
                                                                        <MapPin className="w-4 h-4" /> {job.location.join(', ')}
                                                                    </span>
                                                                    <span className="flex items-center gap-1.5">
                                                                        <Calendar className="w-4 h-4" /> {new Date(job.postedAt).toLocaleDateString()}
                                                                    </span>
                                                                    <span className="flex items-center gap-1.5 font-medium text-emerald-600">
                                                                        <span className="px-2 py-0.5 bg-emerald-50 rounded-full border border-emerald-100">
                                                                            ${job.salary}
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                                <div className="flex flex-wrap gap-2 mt-3">
                                                                    {job.skills.map(skill => (
                                                                        <Badge key={skill} variant="secondary" className="bg-slate-50 text-slate-600 font-normal">
                                                                            {skill}
                                                                        </Badge>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div className="shrink-0">
                                                                <Button className="w-full md:w-auto bg-green-50 text-green-600 hover:bg-green-100 border-green-200">
                                                                    View Details
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-12 text-center">
                                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Briefcase className="w-8 h-8 text-slate-300" />
                                            </div>
                                            <h3 className="text-lg font-medium text-slate-900 mb-1">No open positions</h3>
                                            <p className="text-slate-500">This company currently has no open job listings.</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'posts' && (
                                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 text-center">
                                    <p className="text-slate-500">Chưa có bài viết nào.</p>
                                </div>
                            )}
                        </div>

                        {/* Right Column: Sidebar */}
                        <div className="space-y-6">
                            {/* Company Overview */}
                            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                                <h3 className="font-bold text-slate-800 mb-4">Company Overview</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between py-2 border-b border-slate-50">
                                        <span className="text-slate-500 text-sm">Founded</span>
                                        <span className="font-medium text-slate-800">2010</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-slate-50">
                                        <span className="text-slate-500 text-sm">Company Size</span>
                                        <span className="font-medium text-slate-800">{company.employees}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-slate-50">
                                        <span className="text-slate-500 text-sm">Followers</span>
                                        <span className="font-medium text-slate-800">{company.followers?.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-slate-50">
                                        <span className="text-slate-500 text-sm">Website</span>
                                        <a href="#" className="font-medium text-green-600 hover:underline truncate max-w-[150px]">techvision.com</a>
                                    </div>
                                </div>
                            </div>

                            {/* Job List - Moved to Right Column (Sidebar) */}
                            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-slate-800">Open Positions</h3>
                                    <Badge variant="secondary">{companyJobs.length}</Badge>
                                </div>

                                <div className="space-y-3">
                                    {companyJobs.length > 0 ? (
                                        companyJobs.map((job) => (
                                            <Link to={`/jobs/${job.id}`} key={job.id} className="block group">
                                                <div className="border border-slate-100 rounded-lg p-3 hover:border-green-500 hover:shadow-sm transition-all bg-slate-50/50 hover:bg-white">
                                                    <h4 className="font-semibold text-slate-800 group-hover:text-green-600 transition-colors line-clamp-1 mb-1">
                                                        {job.title}
                                                    </h4>
                                                    <div className="flex flex-col gap-1 text-xs text-slate-500">
                                                        <span className="flex items-center gap-1">
                                                            <span className="font-medium text-emerald-600">$ {job.salary}</span>
                                                        </span>
                                                        <div className="flex items-center justify-between">
                                                            <span className="flex items-center gap-1">
                                                                <MapPin className="w-3 h-3" /> {job.location.join(', ')}
                                                            </span>
                                                            <span className="text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">Apply &rarr;</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="text-center py-8">
                                            <Briefcase className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                            <p className="text-slate-500 text-sm">No positions available</p>
                                        </div>
                                    )}
                                </div>

                                {companyJobs.length > 5 && (
                                    <Button variant="ghost" className="w-full mt-4 text-sm text-green-600 hover:text-green-700">
                                        View All Jobs
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CompanyDetail;
