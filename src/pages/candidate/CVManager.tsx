import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { mockCVs } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';
import {
  Download,
  FileText,
  Plus,
  Sparkles,
  Star,
  Trash2,
  Upload
} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CVManager = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [cvs, setCvs] = useState(mockCVs);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const handleUploadClick = () => {
    if (!isAuthenticated) {
      navigate('/auth?mode=login');
      return;
    }
    setUploadDialogOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate upload
      const newCV = {
        id: `cv${Date.now()}`,
        candidateId: 'c1',
        fileName: file.name,
        fileUrl: URL.createObjectURL(file),
        uploadedAt: new Date(),
        atsScore: Math.floor(Math.random() * 30) + 70
      };

      // In a real app, we would upload the file here
      setTimeout(() => {
        setCvs([newCV, ...cvs]);
        setUploadDialogOpen(false);
        toast.success('CV uploaded successfully! AI is analyzing...');
      }, 1000);
    }
  };

  const handleDelete = (id: string) => {
    setCvs(cvs.filter(cv => cv.id !== id));
    toast.success('CV deleted successfully');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 min-h-[600px]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">CV Attachment</h1>
          <p className="text-muted-foreground mt-1">Manage your CVs and get AI-powered insights</p>
        </div>

        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <Button variant="accent" onClick={handleUploadClick}>
            <Upload className="h-4 w-4 mr-2" />
            Upload New CV
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Your CV</DialogTitle>
              <DialogDescription>
                Upload a PDF or DOCX file. Our AI will analyze it and provide an ATS score.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-muted/20 hover:bg-muted/40 transition-colors">
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <Label htmlFor="cv-upload" className="cursor-pointer">
                  <span className="text-accent font-medium hover:underline">Click to upload</span>
                  <span className="text-muted-foreground"> or drag and drop</span>
                  <p className="text-sm text-muted-foreground mt-2">PDF, DOCX up to 10MB</p>
                </Label>
                <Input
                  id="cv-upload"
                  type="file"
                  accept=".pdf,.docx"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {cvs.length > 0 ? (
        <div className="space-y-4">
          {cvs.map((cv, index) => (
            <div
              key={cv.id}
              className="flex flex-col md:flex-row md:items-center gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-accent/40 hover:shadow-sm transition-all group"
            >
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <FileText className="h-8 w-8 text-primary" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground truncate text-lg">{cv.fileName}</h3>
                  {index === 0 && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">Primary</span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Uploaded {formatDistanceToNow(cv.uploadedAt, { addSuffix: true })}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span>1.2 MB</span>
                </div>
              </div>

              {cv.atsScore && (
                <div className="flex flex-col items-center justify-center px-6 py-2 border-l border-r border-gray-100 min-w-[120px]">
                  <div className="flex items-center gap-1.5 text-accent mb-1">
                    <Sparkles className="h-4 w-4" />
                    <span className="font-bold text-xl">{cv.atsScore}/100</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">ATS Score</p>
                </div>
              )}

              <div className="flex items-center gap-2 self-start md:self-center">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <Star className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-primary"
                  onClick={() => handleDelete(cv.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Link to={`/candidate/cv-check/${cv.id}`}>
                  <Button variant="outline" size="sm" className="ml-2 text-accent border-accent/20 hover:bg-accent/5">
                    <Sparkles className="h-3 w-3 mr-2" />
                    AI Analysis
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-muted/10 rounded-xl border-2 border-dashed border-gray-200">
          <FileText className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No CVs uploaded yet</h3>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            Upload your CV to apply for jobs and get AI-powered feedback on how to improve it.
          </p>
          <Button variant="accent" onClick={handleUploadClick}>
            <Plus className="h-4 w-4 mr-2" />
            Upload Your First CV
          </Button>
        </div>
      )}
    </div>
  );
};

export default CVManager;
