import { Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const employers = [
  {
    id: '7',
    name: 'FPT Software',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/FPT_logo_2010.svg/2560px-FPT_logo_2010.svg.png'
  },
  {
    id: '8',
    name: 'Viettel Group',
    logo: 'https://yourway.viettel.vn/images/og-image.png'
  },
  {
    id: '9',
    name: 'VNG Corporation',
    logo: 'https://mondialbrand.com/wp-content/uploads/2024/02/vng_corporation-logo_brandlogos.net_ysr15.png'
  },
  {
    id: '10',
    name: 'MoMo',
    logo: 'https://static.momocdn.net/app/img/payment/logo.png'
  },
  {
    id: '11',
    name: 'ZaloPay',
    logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png'
  },
  {
    id: '12',
    name: 'Vingroup',
    logo: 'https://upload.wikimedia.org/wikipedia/vi/thumb/9/98/Vingroup_logo.svg/2560px-Vingroup_logo.svg.png'
  },
  {
    id: '13',
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
            <Link
              key={employer.id}
              to={`/companies/${employer.id}`}
              className="snap-center shrink-0 flex flex-col items-center justify-center p-6 bg-card rounded-xl border border-border hover:border-accent/50 hover:shadow-md transition-all cursor-pointer min-w-[200px]"
            >
              <img
                src={employer.logo}
                alt={employer.name}
                className="h-16 w-auto max-w-[120px] object-contain mb-3 group-hover:scale-105 transition-transform"
              />
              <span className="text-sm font-medium text-foreground">{employer.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCompanies;
