import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { SoapProduct } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: SoapProduct[];
  onSelectProduct: (product: SoapProduct) => void;
  onAddToCart: (product: SoapProduct) => void;
  addedProductId: string | null;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  addedProductId,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories = [
    { id: 'all', label: 'All Bars' },
    { id: 'energizing', label: 'Energizing' },
    { id: 'calming', label: 'Calming & Gentle' },
    { id: 'exfoliating', label: 'Exfoliating Scrub' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          q === '' ||
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.scentNotes.some((n) => n.toLowerCase().includes(q)) ||
          p.ingredients.some((i) => i.toLowerCase().includes(q));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured default
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="products" className="py-14 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-[#536B59] mb-2">
              The Botanical Catalog
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E2320] font-normal tracking-tight">
              Curated Cold-Process Bars
            </h2>
            <p className="text-sm text-[#1E2320]/75 mt-1.5 max-w-lg font-light">
              Each 140g bar is saponified in small batches and cured for a minimum of 4 weeks. Formulated with zero synthetic fragrance oils.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#1E2320]/40 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scent, clay, or oil..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-[#FFFFFF] border border-[#E8E3DC] rounded-lg text-[#1E2320] placeholder-[#1E2320]/40 focus:outline-hidden focus:border-[#536B59] focus:ring-1 focus:ring-[#536B59] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#1E2320]/40 hover:text-[#1E2320] p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter & Sort Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E8E3DC]">
          {/* Category Tabs (Clean Segmented Controls) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#2E3E32] text-[#FAF8F5]'
                    : 'bg-[#FFFFFF] text-[#1E2320]/75 border border-[#E8E3DC] hover:text-[#1E2320] hover:border-[#536B59]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#1E2320]/60" />
            <span className="text-xs text-[#1E2320]/60">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-[#FFFFFF] border border-[#E8E3DC] rounded-md px-2.5 py-1.5 text-[#1E2320] focus:outline-hidden focus:border-[#536B59] cursor-pointer"
            >
              <option value="featured">Featured Recipe</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((soap) => (
              <ProductCard
                key={soap.id}
                soap={soap}
                onSelect={onSelectProduct}
                onAddToCart={(s, e) => {
                  e.stopPropagation();
                  onAddToCart(s);
                }}
                isAdded={addedProductId === soap.id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#FFFFFF] rounded-xl border border-[#E8E3DC] p-8">
            <p className="text-sm text-[#1E2320]/70 mb-4">
              No soap bars matched your search criteria "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 text-xs font-semibold bg-[#2E3E32] text-[#FAF8F5] rounded-md hover:bg-[#1E2320] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
