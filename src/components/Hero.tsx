
import SearchBar from './SearchBar';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToContent = () => {
    const contentSection = document.getElementById('content-section');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full pb-12 pt-20 md:pt-32 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-promotion-secondary/50 to-white/95"></div>
      
      {/* Background shapes */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-promotion-primary/5 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-promotion-accent/5 blur-3xl"></div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <Badge className="mb-8 animate-fade-in" />
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight md:leading-tight lg:leading-tight mb-6 max-w-4xl animate-slide-down">
          Découvrez, partagez et <span className="text-promotion-primary">économisez</span> avec les meilleurs codes promo
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-slide-down" style={{ animationDelay: '100ms' }}>
          Accédez à des milliers de codes promo vérifiés par notre communauté pour vos sites e-commerce préférés.
        </p>
        
        <div className="w-full max-w-2xl mb-12 animate-slide-down" style={{ animationDelay: '200ms' }}>
          <SearchBar />
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-slide-down" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center"
                >
                  <span className="text-xs font-medium text-muted-foreground"></span>
                </div>
              ))}
            </div>
            <span className="text-muted-foreground">
              Plus de 10 000 utilisateurs actifs
            </span>
          </div>
          
          <div className="h-6 w-px bg-border hidden sm:block"></div>
          
          <div className="flex items-center gap-2 text-sm">
            <div className="h-6 w-6 rounded-full bg-promotion-success/20 flex items-center justify-center">
              <CheckIcon className="h-3.5 w-3.5 text-promotion-success" />
            </div>
            <span className="text-muted-foreground">
              Codes vérifiés quotidiennement
            </span>
          </div>
        </div>
        
        <button 
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 h-10 w-10 rounded-full bg-white shadow-medium flex items-center justify-center hover:shadow-strong transition-all duration-300 animate-pulse"
          aria-label="Défiler vers le bas"
        >
          <ArrowDown className="h-5 w-5 text-promotion-primary" />
        </button>
      </div>
    </section>
  );
};

function Badge({ className = '' }) {
  return (
    <div className={`rounded-full px-4 py-1.5 border border-promotion-primary/30 bg-white shadow-sm ${className}`}>
      <span className="text-sm font-medium bg-gradient-to-r from-promotion-primary to-promotion-accent bg-clip-text text-transparent">
        ✨ La communauté #1 de codes promo en France
      </span>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default Hero;
