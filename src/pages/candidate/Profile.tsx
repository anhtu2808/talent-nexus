import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { CandidateProfile } from '@/types';
import {
  Briefcase,
  Calendar,
  DollarSign,
  GraduationCap,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Save,
  X
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

// Mock data types for sections not fully covered by CandidateProfile yet
interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

const Profile = () => {
  const { user } = useAuth();

  // Initial state derived from user context + mocks
  const [profile, setProfile] = useState<Partial<CandidateProfile>>({
    ...user,
    location: 'Ho Chi Minh City, Vietnam',
    phone: '+84 90 123 4567',
    expectedSalary: '2000',
    title: 'Senior Frontend Developer',
    summary: 'Experienced Frontend Developer with over 5 years of experience in building responsive web applications using React, TypeScript, and modern CSS frameworks. Passionate about user experience and performance optimization.',
    skills: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'GraphQL', 'Next.js'],
  } as Partial<CandidateProfile> & { title?: string; summary?: string });

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc.',
      location: 'Ho Chi Minh City',
      startDate: '2021-06',
      endDate: '',
      current: true,
      description: 'Is led the development of the company main product dashboard. Improved performance by 40% and implemented a new design system.',
    },
    {
      id: '2',
      title: 'Frontend Developer',
      company: 'WebCreators Co.',
      location: 'Hanoi',
      startDate: '2019-01',
      endDate: '2021-05',
      current: false,
      description: 'Collaborated with designers to implement responsive landing pages and e-commerce sites.',
    }
  ]);

  const [education, setEducation] = useState<Education[]>([
    {
      id: '1',
      school: 'University of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2015-09',
      endDate: '2019-06',
    }
  ]);

  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  // Handlers
  const handleSaveBasic = () => {
    setIsEditingBasic(false);
    toast.success('Basic information updated');
  };

  const handleSaveSummary = () => {
    setIsEditingSummary(false);
    toast.success('Summary updated');
  };

  const handleAddSkill = () => {
    if (newSkill && !profile.skills?.includes(newSkill)) {
      setProfile(prev => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill]
      }));
      setNewSkill('');
      toast.success('Skill added');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills?.filter(s => s !== skillToRemove)
    }));
    toast.success('Skill removed');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* Header Section */}
      {/* Header Section */}
      <Card className="border-none shadow-sm bg-white overflow-hidden p-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left w-full md:w-auto">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-gray-50 shadow-sm mx-auto md:mx-0">
                <AvatarImage src={profile.avatar} className="object-cover" />
                <AvatarFallback className="text-4xl bg-blue-50 text-blue-600">
                  {profile.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-2 right-2 md:right-0 bg-green-500 w-5 h-5 rounded-full border-4 border-white"></div>
            </div>
            <div className="mt-2">
              <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-lg text-gray-600 font-medium mb-2">{(profile as any).title || 'Software Engineer'}</p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500">
                <MapPin className="w-4 h-4" />
                <span>{profile.location}</span>
                <span className="mx-2">•</span>
                <span className="text-blue-600 font-medium">{(profile as any).openToWork !== false ? 'Open to work' : 'Closed'}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button variant="outline" className="gap-2">
              <Briefcase className="w-4 h-4" />
              Change Status
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm">
              Share Profile
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6 md:col-span-1">
          {/* Contact Info */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Contact Info</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditingBasic(!isEditingBasic)}
              >
                {isEditingBasic ? <X className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              {isEditingBasic ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={profile.email || ''}
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profile.phone || ''}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profile.location || ''}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary">Expected Salary ($)</Label>
                    <Input
                      id="salary"
                      value={profile.expectedSalary || ''}
                      onChange={(e) => setProfile({ ...profile, expectedSalary: e.target.value })}
                    />
                  </div>
                  <Button className="w-full" onClick={handleSaveBasic}>Save Changes</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="bg-blue-50 p-2 rounded-full text-blue-600">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium truncate">{profile.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="bg-blue-50 p-2 rounded-full text-blue-600">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-medium">{profile.phone || 'Not set'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="bg-blue-50 p-2 rounded-full text-blue-600">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium">{profile.location || 'Not set'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="bg-blue-50 p-2 rounded-full text-blue-600">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Expected Salary</p>
                      <p className="text-sm font-medium">{profile.expectedSalary ? `$${profile.expectedSalary}` : 'Negotiable'}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Skills</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.skills?.map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1 hover:bg-gray-200 cursor-pointer group">
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 hidden group-hover:inline-block text-gray-500 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                />
                <Button size="icon" onClick={handleAddSkill}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Summary */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Professional Summary</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditingSummary(!isEditingSummary)}
              >
                {isEditingSummary ? <Save className="w-4 h-4" onClick={handleSaveSummary} /> : <Pencil className="w-4 h-4" />}
              </Button>
            </CardHeader>
            <CardContent className="pt-4">
              {isEditingSummary ? (
                <Textarea
                  value={(profile as any).summary || ''}
                  onChange={(e) => setProfile({ ...profile, summary: e.target.value } as any)}
                  className="min-h-[120px]"
                />
              ) : (
                <p className="text-gray-600 leading-relaxed">
                  {(profile as any).summary || 'No summary added yet.'}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Experience</CardTitle>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="w-4 h-4" /> Add Experience
              </Button>
            </CardHeader>
            <CardContent className="pt-4 space-y-6">
              {experiences.map((exp, index) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-4">
                      <div className="mt-1 bg-indigo-50 p-2 rounded-lg text-indigo-600">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                        <p className="text-indigo-600 font-medium">{exp.company}</p>
                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          <span className="mx-1">•</span>
                          {exp.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-indigo-600">
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm ml-16">{exp.description}</p>
                  {index < experiences.length - 1 && <Separator className="my-6 ml-16" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Education</CardTitle>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="w-4 h-4" /> Add Education
              </Button>
            </CardHeader>
            <CardContent className="pt-4 space-y-6">
              {education.map((edu, index) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-4">
                      <div className="mt-1 bg-green-50 p-2 rounded-lg text-green-600">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{edu.school}</h3>
                        <p className="text-gray-700">{edu.degree} in {edu.field}</p>
                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          {edu.startDate} - {edu.endDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-green-600">
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {index < education.length - 1 && <Separator className="my-6 ml-16" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
