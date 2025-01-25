import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyImageCarouselProps {
  media: {
    src: string;
    type: "image";
  }[];
}

const PropertyImageCarousel = ({ media }: PropertyImageCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

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
      <div className="relative h-[240px] w-full bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm text-gray-400">Sem imagens disponíveis</span>
        </div>
      </div>
    );
  }

  const visibleDots = Math.min(8, media.length);

  return (
    <div className="relative h-[240px] w-full overflow-hidden rounded-sm">
      <div className="absolute inset-0 z-10 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full touch-pan-y">
          {media.map((item, index) => (
            <div key={index} className="relative h-full min-w-full flex-[0_0_100%]">
              <div
                className="relative h-full min-w-full flex-[0_0_100%] bg-cover"
                style={{
                  backgroundImage: `url(${item.src})`,
                  backgroundSize: 'cover',
                }}
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

      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1 sm:gap-2">
        {Array.from({ length: visibleDots }, (_, index) => (
          <button
            key={index}
            className={`h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full transition-all ${
              selectedIndex === index ? 'w-2 sm:w-3 bg-primary' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
};

export default PropertyImageCarousel;
