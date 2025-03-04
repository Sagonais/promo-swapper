
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  className?: string;
  placeholder?: string;
}

const SearchBar = ({ 
  onSearch, 
  className = '',
  placeholder = 'Rechercher un site ou un code promo...'
}: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`relative flex w-full max-w-3xl ${className}`}
    >
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-20 h-12 w-full rounded-full border-input bg-white/80 backdrop-blur-sm shadow-soft focus-visible:ring-2 focus-visible:ring-promotion-primary"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-1.5">
          <Button 
            type="submit" 
            size="sm"
            className="h-9 rounded-full"
          >
            Rechercher
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
