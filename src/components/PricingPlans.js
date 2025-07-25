import React from 'react';
import './PricingPlans.css';

const plans = [
  {
    title: 'FLUENT SOCIALIZER',
    price: '5.550₺',
    period: '3 AY',
    ideal: [
      'Çekingen konuşmacılar',
      'Gerçek sohbet pratiği yapmak isteyenler',
    ],
    sessions: 'HAFTADA 1 GÜN 90 DK GRUP OTURUMU',
    reasons: [
      'Günlük konuşma pratiği ile akıcılığını geliştirmek istiyor',
      'Konuşma yaparken hata yapmaktan çekiniyor',
      'Kurallardan çok gerçek İngilizce konuşmaya odaklı',
    ],
    advantages: [
      'Yoğun grup etkileşimi',
      'Akranlar arası öğrenme',
      'Gerçek hayata uygun konuşma senaryoları',
      'Sıcak ve motive edici ortam',
    ],
  },
  {
    title: 'FOCUS PLAN',
    price: '11.890₺',
    period: 'AYLIK',
    ideal: [
      'Sınavlara hazırlananlar',
      'İş mülakatı öncesi çalışanlar',
      'Akademik hedefi olanlar',
    ],
    sessions: 'HAFTADA 2 GÜN 60 DK BİREBİR ÖZEL DERS',
    reasons: [
      'TOEFL, IELTS gibi sınavlara ya da mülakatlara kısa sürede hazırlanmak istiyor',
      'Yapılandırılmış ve yoğun birebir derslere ihtiyaç duyuyor',
      'Kısa sürede somut sonuç almak istiyor',
    ],
    advantages: [
      '%100 kişiye özel birebir dersler',
      'Esnek zamanlama',
      'Gelişim takibi ve geri bildirim',
    ],
    best: true,
  },
  {
    title: 'HYBRID BOOSTER',
    price: '40.540₺',
    period: 'AYLIK',
    ideal: ['Hem birebir hem grup öğrenmeyi seven dengeli katılımcılar'],
    sessions: 'HAFTADA 2×30 DK ÖZEL DERS + 1×90 DK GRUP OTURUMU',
    reasons: [
      'Hızlı ama sürdürülebilir bir gelişim istiyor',
      'Sosyal ve bireysel öğrenmeyi birleştirmek istiyor',
      'Hem doğru konuşmak hem de akıcı olmak hedefinde',
    ],
    advantages: [
      'Hızlı sonuç ve çeşitlilik bir arada',
      'Haftalık düzenli plan ile uzun vadeli ilerleme',
      'Zaman ve verim açısından en iyi yatırım',
      'Odaklanma + özgüven gelişimi dengesi',
    ],
  },
];

const PricingPlans = () => (
  <div className="pricing-plans">
    {plans.map((plan) => (
      <div key={plan.title} className={`plan-card ${plan.best ? 'best' : ''}`}>
        {/* Title */}
        <h3 className="plan-title">{plan.title}</h3>

        {/* Price */}
        <div className="plan-price">
          <span>{plan.price}</span>
          <small>{plan.period}</small>
        </div>

        {/* Ideal for */}
        <section className="plan-section ideal-for">
          <h4>Kimler için ideal? 🤔</h4>
          <ul>
            {plan.ideal.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Weekly sessions highlight */}
        <div className="plan-highlight">{plan.sessions}</div>

        {/* Reasons */}
        <section className="plan-section reasons">
          <h4>Bu paketi tercih etmeli çünkü:</h4>
          <ul>
            {plan.reasons.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Advantages */}
        <section className="plan-section advantages">
          <h4>Avantajları</h4>
          <ul>
            {plan.advantages.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <button className="select-button">Seçin</button>
      </div>
    ))}
  </div>
);

export default PricingPlans;