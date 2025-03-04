
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, ArrowLeft, CheckCircle, Clock, Copy, ExternalLink, Share2, ShoppingBag, ThumbsUp } from 'lucide-react';
import Layout from '@/components/Layout';
import { PromoCode } from '@/components/PromoCard';
import { toast } from '@/hooks/use-toast';

// Mock data (would normally come from API)
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
];

interface PromoDetailsProps {
  promo: PromoCode;
  onCopy: () => void;
}

const PromoCodePage = () => {
  const { id } = useParams<{ id: string }>();
  const [promo, setPromo] = useState<PromoCode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCodeCopied, setIsCodeCopied] = useState(false);

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      const foundPromo = mockPromos.find(p => p.id === id);
      setPromo(foundPromo || null);
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleCopyCode = () => {
    if (!promo) return;
    
    navigator.clipboard.writeText(promo.code);
    setIsCodeCopied(true);
    
    toast({
      title: "Code copié !",
      description: `Le code ${promo.code} a été copié dans le presse-papier.`,
    });
    
    setTimeout(() => setIsCodeCopied(false), 2000);
  };

  const handleShareCode = () => {
    if (navigator.share) {
      navigator.share({
        title: `Code promo ${promo?.store.name}: ${promo?.discount}`,
        text: `J'ai trouvé ce code promo sur PromoSwap: ${promo?.description}`,
        url: window.location.href,
      })
      .catch(error => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Lien copié !",
        description: "Le lien a été copié dans le presse-papier.",
      });
    }
  };

  if (isLoading) {
    return (
      <Layout className="flex items-center justify-center py-12">
        <div className="animate-pulse flex flex-col space-y-4 w-full max-w-3xl">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-36 bg-muted rounded"></div>
          <div className="h-24 bg-muted rounded"></div>
          <div className="h-24 bg-muted rounded"></div>
        </div>
      </Layout>
    );
  }

  if (!promo) {
    return (
      <Layout className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto" />
          <h1 className="text-2xl font-semibold">Code promo non trouvé</h1>
          <p className="text-muted-foreground">
            Le code promo que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Link to="/">
            <Button>Retour à l'accueil</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout className="py-12">
      <div className="container max-w-4xl">
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Retour aux codes promo
          </Link>
        </div>

        <PromoDetails promo={promo} onCopy={handleCopyCode} />
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-border/50 shadow-soft">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Instructions d'utilisation</h3>
              <ol className="space-y-4 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <div className="flex-none h-6 w-6 rounded-full bg-promotion-secondary flex items-center justify-center text-promotion-primary font-medium">
                    1
                  </div>
                  <div>
                    <p>Copiez le code promo en cliquant sur le bouton "Copier le code".</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-none h-6 w-6 rounded-full bg-promotion-secondary flex items-center justify-center text-promotion-primary font-medium">
                    2
                  </div>
                  <div>
                    <p>Accédez au site de {promo.store.name} en cliquant sur "Visiter le site".</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-none h-6 w-6 rounded-full bg-promotion-secondary flex items-center justify-center text-promotion-primary font-medium">
                    3
                  </div>
                  <div>
                    <p>Ajoutez les produits souhaités à votre panier et procédez au paiement.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-none h-6 w-6 rounded-full bg-promotion-secondary flex items-center justify-center text-promotion-primary font-medium">
                    4
                  </div>
                  <div>
                    <p>Sur la page de paiement, recherchez le champ "Code promo" ou similaire et collez-y le code.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-none h-6 w-6 rounded-full bg-promotion-secondary flex items-center justify-center text-promotion-primary font-medium">
                    5
                  </div>
                  <div>
                    <p>Cliquez sur "Appliquer" et la réduction sera automatiquement appliquée à votre commande.</p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-soft">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Détails du code</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Site</span>
                  <span className="font-medium">{promo.store.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Remise</span>
                  <span className="font-medium">{promo.discount}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Date d'ajout</span>
                  <span className="font-medium">{formatDate(promo.createdAt)}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Expire le</span>
                  <span className="font-medium">{formatDate(promo.expiresAt)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Catégorie</span>
                  <span className="font-medium">{promo.category}</span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Partager ce code</h4>
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={handleShareCode}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

const PromoDetails = ({ promo, onCopy }: PromoDetailsProps) => {
  const [isCopied, setIsCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(promo.code);
    setIsCopied(true);
    onCopy();
    setTimeout(() => setIsCopied(false), 2000);
  };

  const getDiscountColor = (discount: string) => {
    const value = parseInt(discount);
    if (isNaN(value)) return "bg-promotion-primary";
    if (value >= 50) return "bg-promotion-success text-white";
    if (value >= 30) return "bg-orange-500 text-white";
    return "bg-promotion-primary text-white";
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-white rounded-xl border border-border/50 shadow-soft p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-promotion-secondary flex items-center justify-center">
              {promo.store.logo ? (
                <img 
                  src={promo.store.logo} 
                  alt={promo.store.name} 
                  className="h-8 w-8 object-contain"
                />
              ) : (
                <ShoppingBag className="h-6 w-6 text-promotion-primary" />
              )}
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold">{promo.store.name}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{getDaysLeft(promo.expiresAt)}</span>
              </div>
            </div>
          </div>
          <Badge
            className={`${getDiscountColor(promo.discount)} text-base px-3 py-1`}
          >
            {promo.discount}
          </Badge>
        </div>

        <h1 className="text-xl md:text-2xl font-semibold mb-4">{promo.description}</h1>
        
        <div className="flex items-center gap-2 mb-8">
          {promo.isVerified && (
            <div className="flex items-center gap-1 text-sm text-promotion-success">
              <CheckCircle className="h-4 w-4" />
              <span>Code vérifié</span>
            </div>
          )}
          <div className="h-4 w-px bg-border"></div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <ThumbsUp className="h-4 w-4" />
            <span>97% succès</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-promotion-secondary bg-opacity-30 rounded-lg p-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Code promo</div>
              <div className="font-mono font-bold text-xl select-all">{promo.code}</div>
            </div>
            <Button 
              onClick={handleCopy}
              variant="default"
              className="text-white"
            >
              {isCopied ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Copié
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copier le code
                </>
              )}
            </Button>
          </div>
          <div>
            <a 
              href={`https://${promo.store.name.toLowerCase().replace(/\s+/g, '')}.com`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button
                variant="outline"
                className="w-full h-full border-promotion-primary text-promotion-primary hover:bg-promotion-primary hover:text-white"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Visiter le site
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

const getDaysLeft = (expiresAt: string) => {
  const now = new Date();
  const expDate = new Date(expiresAt);
  const diffTime = expDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return "Expiré";
  if (diffDays === 0) return "Expire aujourd'hui";
  if (diffDays === 1) return "Expire demain";
  return `Expire dans ${diffDays} jours`;
};

export default PromoCodePage;
