import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyImageCarouselProps {
  media: {
    src: string; // URL da imagem já formatada com o ID do Cloudinary
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

  // Limita os dots a 5
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
                  backgroundImage: `url(${item.src})`, // Usando a URL correta da imagem
                  backgroundSize: 'cover',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navegação */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white"
        aria-label="Next image"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {Array.from({ length: visibleDots }, (_, index) => (
          <button
            key={index}
            className={`h-1.5 w-1.5 rounded-full bg-white/50 transition-all ${selectedIndex === index ? 'w-3 bg-white' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>

      {/* Sobreposição de gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
};

export default PropertyImageCarousel;
