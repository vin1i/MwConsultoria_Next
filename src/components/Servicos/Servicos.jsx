import React, { useEffect, useRef, useState } from "react";
import {
  ServicosContainer,
  ServicoCard,
  Image,
  Text,
  WhatsAppButton,
  TituloServicos,
} from "./ServicosStyles";
import { FaWhatsapp } from "react-icons/fa";

const Servicos = () => {
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTitleVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, [titleRef]);

  return (
    <div style={{ backgroundColor: "var(--grey)" }}>
      <TituloServicos ref={titleRef} $isVisible={isTitleVisible}>
        <h1>SERVIÇOS</h1>
      </TituloServicos>
      <ServicosContainer>
        <ServicoCard>
          <Image src="/images/Serviços01.png" alt="Serviço 1" />
          <Text>
            <h3>Avaliação de Preço de Imóveis</h3>
            <p>
              Com um profundo conhecimento do mercado, oferecemos avaliações
              precisas e atualizadas para garantir que você tenha total
              confiança no valor do seu imóvel, seja para compra ou venda.
            </p>
          </Text>
        </ServicoCard>
        <ServicoCard>
          <Image src="/images/Serviços04.png" alt="Serviço 4" />
          <Text>
            <h3>Assessoria em Compra e Venda</h3>
            <p>
              Nossa equipe oferece suporte completo em todas as etapas da compra
              e venda de imóveis, com uma abordagem transparente e focada no seu
              sucesso.
            </p>
          </Text>
        </ServicoCard>
        <ServicoCard>
          <Image src="/images/Serviços02.png" alt="Serviço 2" />
          <Text>
            <h3>Consultoria de Investimentos Imobiliários</h3>
            <p>
              Planeje seu futuro com nossas estratégias de investimento
              imobiliário, baseadas em uma análise detalhada das melhores
              oportunidades no mercado.
            </p>
          </Text>
        </ServicoCard>
        <ServicoCard>
          <Image src="/images/Serviços05.png" alt="Serviço 5" />
          <Text>
            <h3>Tecnologia e Ferramentas Digitais</h3>
            <p>
              Utilizamos plataformas avançadas para busca de imóveis, realidade
              virtual para visitas online e análise de dados de mercado para
              oferecer soluções inovadoras e precisas.
            </p>
          </Text>
        </ServicoCard>
        <ServicoCard>
          <Image src="/images/Serviços03.png" alt="Serviço 3" />
          <Text>
            <h3>Marketing Imobiliário Inovador</h3>
            <p>
              Oferecemos campanhas de marketing direcionadas, com o uso
              estratégico de redes sociais e SEO, para garantir que seu imóvel
              tenha a melhor visibilidade e atraia compradores qualificados.
            </p>
          </Text>
        </ServicoCard>
        <ServicoCard>
          <Image src="/images/Serviços06.png" alt="Serviço 6" />
          <Text>
            <h3>Apoio Pós-Venda</h3>
            <p>
              Nossa relação não termina na transação. Oferecemos suporte contínuo
              com questões relacionadas à mudança, reformas e qualquer outra
              necessidade após a compra ou venda do seu imóvel.
            </p>
          </Text>
        </ServicoCard>
        <div
          className="duvidas-text"
          style={{
            fontSize: "1rem",
            margin: "0",
            padding: "0 0px",
            maxWidth: "550px",
          }}
        >
          <h3>Dúvidas sobre compra ou venda de imóveis?</h3>
          <p>
            Nossa equipe está pronta para ajudar. Solicite uma consultoria e
            comece a planejar o seu próximo passo com confiança.
          </p>
        </div>
        <WhatsAppButton
          href="https://api.whatsapp.com/send?phone=5511973738808"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fale conosco!
          <FaWhatsapp style={{ color: "white", fontSize: "25px" }} />
        </WhatsAppButton>
      </ServicosContainer>
    </div>
  );
};

export default Servicos;
