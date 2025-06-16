import React, { useState, useMemo, useEffect } from 'react';

// Dados simulados
const serviceCategories = ['Desenvolvimento', 'Design', 'Marketing', 'Análise'];

const services = [
  {
    id: '1',
    title: 'Aplicativo Web React',
    description: 'Crie aplicações web modernas e responsivas usando React e TypeScript com as melhores práticas de desenvolvimento.',
    category: 'Desenvolvimento',
    iconName: 'Code',
    tags: ['React', 'TypeScript', 'Responsivo', 'PWA']
  },
  {
    id: '2',
    title: 'Sistema de Design',
    description: 'Desenvolva um sistema de design completo com componentes reutilizáveis e guia de estilo consistente.',
    category: 'Design',
    iconName: 'Design',
    tags: ['UI/UX', 'Componentes', 'Branding', 'Tokens']
  },
  {
    id: '3',
    title: 'Dashboard Analytics',
    description: 'Construa dashboards interativos para visualização de dados e métricas de negócio em tempo real.',
    category: 'Análise',
    iconName: 'Analytics',
    tags: ['Dashboard', 'Métricas', 'Visualização', 'BI']
  },
  {
    id: '4',
    title: 'Campanha Digital',
    description: 'Planeje e execute campanhas de marketing digital com automação e análise de performance.',
    category: 'Marketing',
    iconName: 'Marketing',
    tags: ['Automação', 'Email', 'Social', 'ROI']
  },
  {
    id: '5',
    title: 'API RESTful',
    description: 'Desenvolva APIs robustas e escaláveis seguindo padrões REST e melhores práticas de segurança.',
    category: 'Desenvolvimento',
    iconName: 'Code',
    tags: ['REST', 'API', 'Segurança', 'Documentação']
  },
  {
    id: '6',
    title: 'Identidade Visual',
    description: 'Crie identidades visuais marcantes com logotipos, paleta de cores e elementos gráficos únicos.',
    category: 'Design',
    iconName: 'Design',
    tags: ['Logo', 'Branding', 'Cores', 'Tipografia']
  }
];

// Simulação do hook de favoritos
const useFavorites = () => {
  const [favorites, setFavorites] = useState(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simula carregamento dos favoritos
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);

  const toggleFavorite = (serviceId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(serviceId)) {
        newFavorites.delete(serviceId);
      } else {
        newFavorites.add(serviceId);
      }
      return newFavorites;
    });
  };

  const isFavorite = (serviceId) => favorites.has(serviceId);

  return { favorites, toggleFavorite, isFavorite, isLoaded };
};

// Componentes de ícones
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/>
  </svg>
);

const StarIcon = ({ filled = false }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const PlusCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="16"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
  </svg>
);

const PackageSearchIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m7 11 2-2-2-2"/>
    <path d="M11 13h4"/>
    <path d="m18 13 2-2-2-2"/>
    <path d="M3 21h18"/>
    <path d="M5 21V7a2 2 0 0 1 2-2h9.5a2 2 0 0 1 2 2v1"/>
    <path d="M19 21V8a2 2 0 0 0-2-2h-5"/>
  </svg>
);

