import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CybercrimeCategoryPage.css';

/**
 * CybercrimeCategoryPage Component
 * Displays detailed information for a specific cybercrime category
 */
const CybercrimeCategoryPage = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to top on page load and handle scroll button visibility
  useEffect(() => {
    // Scroll to top instantly when component mounts or category changes
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [category]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Category data
  const categoriesData = {
    'cryptocurrency': {
      title: 'Cryptocurrency Crime',
      sections: [
        {
          subtitle: 'Cryptojacking',
          content: 'Cryptojacking is a type of cybercrime where a criminal secretly uses a victim\'s computing power to generate cryptocurrency. Attackers install mining software on computers without the owner\'s knowledge, causing performance degradation, increased electricity bills, and hardware damage.',
          prevention: [
            'Keep your antivirus software updated',
            'Monitor CPU usage regularly',
            'Use ad blockers to prevent malicious scripts',
            'Be cautious when downloading software'
          ]
        },
        {
          subtitle: 'Crypto Mining & Cloud Mining Scams',
          content: 'Cryptocurrency-mining malware steal the resources of infected machines, significantly affecting their performance, power consumption and increasing their wear and tear. Scammers also create fake cloud mining services promising high returns.',
          prevention: [
            'Research mining services thoroughly',
            'Verify company credentials and licenses',
            'Avoid promises of guaranteed high returns',
            'Use reputable antimalware protection'
          ]
        },
        {
          subtitle: 'Cryptocurrency Investment Frauds',
          content: 'Fraudulent opportunity to invest in a cryptocurrency with guaranteed high returns. Common schemes include "pump and dump" scams, fake ICOs, giveaway scams, and Ponzi schemes using cryptocurrency.',
          prevention: [
            'Never invest based on social media tips',
            'Research any investment thoroughly',
            'Be skeptical of guaranteed returns',
            'Use only reputable cryptocurrency exchanges'
          ]
        }
      ]
    },
    'cyber-terrorism': {
      title: 'Cyber Terrorism',
      sections: [
        {
          subtitle: 'Digital Infrastructure Attacks',
          content: 'Coordinated attacks on critical digital infrastructure including power grids, financial systems, government networks, and essential services. These attacks can cause widespread disruption and threaten national security.',
          prevention: [
            'Support robust cybersecurity policies',
            'Report suspicious activities to authorities',
            'Keep personal devices secure',
            'Stay informed about cyber threats'
          ]
        },
        {
          subtitle: 'Information Warfare',
          content: 'Systematic campaigns to spread misinformation, create social unrest, and undermine democratic processes through digital platforms. This includes fake news, propaganda, and manipulation of public opinion.',
          prevention: [
            'Verify information from multiple sources',
            'Be critical of sensational news',
            'Report misinformation to platforms',
            'Educate others about information literacy'
          ]
        }
      ]
    },
    'hacking': {
      title: 'Hacking / Damage to Computer Systems',
      sections: [
        {
          subtitle: 'System Intrusion',
          content: 'Unauthorized access to computer systems, networks, and databases with intent to steal data, disrupt operations, or cause damage. Hackers use various techniques including password attacks, malware, and social engineering.',
          prevention: [
            'Use strong, unique passwords',
            'Enable two-factor authentication',
            'Keep software and systems updated',
            'Install reliable security software'
          ]
        },
        {
          subtitle: 'Data Breaches',
          content: 'Large-scale theft of personal, financial, or confidential information from organizations and individuals. Data breaches can lead to identity theft, financial fraud, and privacy violations.',
          prevention: [
            'Limit personal information sharing online',
            'Monitor your accounts regularly',
            'Use identity monitoring services',
            'Respond quickly to breach notifications'
          ]
        }
      ]
    },
    'social-media': {
      title: 'Online and Social Media Related Crime',
      sections: [
        {
          subtitle: 'Cyberbullying',
          content: 'Harassment, intimidation, and threats made through social media platforms and online communications. This can include trolling, doxxing, and sustained campaigns of abuse that cause psychological harm.',
          prevention: [
            'Block and report abusive users',
            'Don\'t engage with trolls or bullies',
            'Keep evidence of harassment',
            'Seek support from friends, family, or counselors'
          ]
        },
        {
          subtitle: 'Identity Theft',
          content: 'Stealing personal information from social media profiles to impersonate individuals for fraudulent purposes. Criminals create fake profiles or take over existing accounts to deceive others.',
          prevention: [
            'Review privacy settings regularly',
            'Be selective about friend requests',
            'Don\'t share sensitive personal information',
            'Verify suspicious messages from friends'
          ]
        }
      ]
    },
    'financial-fraud': {
      title: 'Online Financial Fraud',
      sections: [
        {
          subtitle: 'Phishing Scams',
          content: 'Fraudulent attempts to obtain sensitive financial information through deceptive emails, websites, and messages. Scammers impersonate banks, credit card companies, and other financial institutions.',
          prevention: [
            'Never click links in suspicious emails',
            'Verify communications by calling directly',
            'Type URLs manually instead of clicking',
            'Check for HTTPS and site certificates'
          ]
        },
        {
          subtitle: 'Credit Card Fraud',
          content: 'Unauthorized use of credit card information for online purchases and financial transactions. This includes card skimming, data theft, and fraudulent online transactions.',
          prevention: [
            'Monitor statements regularly',
            'Use secure payment methods online',
            'Cover your PIN when entering it',
            'Report lost or stolen cards immediately'
          ]
        }
      ]
    },
    'explicit-material': {
      title: 'Publishing / Transmitting of Explicit Material',
      sections: [
        {
          subtitle: 'Distribution of Obscene Content',
          content: 'Illegal distribution of explicit and obscene materials through electronic means and digital platforms. This violates decency laws and can harm viewers, especially minors.',
          prevention: [
            'Use parental controls on devices',
            'Report illegal content to authorities',
            'Educate children about online safety',
            'Use content filtering software'
          ]
        },
        {
          subtitle: 'Non-consensual Sharing',
          content: 'Sharing intimate images or videos without consent, also known as revenge porn or image-based abuse. This is a serious crime that causes significant emotional and psychological harm.',
          prevention: [
            'Think carefully before sharing intimate content',
            'Know your legal rights and options',
            'Document evidence of non-consensual sharing',
            'Seek legal and emotional support'
          ]
        }
      ]
    },
    'ransomware': {
      title: 'Ransomware',
      sections: [
        {
          subtitle: 'File Encryption Attacks',
          content: 'Malicious software that encrypts victim\'s files and demands payment for decryption keys. Ransomware can affect individuals, businesses, and even government organizations, causing significant financial and operational damage.',
          prevention: [
            'Regularly backup important files',
            'Keep software and OS updated',
            'Use reputable antivirus software',
            'Be cautious with email attachments'
          ]
        },
        {
          subtitle: 'System Lockout',
          content: 'Complete system lockdown preventing access to computers and networks until ransom is paid. This can paralyze entire organizations and cause massive disruption to services.',
          prevention: [
            'Implement robust backup strategies',
            'Train employees on security awareness',
            'Use network segmentation',
            'Have incident response plans ready'
          ]
        }
      ]
    },
    'child-abuse': {
      title: 'Child Pornography / Child Sexual Abuse Material (CSAM)',
      sections: [
        {
          subtitle: 'Online Exploitation',
          content: 'Production, distribution, and possession of child sexual abuse material through digital platforms. This is among the most serious cybercrimes, causing severe harm to vulnerable children.',
          prevention: [
            'Report suspected CSAM immediately',
            'Monitor children\'s online activities',
            'Educate children about online safety',
            'Use parental control software'
          ]
        },
        {
          subtitle: 'Grooming and Predation',
          content: 'Online predators targeting minors through social media, gaming platforms, and chat applications. Predators build trust with children to exploit them for sexual purposes.',
          prevention: [
            'Teach children about stranger danger online',
            'Monitor children\'s communications',
            'Create open communication about online experiences',
            'Set clear rules about sharing personal information'
          ]
        }
      ]
    }
  };

  const categoryData = categoriesData[category];

  if (!categoryData) {
    return (
      <div className="cybercrime-category-page">
        <div className="cybercrime-category-page__error">
          <h1>Category Not Found</h1>
          <button onClick={() => navigate('/')}>Return Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cybercrime-category-page">
      {/* Header */}
      <header className="cybercrime-category-page__header-bar">
        <div className="cybercrime-category-page__header-content">
          <div className="cybercrime-category-page__logo">
            <div className="cybercrime-category-page__logo-icon">
              <img src="/ap-police-logo.png" alt="AP Police Logo" />
            </div>
            <div className="cybercrime-category-page__logo-text">
              <div className="cybercrime-category-page__logo-title">NTR Police Commissionerate, Vijayawada, Andhra Pradesh, India</div>
              <div className="cybercrime-category-page__logo-subtitle">CYBERCRIME AWARENESS AND PREVENTION PORTAL</div>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="cybercrime-category-page__breadcrumb">
        <div className="cybercrime-category-page__breadcrumb-container">
          <span className="cybercrime-category-page__breadcrumb-item" onClick={() => navigate('/')}>
            Home
          </span>
          <span className="cybercrime-category-page__breadcrumb-separator">›</span>
          <span className="cybercrime-category-page__breadcrumb-item cybercrime-category-page__breadcrumb-item--active">
            {categoryData.title}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="cybercrime-category-page__main">
        <div className="cybercrime-category-page__container">
          <div className="cybercrime-category-page__header">
            <h1 className="cybercrime-category-page__title">{categoryData.title}</h1>
            <p className="cybercrime-category-page__subtitle">Learn about different types of {categoryData.title.toLowerCase()} and how to protect yourself</p>
          </div>

          <div className="cybercrime-category-page__content">
            {categoryData.sections.map((section, index) => (
              <div key={index} className="cybercrime-category-page__section">
                <div className="cybercrime-category-page__section-header">
                  <h3 className="cybercrime-category-page__section-title">{section.subtitle}</h3>
                </div>
                
                <div className="cybercrime-category-page__section-body">
                  <div className="cybercrime-category-page__section-description">
                    <p>{section.content}</p>
                  </div>
                  
                  {section.prevention && (
                    <div className="cybercrime-category-page__prevention">
                      <h4 className="cybercrime-category-page__prevention-title">🛡️ Prevention Tips:</h4>
                      <ul className="cybercrime-category-page__prevention-list">
                        {section.prevention.map((tip, tipIndex) => (
                          <li key={tipIndex} className="cybercrime-category-page__prevention-item">{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Report Button */}
          <div className="cybercrime-category-page__actions">
            <button 
              className="cybercrime-category-page__report-btn"
              onClick={() => window.open('https://cybercrime.gov.in/', '_blank')}
            >
              🚨 Report Cybercrime
            </button>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          className="cybercrime-category-page__scroll-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}

      {/* Footer */}
      <footer className="cybercrime-category-page__footer">
        <p>© 2025 NTR Police Commissionerate, Vijayawada, Andhra Pradesh, India — CYBERCRIME AWARENESS AND PREVENTION PORTAL</p>
      </footer>
    </div>
  );
};

export default CybercrimeCategoryPage;