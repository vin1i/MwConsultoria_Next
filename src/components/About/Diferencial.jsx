import React, { useState, useEffect, useRef } from "react";
import { Container, TextContainer, Text, Logo, TransitionLine, LogoTop } from "./DiferencialStyles";

const Diferencial = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <Container ref={containerRef} $background="/images/Faixa.png">
      <TextContainer>
        <LogoTop src="/images/MarisaWebberLogo2.png" alt="Logo da MW Consultoria" />
        <TransitionLine $isVisible={isVisible} />
        <Text>
          <p>
            Nosso diferencial está no atendimento único e dedicado. Cada cliente
            tem uma história, e nós temos o compromisso de conhecê-la.
            Entendemos suas necessidades, expectativas e, mais importante, seu
            sonho. Seja compra, venda ou investimento, nós oferecemos uma
            consultoria completa para garantir que cada decisão seja a melhor
            para você.
          </p>
          <p>
            Na MW Consultoria, seu sucesso é a nossa prioridade. Estamos aqui
            para oferecer suporte e transformar o mercado imobiliário em uma
            experiência tranquila e segura. Confie em nós para fazer do seu
            sonho, uma realidade.
          </p>
          {/* <Logo src="/images/MarisaWebberLogo2.png" alt="Logo da MW Consultoria" /> */}
        </Text>
      </TextContainer>
    </Container>
  );
};

export default Diferencial;
