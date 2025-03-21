
import React from 'react';
import { Link } from 'react-router-dom';
import { useLinks } from '@/context/LinkContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Link as LinkIcon, PlusCircle } from 'lucide-react';

const Index = () => {
  const { pages } = useLinks();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-blue-400/10 animate-spin-slow"></div>
            <div className="absolute top-40 right-[10%] w-[300px] h-[300px] rounded-full bg-blue-500/10 animate-spin-slow" style={{ animationDuration: '12s' }}></div>
            <div className="absolute bottom-40 left-[10%] w-[200px] h-[200px] rounded-full bg-blue-300/20 animate-spin-slow" style={{ animationDuration: '10s' }}></div>
          </div>
        </div>

        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium animate-fade-in">
              Simple • Elegant • Beautiful
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
              Create Beautiful <span className="text-blue-500">Link Pages</span> in Minutes
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Build your own custom link page with our intuitive dashboard and share it with the world. Perfect for creators, businesses, and anyone who wants to share multiple links in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg">
                <Link to="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {pages.length > 0 && (
                <Button asChild variant="outline" size="lg" className="transition-all duration-300">
                  <Link to={`/preview/${pages[0].id}`}>
                    View Demo
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform provides all the tools you need to create, manage, and share your links.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 border rounded-xl transition-all duration-300 hover:shadow-md animate-fade-in">
              <div className="w-12 h-12 mb-4 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                <LinkIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Manage Links</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Add, edit, and organize all your important links in one dashboard.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 border rounded-xl transition-all duration-300 hover:shadow-md animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 mb-4 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Live Preview</h3>
              <p className="text-gray-600 dark:text-gray-300">
                See exactly how your page will look with our real-time mobile preview.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 border rounded-xl transition-all duration-300 hover:shadow-md animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 mb-4 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                <PlusCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Multiple Pages</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Create different pages for different purposes, all from one account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-500 text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="max-w-xl mx-auto mb-8">
            Create your custom link page in minutes and share it with your audience today.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 transition-all duration-300">
            <Link to="/dashboard">
              Create Your Page
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                © 2023 LinkTree Clone. All rights reserved.
              </p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
