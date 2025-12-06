import { FileText, Brain, Target, BarChart3, Upload, Zap } from 'lucide-react';

const features = [
  {
    icon: Upload,
    title: 'Easy CV Upload',
    description: 'Upload your resume in PDF or DOCX format. Our system automatically extracts and organizes your information.',
    color: 'bg-blue-500/10 text-blue-500'
  },
  {
    icon: Brain,
    title: 'AI Resume Parsing',
    description: 'Advanced NLP extracts skills, experience, and education from your CV into a structured format.',
    color: 'bg-purple-500/10 text-purple-500'
  },
  {
    icon: Target,
    title: 'Smart JD Matching',
    description: 'Semantic analysis calculates precise match scores between your CV and job descriptions.',
    color: 'bg-accent/10 text-accent'
  },
  {
    icon: BarChart3,
    title: 'ATS Scoring',
    description: 'Get an ATS-friendly score with detailed feedback on structure, keywords, and formatting.',
    color: 'bg-orange-500/10 text-orange-500'
  },
  {
    icon: Zap,
    title: 'AI Suggestions',
    description: 'Receive personalized recommendations to improve your CV and increase your match rate.',
    color: 'bg-pink-500/10 text-pink-500'
  },
  {
    icon: FileText,
    title: 'Detailed Reports',
    description: 'Recruiters get comprehensive analytics and candidate ranking dashboards.',
    color: 'bg-cyan-500/10 text-cyan-500'
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-3">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            AI-Powered Recruitment Tools
          </h2>
          <p className="text-muted-foreground">
            Leverage cutting-edge AI technology to streamline your job search or find the perfect candidates faster than ever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card rounded-xl p-6 border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
