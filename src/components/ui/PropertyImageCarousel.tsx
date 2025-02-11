import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface PropertyImageCarouselProps {
  media: {
    src: string;
    type: "image";
  }[];
}

const PropertyImageCarousel = ({ media }: PropertyImageCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [dotStartIndex, setDotStartIndex] = React.useState(0);
  const DOTS_PER_PAGE = 5;

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    const newIndex = emblaApi.selectedScrollSnap();
    setSelectedIndex(newIndex);
    
    const currentDotPage = Math.floor(dotStartIndex / DOTS_PER_PAGE);
    const newDotPage = Math.floor(newIndex / DOTS_PER_PAGE);
    
    if (currentDotPage !== newDotPage) {
      setDotStartIndex(newDotPage * DOTS_PER_PAGE);
    }
  }, [emblaApi, dotStartIndex]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!media.length) {
    return (
      <div className="relative aspect-[4/3] w-full bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm text-gray-400">Sem imagens disponíveis</span>
        </div>
      </div>
    );
  }

  const visibleDots = Math.min(DOTS_PER_PAGE, media.length - dotStartIndex);
  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden">
      <div className="absolute inset-0 z-10 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full touch-pan-y">
          {media.map((item, index) => (
            <div key={index} className="relative min-w-full flex-[0_0_100%] h-full">
              <Image
                src={item.src}
                alt="Imagem do imóvel"
                layout="fill"
                objectFit="cover"
                className="rounded-t-xl"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-2 sm:left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-1.5 sm:p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-2 sm:right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-1.5 sm:p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white"
        aria-label="Next image"
      >
        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
      </button>

      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1">
        {media.length > DOTS_PER_PAGE && dotStartIndex > 0 && (
          <button
            onClick={() => setDotStartIndex(Math.max(0, dotStartIndex - DOTS_PER_PAGE))}
            className="group relative p-1.5 transition-all"
            aria-label="Previous dots page"
          >
            <span className="block h-1.5 w-1.5 rounded-full transition-all bg-white/40 scale-75 group-hover:scale-100 group-hover:bg-white/60" />
          </button>
        )}
        
        {Array.from({ length: visibleDots }, (_, index) => {
          const actualIndex = dotStartIndex + index;
          return (
            <button
              key={actualIndex}
              className={`group relative p-1.5 transition-all ${
                selectedIndex === actualIndex ? 'scale-110' : ''
              }`}
              aria-label={`Go to slide ${actualIndex + 1}`}
              onClick={() => emblaApi?.scrollTo(actualIndex)}
            >
              <span className={`block h-1.5 w-1.5 rounded-full transition-all ${
                selectedIndex === actualIndex 
                  ? 'bg-primary scale-100' 
                  : 'bg-white/40 scale-75 group-hover:scale-100 group-hover:bg-white/60'
              }`} />
            </button>
          );
        })}

        {media.length > DOTS_PER_PAGE && dotStartIndex + DOTS_PER_PAGE < media.length && (
          <button
            onClick={() => setDotStartIndex(Math.min(media.length - DOTS_PER_PAGE, dotStartIndex + DOTS_PER_PAGE))}
            className="group relative p-1.5 transition-all"
            aria-label="Next dots page"
          >
            <span className="block h-1.5 w-1.5 rounded-full transition-all bg-white/40 scale-75 group-hover:scale-100 group-hover:bg-white/60" />
          </button>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
};

export default PropertyImageCarousel;