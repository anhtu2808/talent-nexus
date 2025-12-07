import { Building2 } from 'lucide-react';

const employers = [
  {
    name: 'FPT Software',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/FPT_logo_2010.svg/2560px-FPT_logo_2010.svg.png'
  },
  {
    name: 'Viettel Group',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Viettel_logo_2021.svg/1200px-Viettel_logo_2021.svg.png'
  },
  {
    name: 'VNG Corporation',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/VNG_Corporation_logo.png/1200px-VNG_Corporation_logo.png'
  },
  {
    name: 'MoMo',
    logo: 'https://static.momocdn.net/app/img/payment/logo.png'
  },
  {
    name: 'ZaloPay',
    logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png'
  },
  {
    name: 'Vingroup',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Logo_Vingroup_2018.png/1200px-Logo_Vingroup_2018.png'
  },
  {
    name: 'Shopee Vietnam',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Shopee.svg/2560px-Shopee.svg.png'
  },
];


const TopCompanies = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-muted-foreground mb-3">
            <Building2 className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-wider">Trusted By</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Top Companies
          </h2>
        </div>

        <div className="flex overflow-x-auto pb-4 gap-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {employers.map((employer) => (
            <div
              key={employer.name}
              className="snap-center shrink-0 flex flex-col items-center justify-center p-6 bg-card rounded-xl border border-border hover:border-accent/50 hover:shadow-md transition-all cursor-pointer min-w-[200px]"
            >
              <img
                src={employer.logo}
                alt={employer.name}
                className="h-16 w-auto max-w-[120px] object-contain mb-3 group-hover:scale-105 transition-transform"
              />
              <span className="text-sm font-medium text-foreground">{employer.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCompanies;
