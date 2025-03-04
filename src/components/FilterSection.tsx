
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

interface Store {
  id: string;
  name: string;
}

interface FilterSectionProps {
  categories: Category[];
  stores: Store[];
  onFilterChange: (filters: { categories: string[], stores: string[] }) => void;
}

const FilterSection = ({ categories, stores, onFilterChange }: FilterSectionProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleStore = (storeId: string) => {
    setSelectedStores(prev => 
      prev.includes(storeId)
        ? prev.filter(id => id !== storeId)
        : [...prev, storeId]
    );
  };

  const applyFilters = () => {
    onFilterChange({
      categories: selectedCategories,
      stores: selectedStores
    });
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedStores([]);
    onFilterChange({ categories: [], stores: [] });
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedStores.length > 0;

  return (
    <div className="w-full bg-white rounded-xl p-4 shadow-soft mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-promotion-primary" />
          <h3 className="font-medium">Filtres</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowFilters(!showFilters)}
          className="text-sm"
        >
          {showFilters ? 'Masquer' : 'Afficher'}
        </Button>
      </div>

      {showFilters && (
        <div className="space-y-4 animate-fade-in">
          <div>
            <h4 className="text-sm font-medium mb-2">Catégories</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Badge 
                  key={category.id}
                  variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/80"
                  onClick={() => toggleCategory(category.id)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Sites</h4>
            <div className="flex flex-wrap gap-2">
              {stores.map(store => (
                <Badge 
                  key={store.id}
                  variant={selectedStores.includes(store.id) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/80"
                  onClick={() => toggleStore(store.id)}
                >
                  {store.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            {hasActiveFilters && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetFilters}
                className="text-sm"
              >
                <X className="mr-1 h-4 w-4" />
                Réinitialiser
              </Button>
            )}
            <Button 
              size="sm" 
              onClick={applyFilters}
              className="text-sm"
            >
              Appliquer
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
