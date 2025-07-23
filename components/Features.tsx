'use client';

export default function Features() {
  const features = [
    {
      icon: 'ri-brush-line',
      title: 'Drawing Tools',
      description: 'Complete set of drawing tools including pen, highlighter, shapes, and text'
    },
    {
      icon: 'ri-team-line',
      title: 'Real-time Collaboration',
      description: 'Work together with your team in real-time from anywhere in the world'
    },
    {
      icon: 'ri-sticky-note-line',
      title: 'Sticky Notes',
      description: 'Add colorful sticky notes to organize your thoughts and ideas'
    },
    {
      icon: 'ri-share-line',
      title: 'Easy Sharing',
      description: 'Share your whiteboard with a simple link or export as PDF/image'
    },
    {
      icon: 'ri-cloud-line',
      title: 'Cloud Storage',
      description: 'All your whiteboards are automatically saved to the cloud'
    },
    {
      icon: 'ri-smartphone-line',
      title: 'Mobile Friendly',
      description: 'Access your whiteboards on any device, anywhere, anytime'
    }
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Everything you need to collaborate
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to make your creative process seamless and efficient
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg mb-4">
                <i className={`${feature.icon} text-blue-600 text-xl`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}