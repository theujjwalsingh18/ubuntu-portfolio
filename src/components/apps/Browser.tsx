"use client";
import { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Home, 
  RefreshCw, 
  AlertTriangle, 
  ExternalLink,
  Lock,
  Unlock,
  Globe,
  Shield
} from 'lucide-react';


const BLOCKED_DOMAINS = [
  'instagram.com',
  'facebook.com',
  'youtube.com',
  'twitter.com',
  'linkedin.com',
  'netflix.com',
  'whatsapp.com'
];

const PROXY_SERVER = '/api/proxy';

export function Browser() {
  const [currentUrl, setCurrentUrl] = useState('about:blank');
  const [displayUrl, setDisplayUrl] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [securityInfo, setSecurityInfo] = useState<{isSecure: boolean, origin: string}>({isSecure: false, origin: ''});
  const [isBlockedSite, setIsBlockedSite] = useState(false);
  const [useProxy, setUseProxy] = useState(true);
  const [isTabActive, setIsTabActive] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const homeUrl = 'https://www.google.com/webhp?igu=1';


  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
      
     if (!document.hidden && iframeRef.current) {
        try {
          const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
          if (!iframeDoc || iframeDoc.readyState === 'complete') {
            return;
          }
        } catch (e) {
          return;
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleVisibilityChange);
    window.addEventListener('blur', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleVisibilityChange);
      window.removeEventListener('blur', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    navigateTo(homeUrl);
  }, []);

  const checkIfBlocked = (url: string): boolean => {
    try {
      const domain = new URL(url).hostname.toLowerCase();
      return BLOCKED_DOMAINS.some(blocked => domain.includes(blocked));
    } catch {
      return false;
    }
  };

  const getIframeUrl = (url: string): string => {
    if (useProxy && url !== 'about:blank' && checkIfBlocked(url)) {
      return `${PROXY_SERVER}/${encodeURIComponent(url)}`;
    }
    return url;
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    setLoadError(null);
    
    try {
      if (iframeRef.current) {
        let actualUrl = displayUrl;
        if (useProxy && iframeRef.current.src.includes('/api/proxy/')) {
          actualUrl = displayUrl;
        }
        
        const urlObj = new URL(actualUrl);
        setSecurityInfo({
          isSecure: urlObj.protocol === 'https:',
          origin: urlObj.hostname
        });
        setIsBlockedSite(checkIfBlocked(actualUrl));
      }
    } catch (e) {
      console.error('Error parsing URL:', e);
    }
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setLoadError('Failed to load the webpage');
  };

  const navigateTo = (url: string) => {
    setIsLoading(true);
    setLoadError(null);
    
    let finalUrl = url;
    if (!/^https?:\/\//i.test(url) && url !== 'about:blank') {
      try {
        new URL('https://' + url);
        finalUrl = 'https://' + url;
      } catch (e) {
        finalUrl = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
      }
    }

    setDisplayUrl(finalUrl);
    
    const iframeUrl = getIframeUrl(finalUrl);
    setCurrentUrl(iframeUrl);

    const newHistory = history.slice(0, historyIndex + 1);
    if (newHistory[newHistory.length - 1] !== finalUrl) {
      newHistory.push(finalUrl);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUrl = formData.get('url') as string;
    navigateTo(newUrl);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setIsLoading(true);
      const newIndex = historyIndex - 1;
      const newUrl = history[newIndex];
      setHistoryIndex(newIndex);
      setDisplayUrl(newUrl);
      const iframeUrl = getIframeUrl(newUrl);
      setCurrentUrl(iframeUrl);
      
      setIsBlockedSite(checkIfBlocked(newUrl));
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setIsLoading(true);
      const newIndex = historyIndex + 1;
      const newUrl = history[newIndex];
      setHistoryIndex(newIndex);
      setDisplayUrl(newUrl);
      const iframeUrl = getIframeUrl(newUrl);
      setCurrentUrl(iframeUrl);
      
      setIsBlockedSite(checkIfBlocked(newUrl));
    }
  };

  const refresh = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      const scrollX = iframeRef.current.contentWindow?.scrollX || 0;
      const scrollY = iframeRef.current.contentWindow?.scrollY || 0;
      
      iframeRef.current.src = iframeRef.current.src;
      
      setTimeout(() => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
          iframeRef.current.contentWindow.scrollTo(scrollX, scrollY);
        }
      }, 100);
    }
  };

  const goHome = () => {
    navigateTo(homeUrl);
  };

  const openInNewTab = () => {
    window.open(displayUrl, '_blank');
  };

  const toggleProxy = () => {
    setUseProxy(!useProxy);
    setIsLoading(true);
    const iframeUrl = getIframeUrl(displayUrl);
    setCurrentUrl(iframeUrl);
  };
  const renderBlockedSiteMessage = () => {
    if (!isBlockedSite) return null;
    
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-background/90 z-10 p-4">
        <div className="text-center max-w-md bg-white rounded-lg shadow-lg p-6">
          <AlertTriangle className="mx-auto mb-4 text-amber-500" size={32} />
          <h3 className="text-lg font-semibold mb-2">Embedding Restricted</h3>
          <p className="text-muted-foreground mb-4">
            This website prevents itself from being embedded in other sites for security reasons.
          </p>
          
          <div className="mb-4 p-3 bg-amber-50 rounded-md">
            <p className="text-sm text-amber-800 mb-2">
              Proxy mode is {useProxy ? 'enabled' : 'disabled'}:
            </p>
            <button
              onClick={toggleProxy}
              className={`px-3 py-1 rounded text-sm ${
                useProxy 
                  ? 'bg-green-500 text-white' 
                  : 'bg-amber-500 text-white'
              }`}
            >
              {useProxy ? 'Proxy Enabled' : 'Enable Proxy'}
            </button>
            <p className="text-xs text-amber-600 mt-2">
              {useProxy 
                ? 'The proxy is trying to bypass embedding restrictions.' 
                : 'Enable the proxy to try bypassing embedding restrictions.'}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <button
              onClick={openInNewTab}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink size={16} />
              Open in New Tab
            </button>
            <button
              onClick={goHome}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      <div className="flex flex-col sm:flex-row items-center p-1 sm:p-2 bg-secondary border-b border-border gap-1 sm:gap-2">
        <div className="flex items-center gap-1 sm:gap-0">
          <button 
            onClick={goBack} 
            disabled={historyIndex <= 0} 
            className="p-1 sm:p-1.5 disabled:opacity-30 hover:bg-accent rounded transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={16} className="sm:w-4 sm:h-4" />
          </button>
          <button 
            onClick={goForward} 
            disabled={historyIndex >= history.length - 1} 
            className="p-1 sm:p-1.5 disabled:opacity-30 hover:bg-accent rounded transition-colors"
            aria-label="Go forward"
          >
            <ArrowRight size={16} className="sm:w-4 sm:h-4" />
          </button>
          <button 
            onClick={refresh} 
            className="p-1 sm:p-1.5 hover:bg-accent rounded transition-colors"
            aria-label="Refresh"
          >
            <RefreshCw size={16} className={`sm:w-4 sm:h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={goHome} 
            className="p-1 sm:p-1.5 hover:bg-accent rounded transition-colors"
            aria-label="Go home"
          >
            <Home size={16} className="sm:w-4 sm:h-4" />
          </button>
        </div>
          <form onSubmit={handleUrlSubmit} className="flex-grow w-full sm:w-auto sm:ml-2 flex items-center">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              {securityInfo.isSecure ? (
                <Lock size={14} className="text-green-500" />
              ) : currentUrl !== 'about:blank' ? (
                <Unlock size={14} className="text-amber-500" />
              ) : (
                <Globe size={14} className="text-gray-400" />
              )}
            </div>
            <input 
              name="url" 
              type="text" 
              value={displayUrl} 
              onChange={(e) => setDisplayUrl(e.target.value)} 
              className="w-full h-7 sm:h-8 bg-background font-code text-xs sm:text-sm pl-7 pr-8 border rounded-md"
              placeholder="Search Google or enter address"
            />
            {isLoading && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-foreground"></div>
              </div>
            )}
          </div>
        </form>
        <div className="flex items-center gap-1">
          {useProxy && (
            <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded flex items-center gap-1">
              <Shield size={12} />
              Proxy
            </div>
          )}
          <button 
            onClick={openInNewTab}
            className="p-1 sm:p-1.5 hover:bg-accent rounded transition-colors"
            aria-label="Open in new tab"
          >
            <ExternalLink size={16} className="sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
      {isLoading && (
        <div className="h-1 w-full bg-muted overflow-hidden">
          <div className="h-full bg-primary animate-progress"></div>
        </div>
      )}
      {loadError && (
        <div className="p-2 bg-destructive/10 text-destructive-foreground text-sm flex items-center gap-2">
          <AlertTriangle size={16} />
          <span>{loadError}</span>
        </div>
      )}
      {!isTabActive && (
        <div className="p-1 bg-amber-100 text-amber-800 text-xs text-center">
          Tab is inactive - content preservation active
        </div>
      )}
      <div className="relative flex-grow">
        <iframe
          ref={iframeRef}
          src={currentUrl}
          className="w-full h-full border-0"
          sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-presentation"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ visibility: isTabActive ? 'visible' : 'hidden' }}
        />
        {renderBlockedSiteMessage()}
      </div>
    </div>
  );
}