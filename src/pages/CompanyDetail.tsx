import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockCompanies, mockJobs } from '@/data/mockData';
import { ArrowLeft, MapPin, Users, Building2, Star, Link as LinkIcon, Calendar, Briefcase, Heart } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { Job } from '@/types';

const CompanyDetail = () => {
    const { id } = useParams();
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
                <div className="h-64 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
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
                        <div className="lg:col-span-2 space-y-8">
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
                                                <Star className="w-4 h-4 text-yellow-500" />
                                                <span className="font-medium">{company.rating.toFixed(1)} / 5.0</span>
                                                <span className="text-slate-500 text-sm">({company.reviews} reviews)</span>
                                            </div>
                                        </div>

                                        {/* Working Environment moved here */}
                                        <div className="flex flex-wrap gap-6 pb-6 border-t border-slate-100">
                                            <div className="flex items-center gap-2 text-slate-700">
                                                <Calendar className="w-4 h-4 text-blue-600" />
                                                <span className="font-medium">{company.workingTime}</span>
                                            </div>

                                        </div>

                                        <div className="flex flex-wrap gap-3">
                                            <Button className="bg-blue-600 hover:bg-blue-700">
                                                Follow Company
                                            </Button>
                                            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                                                Visit Website <LinkIcon className="ml-2 w-4 h-4" />
                                            </Button>
                                        </div>


                                    </div>
                                </div>
                            </div>

                            {/* About Section */}
                            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                                    About Us
                                </h2>
                                <div className="prose max-w-none text-slate-600 mb-8">
                                    <p className="whitespace-pre-line leading-relaxed">
                                        {company.introduction || company.description}
                                    </p>
                                    {company.techStack ? (
                                        <div className="mt-8 border-t border-slate-100 pt-6">
                                            <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900 mb-6">
                                                <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                                                Our expertise
                                            </h3>

                                            <div className="mb-6">

                                                <div className="flex flex-wrap gap-2">
                                                    {company.techStack.keySkills.map((skill, idx) => (
                                                        <Badge key={idx} variant="outline" className="bg-white text-slate-600 border-slate-200 font-normal hover:border-blue-500 hover:text-blue-600 transition-colors px-3 py-1">
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
                                </div>
                            </div>

                            {/* Map Section - Moved to Left Column */}
                            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
                                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-blue-600" />
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
                                        <a href="#" className="font-medium text-blue-600 hover:underline truncate max-w-[150px]">techvision.com</a>
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
                                                <div className="border border-slate-100 rounded-lg p-3 hover:border-blue-500 hover:shadow-sm transition-all bg-slate-50/50 hover:bg-white">
                                                    <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1">
                                                        {job.title}
                                                    </h4>
                                                    <div className="flex flex-col gap-1 text-xs text-slate-500">
                                                        <span className="flex items-center gap-1">
                                                            <span className="font-medium text-emerald-600">$ {job.salary}</span>
                                                        </span>
                                                        <div className="flex items-center justify-between">
                                                            <span className="flex items-center gap-1">
                                                                <MapPin className="w-3 h-3" /> {job.location}
                                                            </span>
                                                            <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">Apply &rarr;</span>
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
                                    <Button variant="ghost" className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700">
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
