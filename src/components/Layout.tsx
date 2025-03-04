
import { ReactNode } from 'react';
import Navbar from './Navbar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-promotion-background">
      <Navbar />
      <main className={cn("flex-grow px-4 sm:px-6 lg:px-8 pt-8 pb-20", className)}>
        {children}
      </main>
      <footer className="py-6 border-t border-border/40 bg-white/80 backdrop-blur-sm">
        <div className="container flex flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} PromoSwap. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Conditions d'utilisation</a>
            <a href="#" className="hover:text-foreground transition-colors">Politique de confidentialité</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
