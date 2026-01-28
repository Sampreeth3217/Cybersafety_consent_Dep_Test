import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CybercrimeDetailPage.css';

/**
 * CybercrimeDetailPage Component
 * Displays all cybercrime categories with collapsible cards
 */
const CybercrimeDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedCard, setExpandedCard] = useState(null);

  // Expand selected category and scroll to it when component mounts
  useEffect(() => {
    // Check for category parameter in URL
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    
    if (categoryParam) {
      setExpandedCard(categoryParam);
      
      // Scroll to the category above the selected one after a short delay to ensure DOM is updated
      setTimeout(() => {
        const categoryIds = ['cryptocurrency', 'cyber-terrorism', 'hacking', 'social-media', 'financial-fraud', 'explicit-material', 'ransomware', 'child-abuse'];
        const selectedIndex = categoryIds.indexOf(categoryParam);
        
        if (selectedIndex > 0) {
          // Scroll to the previous category
          const previousCategoryId = categoryIds[selectedIndex - 1];
          const previousElement = document.getElementById(`category-${previousCategoryId}`);
          if (previousElement) {
            previousElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start',
              inline: 'nearest'
            });
          }
        } else {
          // If it's the first category, scroll to the page title
          const titleElement = document.querySelector('.cybercrime-detail-page__title');
          if (titleElement) {
            titleElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start',
              inline: 'nearest'
            });
          }
        }
      }, 100);
    } else {
      // Only scroll to top if no specific category is selected
      window.scrollTo(0, 0);
    }
  }, [location.search]);

  const categoriesData = [
    {
      id: 'cryptocurrency',
      title: 'Cryptocurrency Crime',
      sections: [
        {
          subtitle: 'Cryptojacking',
          content: 'Cryptojacking is a type of cybercrime where a criminal secretly uses a victim\'s computing power to generate cryptocurrency.',
          image: '/cryptocurrency-crime.jpg'
        },
        {
          subtitle: 'Crypto Mining & Cloud Mining Scams',
          content: 'Cryptocurrency-mining malware steal the resources of infected machines, significantly affecting their performance, power consumption and increasing their wear and tear.'
        },
        {
          subtitle: 'Cryptocurrency Investment Frauds',
          content: 'Fraudulent opportunity to invest in a cryptocurrency with guaranteed high returns e.g. "pump and dump" scams, giveaway scams, etc.'
        }
      ]
    },
    {
      id: 'cyber-terrorism',
      title: 'Cyber Terrorism',
      sections: [
        {
          subtitle: 'Digital Infrastructure Attacks',
          content: 'Coordinated attacks on critical digital infrastructure including power grids, financial systems, and government networks.'
        },
        {
          subtitle: 'Information Warfare',
          content: 'Systematic campaigns to spread misinformation, create social unrest, and undermine democratic processes through digital platforms.'
        }
      ]
    },
    {
      id: 'hacking',
      title: 'Hacking / Damage to Computer Systems',
      sections: [
        {
          subtitle: 'System Intrusion',
          content: 'Unauthorized access to computer systems, networks, and databases with intent to steal data or disrupt operations.'
        },
        {
          subtitle: 'Data Breaches',
          content: 'Large-scale theft of personal, financial, or confidential information from organizations and individuals.'
        }
      ]
    },
    {
      id: 'social-media',
      title: 'Online and Social Media Related Crime',
      sections: [
        {
          subtitle: 'Cyberbullying',
          content: 'Harassment, intimidation, and threats made through social media platforms and online communications.'
        },
        {
          subtitle: 'Identity Theft',
          content: 'Stealing personal information from social media profiles to impersonate individuals for fraudulent purposes.'
        }
      ]
    },
    {
      id: 'financial-fraud',
      title: 'Online Financial Fraud',
      sections: [
        {
          subtitle: 'Phishing Scams',
          content: 'Fraudulent attempts to obtain sensitive financial information through deceptive emails, websites, and messages.'
        },
        {
          subtitle: 'Credit Card Fraud',
          content: 'Unauthorized use of credit card information for online purchases and financial transactions.'
        }
      ]
    },
    {
      id: 'explicit-material',
      title: 'Publishing / Transmitting of Explicit Material in Electronic Form',
      sections: [
        {
          subtitle: 'Distribution of Obscene Content',
          content: 'Illegal distribution of explicit and obscene materials through electronic means and digital platforms.'
        },
        {
          subtitle: 'Non-consensual Sharing',
          content: 'Sharing intimate images or videos without consent, also known as revenge porn or image-based abuse.'
        }
      ]
    },
    {
      id: 'ransomware',
      title: 'Ransomware',
      sections: [
        {
          subtitle: 'File Encryption Attacks',
          content: 'Malicious software that encrypts victim\'s files and demands payment for decryption keys.'
        },
        {
          subtitle: 'System Lockout',
          content: 'Complete system lockdown preventing access to computers and networks until ransom is paid.'
        }
      ]
    },
    {
      id: 'child-abuse',
      title: 'Child Pornography / Child Sexual Abuse Material (CSAM)',
      sections: [
        {
          subtitle: 'Online Exploitation',
          content: 'Production, distribution, and possession of child sexual abuse material through digital platforms.'
        },
        {
          subtitle: 'Grooming and Predation',
          content: 'Online predators targeting minors through social media, gaming platforms, and chat applications.'
        }
      ]
    }
  ];

  const toggleCard = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className="cybercrime-detail-page">
      {/* Header */}
      <header className="cybercrime-detail-page__header-bar">
        <div className="cybercrime-detail-page__header-content">
          <div className="cybercrime-detail-page__logo">
            <div className="cybercrime-detail-page__logo-icon">
              <img src="/ap-police-logo.png" alt="AP Police Logo" />
            </div>
            <div className="cybercrime-detail-page__logo-text">
              <div className="cybercrime-detail-page__logo-title">NTR Police Commissionerate, Vijayawada, Andhra Pradesh, India</div>
              <div className="cybercrime-detail-page__logo-subtitle">CYBERCRIME AWARENESS AND PREVENTION PORTAL</div>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="cybercrime-detail-page__breadcrumb">
        <div className="cybercrime-detail-page__breadcrumb-container">
          <span className="cybercrime-detail-page__breadcrumb-item" onClick={() => navigate('/')}>
            Home
          </span>
          <span className="cybercrime-detail-page__breadcrumb-separator">›</span>
          <span className="cybercrime-detail-page__breadcrumb-item cybercrime-detail-page__breadcrumb-item--active">
            Cybercrime categories
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="cybercrime-detail-page__main">
        <div className="cybercrime-detail-page__container">
          <div className="cybercrime-detail-page__header">
            <h1 className="cybercrime-detail-page__title">CYBERCRIME CATEGORIES</h1>
            <p className="cybercrime-detail-page__subtitle">Click on any category to learn more about different types of cybercrimes</p>
          </div>

          <div className="cybercrime-detail-page__categories">
            {categoriesData.map((category) => (
              <div key={category.id} id={`category-${category.id}`} className="cybercrime-detail-page__category-card">
                <div 
                  className="cybercrime-detail-page__category-header"
                  onClick={() => toggleCard(category.id)}
                >
                  <h3 className="cybercrime-detail-page__category-title">{category.title}</h3>
                  <div className={`cybercrime-detail-page__arrow ${expandedCard === category.id ? 'expanded' : ''}`}>
                    ▼
                  </div>
                </div>
                
                {expandedCard === category.id && (
                  <div className="cybercrime-detail-page__category-content">
                    {category.sections.map((section, index) => (
                      <div key={index} className="cybercrime-detail-page__section">
                        <div className="cybercrime-detail-page__section-content">
                          <div className="cybercrime-detail-page__section-text">
                            <h4 className="cybercrime-detail-page__section-subtitle">{section.subtitle}</h4>
                            <p className="cybercrime-detail-page__section-description">{section.content}</p>
                          </div>
                          {section.image && (
                            <div className="cybercrime-detail-page__section-image">
                              <img 
                                src={section.image} 
                                alt={section.subtitle}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'block';
                                }}
                              />
                              <div className="cybercrime-detail-page__image-fallback" style={{ display: 'none' }}>
                                🔒
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="cybercrime-detail-page__actions">
            <button 
              className="cybercrime-detail-page__report-btn"
              onClick={() => window.open('https://cybercrime.gov.in/', '_blank')}
            >
              Report Cybercrime
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="cybercrime-detail-page__footer">
        <p>© 2025 NTR Police Commissionerate, Vijayawada, Andhra Pradesh, India — CYBERCRIME AWARENESS AND PREVENTION PORTAL</p>
      </footer>
    </div>
  );
};

export default CybercrimeDetailPage;