
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { CheckCircle, Clock, ShoppingBag, ExternalLink, Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export interface PromoCode {
  id: string;
  code: string;
  description: string;
  discount: string;
  store: {
    id: string;
    name: string;
    logo?: string;
  };
  expiresAt: string;
  createdAt: string;
  isVerified: boolean;
  category: string;
}

interface PromoCardProps {
  promo: PromoCode;
}

const PromoCard = ({ promo }: PromoCardProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(promo.code);
    setIsCopied(true);
    
    toast({
      title: "Code copié !",
      description: `Le code ${promo.code} a été copié dans le presse-papier.`,
    });
    
    setTimeout(() => setIsCopied(false), 2000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  // Calculate days left until expiration
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

  const getDiscountColor = (discount: string) => {
    const value = parseInt(discount);
    if (isNaN(value)) return "bg-promotion-primary";
    if (value >= 50) return "bg-promotion-success text-white";
    if (value >= 30) return "bg-orange-500 text-white";
    return "bg-promotion-primary text-white";
  };

  return (
    <Card className="overflow-hidden promo-hover-effect border border-border/50 shadow-soft h-full">
      <CardHeader className="p-4 pb-0 flex-row items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-promotion-secondary flex items-center justify-center">
            {promo.store.logo ? (
              <img 
                src={promo.store.logo} 
                alt={promo.store.name} 
                className="h-6 w-6 object-contain"
              />
            ) : (
              <ShoppingBag className="h-5 w-5 text-promotion-primary" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-sm truncate max-w-[150px]">
              {promo.store.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              {formatDate(promo.createdAt)}
            </p>
          </div>
        </div>
        <Badge
          className={`${getDiscountColor(promo.discount)}`}
        >
          {promo.discount}
        </Badge>
      </CardHeader>
      <CardContent className="p-4">
        <Link to={`/promo/${promo.id}`} className="block group">
          <h3 className="text-base font-medium line-clamp-2 group-hover:text-promotion-primary transition-colors">
            {promo.description}
          </h3>
          <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{getDaysLeft(promo.expiresAt)}</span>
            {promo.isVerified && (
              <>
                <span className="mx-1">•</span>
                <CheckCircle className="h-3 w-3 text-promotion-success" />
                <span className="text-promotion-success">Vérifié</span>
              </>
            )}
          </div>
        </Link>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        <div className="w-full p-2 bg-promotion-secondary bg-opacity-50 rounded-md flex items-center justify-between">
          <code className="font-mono text-sm font-semibold">{promo.code}</code>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 px-2 text-xs hover:bg-white hover:text-promotion-primary"
            onClick={copyToClipboard}
          >
            {isCopied ? (
              <CheckCircle className="h-3.5 w-3.5 mr-1 text-promotion-success" />
            ) : (
              <Copy className="h-3.5 w-3.5 mr-1" />
            )}
            {isCopied ? 'Copié' : 'Copier'}
          </Button>
        </div>
        <Link 
          to={`https://${promo.store.name.toLowerCase().replace(/\s+/g, '')}.com`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button 
            variant="outline" 
            className="w-full text-sm border-promotion-primary text-promotion-primary hover:bg-promotion-primary hover:text-white"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            Visiter le site
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PromoCard;
