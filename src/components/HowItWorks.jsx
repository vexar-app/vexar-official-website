import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import useScrollAnimation from '../hooks/useScrollAnimation';

const HowItWorks = () => {
    const { t } = useLanguage();
    useScrollAnimation();

    return (
        <section className="how-section" id="how-it-works">
            <div className="container">
                <div className="section-header animate-on-scroll">
                    <span className="section-badge">{t('how.badge')}</span>
                    <h2 className="section-title">{t('how.title')}</h2>
                    <p className="section-description">
                        {t('how.description')}
                    </p>
                </div>

                <div className="steps-wrapper">
                    
                    
                    <div className="step animate-on-scroll">
                        <div className="step-number">1</div>
                        <div className="step-content">
                            <h3 className="step-title">{t('how.step1.title')}</h3>
                            <p className="step-description">
                                {t('how.step1.description')}
                            </p>
                        </div>
                        <div className="step-visual">
                            <div className="step-icon-wrapper">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="step animate-on-scroll">
                        <div className="step-number">2</div>
                        <div className="step-content">
                            <h3 className="step-title">{t('how.step2.title')}</h3>
                            <p className="step-description">
                                {t('how.step2.description')}
                            </p>
                        </div>
                        <div className="step-visual">
                            <div className="step-icon-wrapper">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="step animate-on-scroll">
                        <div className="step-number">3</div>
                        <div className="step-content">
                            <h3 className="step-title">{t('how.step3.title')}</h3>
                            <p className="step-description">
                                {t('how.step3.description')}
                            </p>
                        </div>
                        <div className="step-visual">
                            <div className="step-icon-wrapper success">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
