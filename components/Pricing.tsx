'use client';

import Link from 'next/link';

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        '3 whiteboards',
        'Basic drawing tools',
        'Share via link',
        'PNG export',
        'Community support'
      ],
      popular: false
    },
    {
      name: 'Pro',
      price: '$8',
      period: 'per month',
      features: [
        'Unlimited whiteboards',
        'Advanced drawing tools',
        'Real-time collaboration',
        'PDF & PNG export',
        'Priority support',
        'Custom templates'
      ],
      popular: true
    },
    {
      name: 'Team',
      price: '$24',
      period: 'per month',
      features: [
        'Everything in Pro',
        'Team management',
        'Advanced permissions',
        'Version history',
        'API access',
        'Custom integrations'
      ],
      popular: false
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600">
            Choose the plan that's right for you
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className={`bg-white border-2 rounded-lg p-8 relative ${
              plan.popular ? 'border-blue-500 shadow-lg' : 'border-gray-200'
            }`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">/{plan.period}</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <i className="ri-check-line text-green-500 mr-3"></i>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="#" className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors text-center block whitespace-nowrap ${
                plan.popular 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}>
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}