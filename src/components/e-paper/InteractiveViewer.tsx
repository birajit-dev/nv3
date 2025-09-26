'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Move, 
  Maximize, 
  Minimize, 
  ChevronLeft, 
  ChevronRight, 
  Grid3X3,
  Download,
  Share2,
  Search,
  BookOpen
} from 'lucide-react';
import { NewsArticle } from '@/types/news';

interface EPaperPage {
  pageNumber: number;
  imageUrl: string;
  thumbnail: string;
  sections: string[];
  articles: NewsArticle[];
}

interface InteractiveViewerProps {
  pages: EPaperPage[];
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

interface ViewerState {
  zoom: number;
  rotation: number;
  pan: { x: number; y: number };
  isFullscreen: boolean;
  showThumbnails: boolean;
  showGrid: boolean;
  viewMode: 'single' | 'double' | 'grid';
}

export default function InteractiveViewer({ 
  pages, 
  currentPage, 
  onPageChange 
}: InteractiveViewerProps) {
  const [viewerState, setViewerState] = useState<ViewerState>({
    zoom: 100,
    rotation: 0,
    pan: { x: 0, y: 0 },
    isFullscreen: false,
    showThumbnails: true,
    showGrid: false,
    viewMode: 'single'
  });

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<{ pageNumber: number; article: NewsArticle }[]>([]);
  
  const viewerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Zoom controls
  const handleZoomIn = useCallback(() => {
    setViewerState(prev => ({
      ...prev,
      zoom: Math.min(prev.zoom + 25, 300)
    }));
  }, []);

  const handleZoomOut = useCallback(() => {
    setViewerState(prev => ({
      ...prev,
      zoom: Math.max(prev.zoom - 25, 25)
    }));
  }, []);

  const handleZoomReset = useCallback(() => {
    setViewerState(prev => ({
      ...prev,
      zoom: 100,
      pan: { x: 0, y: 0 }
    }));
  }, []);

  // Rotation
  const handleRotate = useCallback(() => {
    setViewerState(prev => ({
      ...prev,
      rotation: (prev.rotation + 90) % 360
    }));
  }, []);

  // Pan controls
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (viewerState.zoom > 100) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - viewerState.pan.x, y: e.clientY - viewerState.pan.y });
    }
  }, [viewerState.zoom, viewerState.pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      setViewerState(prev => ({
        ...prev,
        pan: {
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        }
      }));
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      viewerRef.current?.requestFullscreen();
      setViewerState(prev => ({ ...prev, isFullscreen: true }));
    } else {
      document.exitFullscreen();
      setViewerState(prev => ({ ...prev, isFullscreen: false }));
    }
  }, []);

  // Navigation
  const handlePrevPage = useCallback(() => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange]);

  const handleNextPage = useCallback(() => {
    if (currentPage < pages.length - 1) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, pages.length, onPageChange]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          handlePrevPage();
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleNextPage();
          break;
        case '+':
        case '=':
          e.preventDefault();
          handleZoomIn();
          break;
        case '-':
          e.preventDefault();
          handleZoomOut();
          break;
        case '0':
          e.preventDefault();
          handleZoomReset();
          break;
        case 'r':
          e.preventDefault();
          handleRotate();
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 't':
          e.preventDefault();
          setViewerState(prev => ({ ...prev, showThumbnails: !prev.showThumbnails }));
          break;
        case 'Escape':
          if (viewerState.isFullscreen) {
            toggleFullscreen();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevPage, handleNextPage, handleZoomIn, handleZoomOut, handleZoomReset, handleRotate, toggleFullscreen, viewerState.isFullscreen]);

  // Search functionality
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    const results: { pageNumber: number; article: NewsArticle }[] = [];
    pages.forEach(page => {
      page.articles.forEach(article => {
        const searchContent = `${article.post_name} ${article.post_summary || ''} ${article.post_content || ''}`.toLowerCase();
        if (searchContent.includes(term.toLowerCase())) {
          results.push({ pageNumber: page.pageNumber, article });
        }
      });
    });
    setSearchResults(results);
  }, [pages]);

  // View mode changes
  const handleViewModeChange = useCallback((mode: 'single' | 'double' | 'grid') => {
    setViewerState(prev => ({
      ...prev,
      viewMode: mode,
      zoom: mode === 'grid' ? 50 : 100,
      pan: { x: 0, y: 0 }
    }));
  }, []);

  const currentPageData = pages[currentPage];

  return (
    <div 
      ref={viewerRef}
      className={`bg-gray-100 ${viewerState.isFullscreen ? 'fixed inset-0 z-50' : 'rounded-lg'} overflow-hidden`}
    >
      {/* Mobile-friendly Toolbar */}
      <div className="bg-white border-b border-gray-200 p-2 sm:p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          {/* Navigation Controls */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              title="Previous Page (←)"
            >
              <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
            </button>
            
            <span className="text-xs sm:text-sm font-medium text-gray-900 px-2 sm:px-3">
              Page {currentPage + 1} of {pages.length}
            </span>
            
            <button
              onClick={handleNextPage}
              disabled={currentPage === pages.length - 1}
              className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              title="Next Page (→)"
            >
              <ChevronRight size={16} className="sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Mobile-friendly Search */}
          <div className="flex items-center space-x-1 sm:space-x-2 flex-1 max-w-xs sm:max-w-md mx-2 sm:mx-4">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-7 sm:pl-9 pr-2 sm:pr-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto z-10">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => onPageChange(result.pageNumber - 1)}
                    className="w-full text-left p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {result.article.post_name}
                    </div>
                    <div className="text-xs text-gray-500">Page {result.pageNumber}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile-friendly View Controls */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* View Mode */}
            <div className="flex items-center space-x-0.5 sm:space-x-1 bg-gray-100 rounded-lg p-0.5 sm:p-1">
              <button
                onClick={() => handleViewModeChange('single')}
                className={`p-1 sm:p-1.5 rounded ${viewerState.viewMode === 'single' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                title="Single Page"
              >
                <BookOpen size={14} className="sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={() => handleViewModeChange('grid')}
                className={`p-1 sm:p-1.5 rounded ${viewerState.viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                title="Grid View"
              >
                <Grid3X3 size={14} className="sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center space-x-0.5 sm:space-x-1 bg-gray-100 rounded-lg p-0.5 sm:p-1">
              <button
                onClick={handleZoomOut}
                className="p-1 sm:p-1.5 hover:bg-gray-200 rounded"
                title="Zoom Out (-)"
              >
                <ZoomOut size={14} className="sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={handleZoomReset}
                className="px-1 sm:px-2 py-1 sm:py-1.5 text-xs font-medium hover:bg-gray-200 rounded min-w-[2.5rem] sm:min-w-[3rem]"
                title="Reset Zoom (0)"
              >
                {viewerState.zoom}%
              </button>
              <button
                onClick={handleZoomIn}
                className="p-1 sm:p-1.5 hover:bg-gray-200 rounded"
                title="Zoom In (+)"
              >
                <ZoomIn size={14} className="sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Mobile-friendly Additional Controls */}
            <button
              onClick={handleRotate}
              className="p-1 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              title="Rotate (R)"
            >
              <RotateCw size={14} className="sm:w-4 sm:h-4" />
            </button>

            <button
              onClick={() => setViewerState(prev => ({ ...prev, showThumbnails: !prev.showThumbnails }))}
              className={`p-1 sm:p-2 rounded-lg ${viewerState.showThumbnails ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
              title="Toggle Thumbnails (T)"
            >
              <Grid3X3 size={14} className="sm:w-4 sm:h-4" />
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-1 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              title="Fullscreen (F)"
            >
              {viewerState.isFullscreen ? <Minimize size={14} className="sm:w-4 sm:h-4" /> : <Maximize size={14} className="sm:w-4 sm:h-4" />}
            </button>

            {/* Mobile-friendly Action Buttons */}
            <div className="flex items-center space-x-0.5 sm:space-x-1 border-l border-gray-200 pl-1 sm:pl-2 ml-1 sm:ml-2">
              <button
                onClick={() => alert('Download feature coming soon!')}
                className="p-1 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                title="Download"
              >
                <Download size={14} className="sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `Northeast Herald E-Paper - Page ${currentPage + 1}`,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }
                }}
                className="p-1 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                title="Share"
              >
                <Share2 size={14} className="sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-full">
        {/* Mobile-friendly Thumbnails Sidebar */}
        {viewerState.showThumbnails && (
          <div className="w-32 sm:w-48 bg-gray-50 border-r border-gray-200 p-2 sm:p-4 max-h-[600px] sm:max-h-[800px] overflow-y-auto">
            <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3">Pages</h4>
            <div className="space-y-2 sm:space-y-3">
              {pages.map((page, index) => (
                <div 
                  key={page.pageNumber} 
                  className="cursor-pointer group"
                  onClick={() => onPageChange(index)}
                >
                  <div className={`relative aspect-[3/4] bg-white border-2 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-all ${
                    index === currentPage ? 'border-blue-600 ring-2 ring-blue-200' : 'border-gray-200'
                  }`}>
                    <Image
                      src={page.thumbnail}
                      alt={`Page ${page.pageNumber}`}
                      fill
                      className="object-cover"
                      sizes="150px"
                    />
                    {index === currentPage && (
                      <div className="absolute inset-0 bg-blue-600/10"></div>
                    )}
                  </div>
                  <p className="text-xs text-center text-gray-600 mt-1 font-medium">
                    Page {page.pageNumber}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Viewer */}
        <div className="flex-1 overflow-hidden">
          {viewerState.viewMode === 'grid' ? (
            // Mobile-friendly Grid View
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 p-2 sm:p-4 h-full overflow-y-auto">
              {pages.map((page, index) => (
                <div 
                  key={page.pageNumber}
                  className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 ${
                    index === currentPage ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => onPageChange(index)}
                >
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={page.imageUrl}
                      alt={`Page ${page.pageNumber}`}
                      fill
                      className="object-contain"
                      sizes="100vw"
                    />
                  </div>
                  <div className="p-2 sm:p-3">
                    <h3 className="font-semibold text-gray-900 text-xs sm:text-sm">Page {page.pageNumber}</h3>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Mobile-friendly Single Page View
            <div 
              className="h-full overflow-auto bg-gray-100 flex items-center justify-center p-2 sm:p-4"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{ cursor: isDragging ? 'grabbing' : (viewerState.zoom > 100 ? 'grab' : 'default') }}
            >
              <div 
                ref={imageRef}
                className="bg-white shadow-2xl rounded-lg overflow-hidden"
                style={{
                  transform: `
                    scale(${viewerState.zoom / 100}) 
                    rotate(${viewerState.rotation}deg) 
                    translate(${viewerState.pan.x}px, ${viewerState.pan.y}px)
                  `,
                  transformOrigin: 'center',
                  transition: isDragging ? 'none' : 'transform 0.3s ease'
                }}
              >
                <div className="relative aspect-[3/4] w-[800px]">
                  <Image
                    src={currentPageData.imageUrl}
                    alt={`E-Paper Page ${currentPage + 1}`}
                    fill
                    className="object-contain"
                    sizes="800px"
                    priority
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span>{currentPageData.sections.join(' • ')}</span>
            <span>{currentPageData.articles.length} articles</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Zoom: {viewerState.zoom}%</span>
            {viewerState.rotation > 0 && <span>Rotation: {viewerState.rotation}°</span>}
            <span>Mode: {viewerState.viewMode}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