// Componente ServiceCard (versão simplificada)
const ServiceCard = ({ service, isFavorite, onToggleFavorite }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);

  const categoryColorMap = {
    'Desenvolvimento': { border: '#2196f3', text: '#2196f3' },
    'Design': { border: '#9c27b0', text: '#9c27b0' },
    'Marketing': { border: '#ff9800', text: '#ff9800' },
    'Análise': { border: '#4caf50', text: '#4caf50' },
  };

  const iconMap = {
    'Code': () => <span style={{fontSize: '2.5rem'}}>💻</span>,
    'Design': () => <span style={{fontSize: '2.5rem'}}>🎨</span>,
    'Analytics': () => <span style={{fontSize: '2.5rem'}}>📊</span>,
    'Marketing': () => <span style={{fontSize: '2.5rem'}}>📢</span>,
  };

  const colorConfig = categoryColorMap[service.category] || { border: '#757575', text: '#757575' };
  const IconComponent = iconMap[service.iconName] || iconMap['Code'];

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: isHovered ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.2s ease-in-out',
    borderTop: `4px solid ${colorConfig.border}`,
    overflow: 'hidden'
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ padding: '16px', paddingBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ color: colorConfig.text }}>
            <IconComponent />
          </div>
          <button
            style={{
              background: buttonHovered ? '#f3f4f6' : 'none',
              border: 'none',
              padding: '8px',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              color: isFavorite ? '#ffd700' : '#9ca3af'
            }}
            onClick={() => onToggleFavorite(service.id)}
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
          >
            <StarIcon filled={isFavorite} />
          </button>
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px', color: '#111827', margin: 0 }}>
          {service.title}
        </h3>
        <p style={{
          fontSize: '0.875rem',
          color: '#6b7280',
          height: '4rem',
          overflow: 'hidden',
          margin: 0,
          lineHeight: '1.25rem'
        }}>
          {service.description}
        </p>
      </div>
      
      <div style={{ flexGrow: 1, padding: '0 16px 8px 16px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          <span style={{
            backgroundColor: '#e5e7eb',
            color: '#374151',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: '500'
          }}>
            {service.category}
          </span>
          {service.tags.slice(0, 2).map((tag) => (
            <span key={tag} style={{
              backgroundColor: 'transparent',
              color: '#6b7280',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              border: '1px solid #d1d5db'
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div style={{ padding: '16px', paddingTop: 0 }}>
        <button style={{
          width: '100%',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          padding: '8px 16px',
          fontSize: '0.875rem',
          fontWeight: '500',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <PlusCircleIcon />
          Criar
        </button>
      </div>
    </div>
  );
};

// Componente principal
export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const { favorites, toggleFavorite, isFavorite, isLoaded } = useFavorites();

  const filteredServices = useMemo(() => {
    let S = services;

    if (activeTab === "favorites") {
      S = S.filter((service) => favorites.has(service.id));
    }

    if (searchTerm) {
      S = S.filter(
        (service) =>
          service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== "all") {
      S = S.filter((service) => service.category === selectedCategory);
    }
    return S;
  }, [searchTerm, selectedCategory, activeTab, favorites]);

  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    if (isLoaded) {
      setShowLoading(false);
    }
  }, [isLoaded]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px'
  };

  const headerStyle = {
    marginBottom: '32px'
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '8px',
    color: '#111827'
  };

  const subtitleStyle = {
    color: '#6b7280',
    fontSize: '1rem'
  };

  const filtersContainerStyle = {
    marginBottom: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  };

  const searchContainerStyle = {
    position: 'relative',
    width: '100%'
  };

  const searchInputStyle = {
    width: '100%',
    padding: '12px 12px 12px 40px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '0.875rem',
    outline: 'none'
  };

  const searchIconStyle = {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#6b7280'
  };

  const buttonsContainerStyle = {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  };

  const buttonStyle = {
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    backgroundColor: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.875rem',
    fontWeight: '500'
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#2563eb',
    color: 'white',
    border: '1px solid #2563eb'
  };

  const tabsStyle = {
    display: 'flex',
    gap: '0',
    marginBottom: '24px',
    backgroundColor: '#f3f4f6',
    borderRadius: '6px',
    padding: '4px'
  };

  const tabStyle = {
    padding: '8px 16px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '0.875rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const activeTabStyle = {
    ...tabStyle,
    backgroundColor: 'white',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px'
  };

  const emptyStateStyle = {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#6b7280'
  };

  const loadingCardStyle = {
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    backgroundColor: 'white',
    padding: '24px',
    animation: 'pulse 1.5s ease-in-out infinite'
  };

  const loadingBarStyle = {
    backgroundColor: '#f3f4f6',
    borderRadius: '4px',
    marginBottom: '12px'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Catálogo Self-Service</h1>
        <p style={subtitleStyle}>Crie novos componentes de software usando nossas ofertas.</p>
      </div>

      <div style={filtersContainerStyle}>
        <div style={searchContainerStyle}>
          <div style={searchIconStyle}>
            <SearchIcon />
          </div>
          <input
            type="search"
            placeholder="Pesquisar por nome, time ou categoria..."
            style={searchInputStyle}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={buttonsContainerStyle}>
          <div style={{ position: 'relative' }}>
            <button
              style={buttonStyle}
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              <FilterIcon />
              {selectedCategory === "all" ? "Categoria" : selectedCategory}
            </button>
            {showCategoryDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                zIndex: 10,
                marginTop: '4px'
              }}>
                <button
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                  onClick={() => {
                    setSelectedCategory("all");
                    setShowCategoryDropdown(false);
                  }}
                >
                  Todas Categorias
                </button>
                {serviceCategories.map((category) => (
                  <button
                    key={category}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowCategoryDropdown(false);
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button style={buttonStyle} onClick={handleClearFilters}>
            <XIcon /> Limpar
          </button>
          <button style={primaryButtonStyle}>
            <PlusCircleIcon /> Criar Novo
          </button>
        </div>
      </div>

      <div style={tabsStyle}>
        <button
          style={activeTab === "all" ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab("all")}
        >
          Todos os Serviços
        </button>
        <button
          style={activeTab === "favorites" ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab("favorites")}
        >
          <StarIcon />
          Favoritos ({isLoaded ? favorites.size : "..."})
        </button>
      </div>

      {showLoading && activeTab === "favorites" && (
        <div style={gridStyle}>
          {[...Array(favorites.size || 4)].map((_, i) => (
            <div key={i} style={loadingCardStyle}>
              <div style={{ ...loadingBarStyle, height: '40px', width: '40px', marginBottom: '8px' }}></div>
              <div style={{ ...loadingBarStyle, height: '24px', width: '75%', marginBottom: '8px' }}></div>
              <div style={{ ...loadingBarStyle, height: '64px', width: '100%', marginBottom: '16px' }}></div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <div style={{ ...loadingBarStyle, height: '20px', width: '25%' }}></div>
                <div style={{ ...loadingBarStyle, height: '20px', width: '33%' }}></div>
              </div>
              <div style={{ ...loadingBarStyle, height: '40px', width: '100%' }}></div>
            </div>
          ))}
        </div>
      )}

      {!showLoading && filteredServices.length === 0 && (
        <div style={emptyStateStyle}>
          <PackageSearchIcon />
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px', color: '#111827' }}>
            Nenhum serviço encontrado
          </h3>
          <p>Tente ajustar seus filtros ou termo de busca.</p>
        </div>
      )}

      {!showLoading && filteredServices.length > 0 && (
        <div style={gridStyle}>
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isFavorite={isFavorite(service.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
