
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import PromoCard, { PromoCode } from '@/components/PromoCard';
import FilterSection from '@/components/FilterSection';
import { Badge } from '@/components/ui/badge';
import { LightbulbIcon, TrendingUp, Zap, Gift } from 'lucide-react';

// Mock data
const mockCategories = [
  { id: 'mode', name: 'Mode' },
  { id: 'electronics', name: 'Électronique' },
  { id: 'food', name: 'Alimentation' },
  { id: 'beauty', name: 'Beauté' },
  { id: 'travel', name: 'Voyage' },
  { id: 'services', name: 'Services' },
];

const mockStores = [
  { id: 'amazon', name: 'Amazon' },
  { id: 'cdiscount', name: 'Cdiscount' },
  { id: 'fnac', name: 'Fnac' },
  { id: 'darty', name: 'Darty' },
  { id: 'zalando', name: 'Zalando' },
  { id: 'sephora', name: 'Sephora' },
];

const mockPromos: PromoCode[] = [
  {
    id: '1',
    code: 'SUMMER30',
    description: '30% de réduction sur tout le site',
    discount: '30%',
    store: { id: 'zalando', name: 'Zalando' },
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    isVerified: true,
    category: 'Mode',
  },
  {
    id: '2',
    code: 'BIENVENUE20',
    description: '20€ de réduction dès 100€ d\'achat',
    discount: '20€',
    store: { id: 'fnac', name: 'Fnac' },
    expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    isVerified: true,
    category: 'Électronique',
  },
  {
    id: '3',
    code: 'WELCOME50',
    description: 'Livraison gratuite sans minimum d\'achat',
    discount: 'Livraison gratuite',
    store: { id: 'amazon', name: 'Amazon' },
    expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isVerified: true,
    category: 'Électronique',
  },
  {
    id: '4',
    code: 'BEAUTY25',
    description: '25% de réduction sur les produits de beauté',
    discount: '25%',
    store: { id: 'sephora', name: 'Sephora' },
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    isVerified: false,
    category: 'Beauté',
  },
  {
    id: '5',
    code: 'PROMO10',
    description: '10% de réduction sur les produits high-tech',
    discount: '10%',
    store: { id: 'darty', name: 'Darty' },
    expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    isVerified: true,
    category: 'Électronique',
  },
  {
    id: '6',
    code: 'FLASH50',
    description: '50% de réduction sur les articles soldés',
    discount: '50%',
    store: { id: 'cdiscount', name: 'Cdiscount' },
    expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isVerified: true,
    category: 'Divers',
  },
];

const featuredStores = [
  { id: 'amazon', name: 'Amazon', logo: '', promoCount: 23 },
  { id: 'zalando', name: 'Zalando', logo: '', promoCount: 15 },
  { id: 'fnac', name: 'Fnac', logo: '', promoCount: 12 },
  { id: 'cdiscount', name: 'Cdiscount', logo: '', promoCount: 9 },
  { id: 'sephora', name: 'Sephora', logo: '', promoCount: 7 },
];

