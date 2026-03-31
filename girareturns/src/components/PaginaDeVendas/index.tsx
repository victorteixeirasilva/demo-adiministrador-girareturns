'use client'
// pages/index.tsx
import React, { useState } from 'react';
import styles from './LandingPage.module.scss';
import { PopUpPath } from '../CardLogin';
import { useRouter } from "next/navigation";
import { LINK_SUPORTE_DEMO } from "@/variaveis";


const LandingPage: React.FC = () => {
  const abrirSuporteDemo = () => {
      window.open(LINK_SUPORTE_DEMO, '_blank', 'noopener,noreferrer');
  }

  const [entrar, setEntrar] = useState(false);

  const router = useRouter();

  return (
    <>
    {!entrar && (
      <div className={styles.landing}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.container}>
            <h1 className={styles.logo}>Giraê</h1>
            <button className={styles.headerCta} onClick={() => router.push("/login")}>Entrar</button>
          </div>
        </header>

        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroBackground}>
            <div className={styles.circle1}></div>
            <div className={styles.circle2}></div>
          </div>
          
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <div className={styles.heroText}>
                <h2 className={styles.heroTitle}>
                  Transforme sua Operação
                  <br />
                  de Economia Circular
                </h2>
                <p className={styles.heroSubtitle}>
                  Software completo para precificação inteligente,
                  <br />
                  gestão de remessas e controle de outlets
                </p>
                <div className={styles.heroActions}>
                  <button type="button" onClick={abrirSuporteDemo} className={styles.primaryBtn}>
                    Solicitar Orçamento
                  </button>
                  <span className={styles.pricing}>
                    Investimento: a partir de R$ 4.000
                  </span>
                </div>
              </div>
              
              <div className={styles.heroImage}>
                <div className={styles.dashboardPreview}>
                  <div className={styles.dashboardHeader}>
                    <div className={styles.windowControls}>
                      <span className={styles.controlRed}></span>
                      <span className={styles.controlYellow}></span>
                      <span className={styles.controlGreen}></span>
                    </div>
                  </div>
                  <div className={styles.dashboardContent}>
                    <div className={styles.chart}>
                      <div className={`${styles.bar} ${styles.bar1}`}></div>
                      <div className={`${styles.bar} ${styles.bar2}`}></div>
                      <div className={`${styles.bar} ${styles.bar3}`}></div>
                    </div>
                    <p className={styles.chartLabel}>Análise de Precificação</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={styles.stats}>
          <div className={styles.container}>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <h3 className={styles.statNumber}>+150%</h3>
                <p className={styles.statLabel}>
                  Aumento médio
                  <br />
                  na eficiência
                </p>
              </div>
              <div className={styles.statCard}>
                <h3 className={styles.statNumber}>98%</h3>
                <p className={styles.statLabel}>
                  Precisão na
                  <br />
                  precificação
                </p>
              </div>
              <div className={styles.statCard}>
                <h3 className={styles.statNumber}>-40%</h3>
                <p className={styles.statLabel}>
                  Redução no
                  <br />
                  tempo operacional
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.features}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Funcionalidades Completas</h2>
            
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>₿</div>
                <h3 className={styles.featureTitle}>
                  Precificação
                  <br />
                  Inteligente
                </h3>
                <ul className={styles.featureList}>
                  <li>Algoritmos de precificação</li>
                  <li>Análise de margem em tempo real</li>
                  <li>Sugestões automáticas</li>
                  <li>Relatórios de performance</li>
                </ul>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>📦</div>
                <h3 className={styles.featureTitle}>
                  Gestão de
                  <br />
                  Remessas
                </h3>
                <ul className={styles.featureList}>
                  <li>Controle total de envios</li>
                  <li>Rastreamento de produtos</li>
                  <li>Gestão de outlets</li>
                  <li>Histórico completo</li>
                </ul>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>📊</div>
                <h3 className={styles.featureTitle}>
                  Dashboards &
                  <br />
                  Relatórios
                </h3>
                <ul className={styles.featureList}>
                  <li>Visualizações em tempo real</li>
                  <li>KPIs personalizados</li>
                  <li>Exportação de dados</li>
                  <li>Análises preditivas</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className={styles.process}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Como Funciona</h2>
            
            <div className={styles.processSteps}>
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>1</div>
                <p className={styles.stepLabel}>
                  Cadastro de
                  <br />
                  Produtos
                </p>
              </div>
              
              <div className={styles.stepConnector}></div>
              
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>2</div>
                <p className={styles.stepLabel}>
                  Precificação
                  <br />
                  Automática
                </p>
              </div>
              
              <div className={styles.stepConnector}></div>
              
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>3</div>
                <p className={styles.stepLabel}>
                  Gestão de
                  <br />
                  Remessas
                </p>
              </div>
              
              <div className={styles.stepConnector}></div>
              
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>4</div>
                <p className={styles.stepLabel}>
                  Relatórios &
                  <br />
                  Insights
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className={styles.benefits}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Por que escolher a Giraê?</h2>
            
            <ul className={styles.benefitsList}>
              <li className={styles.benefitItem}>
                <span className={styles.benefitIcon}></span>
                Economia Circular na prática: reduza desperdício e maximize valor
              </li>
              <li className={styles.benefitItem}>
                <span className={styles.benefitIcon}></span>
                Precificação inteligente: algoritmos que otimizam sua margem
              </li>
              <li className={styles.benefitItem}>
                <span className={styles.benefitIcon}></span>
                Controle total: gerencie toda operação em um único lugar
              </li>
              <li className={styles.benefitItem}>
                <span className={styles.benefitIcon}></span>
                Decisões baseadas em dados: relatórios e dashboards em tempo real
              </li>
            </ul>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.cta}>
          <div className={styles.container}>
            <div className={styles.ctaCard}>
              <h2 className={styles.ctaTitle}>
                Pronto para transformar
                <br />
                sua operação?
              </h2>
              <p className={styles.ctaSubtitle}>
                Solicite um orçamento e descubra como podemos
                <br />
                otimizar sua gestão de economia circular
              </p>
              <button type="button" onClick={abrirSuporteDemo} className={styles.ctaBtn}>
                Solicitar Orçamento Agora
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.container}>
            <h3 className={styles.footerLogo}>Giraê</h3>
            <p className={styles.footerTagline}>Soluções em Economia Circular</p>
            <p className={styles.footerContact}>
              Dados de contato fictícios — substitua na sua versão do portfólio
            </p>
          </div>
        </footer>
      </div>
    )}
    </>
  );
};

export default LandingPage;