const Index = () => {
  const [activePromos, setActivePromos] = useState<PromoCode[]>(mockPromos);
  
  const handleFilterChange = (filters: { categories: string[], stores: string[] }) => {
    console.log('Filters changed:', filters);
    
    // Filter the promos based on the selected filters
    if (filters.categories.length === 0 && filters.stores.length === 0) {
      setActivePromos(mockPromos);
      return;
    }
    
    const filtered = mockPromos.filter(promo => {
      const categoryMatch = filters.categories.length === 0 || 
        filters.categories.includes(promo.category.toLowerCase());
      
      const storeMatch = filters.stores.length === 0 || 
        filters.stores.includes(promo.store.id);
      
      return categoryMatch && storeMatch;
    });
    
    setActivePromos(filtered);
  };

  return (
    <Layout>
      <Hero />
      
      <div id="content-section" className="pt-12">
        <div className="container">
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <Badge className="mb-2 bg-promotion-secondary text-promotion-primary hover:bg-promotion-secondary/80">
                  <TrendingUp className="mr-1 h-3.5 w-3.5" />
                  Tendances
                </Badge>
                <h2 className="text-2xl font-semibold tracking-tight">Codes promo populaires</h2>
                <p className="text-muted-foreground mt-1">
                  Les meilleures offres sélectionnées par notre communauté
                </p>
              </div>
              <Link to="/explore">
                <Button variant="ghost">
                  Voir tout
                </Button>
              </Link>
            </div>
            
            <FilterSection 
              categories={mockCategories}
              stores={mockStores}
              onFilterChange={handleFilterChange}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activePromos.map(promo => (
                <PromoCard key={promo.id} promo={promo} />
              ))}
            </div>
            
            {activePromos.length === 0 && (
              <div className="flex flex-col items-center justify-center text-center py-12 bg-white rounded-xl shadow-soft">
                <LightbulbIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Aucun résultat trouvé</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  Aucun code promo ne correspond à vos critères de recherche. Essayez de modifier vos filtres.
                </p>
                <Button onClick={() => handleFilterChange({ categories: [], stores: [] })}>
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </section>
          
          <section className="mb-16">
            <div className="mb-8">
              <Badge className="mb-2 bg-promotion-secondary text-promotion-primary hover:bg-promotion-secondary/80">
                <Zap className="mr-1 h-3.5 w-3.5" />
                Sites Populaires
              </Badge>
              <h2 className="text-2xl font-semibold tracking-tight">Magasins en vedette</h2>
              <p className="text-muted-foreground mt-1">
                Explorez les codes promo de vos sites préférés
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {featuredStores.map(store => (
                <Link to={`/store/${store.id}`} key={store.id}>
                  <div className="bg-white border border-border/50 rounded-xl p-6 text-center hover:shadow-medium transition-all promo-hover-effect h-full flex flex-col items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-promotion-secondary flex items-center justify-center mb-4">
                      {store.logo ? (
                        <img 
                          src={store.logo} 
                          alt={store.name} 
                          className="h-10 w-10 object-contain"
                        />
                      ) : (
                        <ShoppingBagIcon className="h-8 w-8 text-promotion-primary" />
                      )}
                    </div>
                    <h3 className="font-medium mb-1">{store.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {store.promoCount} codes
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
          
          <section className="mb-16">
            <div className="mb-10">
              <Badge className="mb-2 bg-promotion-secondary text-promotion-primary hover:bg-promotion-secondary/80">
                <Gift className="mr-1 h-3.5 w-3.5" />
                Partagez & Économisez
              </Badge>
              <h2 className="text-2xl font-semibold tracking-tight">Comment ça marche</h2>
              <p className="text-muted-foreground mt-1">
                Rejoignez notre communauté et partagez vos codes promo
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Trouvez",
                  description: "Parcourez notre base de données de codes promotionnels vérifiés pour vos sites préférés.",
                  icon: SearchIcon,
                  color: "bg-blue-50 text-blue-500",
                },
                {
                  title: "Partagez",
                  description: "Partagez vos propres codes promo et contribuez à la communauté.",
                  icon: ShareIcon,
                  color: "bg-purple-50 text-purple-500",
                },
                {
                  title: "Économisez",
                  description: "Utilisez les codes pour économiser sur vos achats en ligne.",
                  icon: SaveIcon,
                  color: "bg-green-50 text-green-500",
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-soft">
                  <div className={`h-12 w-12 rounded-full ${item.color} flex items-center justify-center mb-4`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-10">
              <Link to="/register">
                <Button size="lg" className="rounded-full text-base">
                  Rejoindre la communauté
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

// Icons
function ShoppingBagIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ShareIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}

function SaveIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M12 2v6a2 2 0 0 0 2 2h6" />
      <path d="M22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8" />
    </svg>
  );
}

export default Index;
