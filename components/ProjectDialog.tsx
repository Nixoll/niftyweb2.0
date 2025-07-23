
'use client';

import { useState, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  features: string[];
  duration: string;
  client: string;
  results: string[];
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectDialogProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDialog({ project, isOpen, onClose }: ProjectDialogProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden relative animate-slideUp">
        {/* Header Section */}
        <div className="relative h-80 bg-gradient-to-br from-blue-600 via-purple-600 to-red-500 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top mix-blend-overlay opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 group z-10"
          >
            <i className="ri-close-line text-2xl text-white group-hover:rotate-90 transition-transform duration-300"></i>
          </button>
          
          {/* Header Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/30">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                {project.category}
              </span>
              <div className="flex items-center space-x-2 text-sm opacity-90">
                <i className="ri-time-line"></i>
                <span>{project.duration}</span>
              </div>
            </div>
            <h2 className="text-5xl font-bold mb-2 tracking-tight">{project.title}</h2>
            <p className="text-xl text-white/90 font-light">{project.client}</p>
          </div>
        </div>
        
        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-20rem)]">
          <div className="p-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="xl:col-span-2 space-y-8">
                {/* Project Overview */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <i className="ri-information-line text-white"></i>
                    </div>
                    Project Overview
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">{project.description}</p>
                </div>
                
                {/* Key Features */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl border border-green-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <i className="ri-star-line text-white"></i>
                    </div>
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 group">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <i className="ri-check-line text-white text-sm"></i>
                        </div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Results & Impact */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-2xl border border-orange-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3">
                      <i className="ri-trophy-line text-white"></i>
                    </div>
                    Results & Impact
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.results.map((result, index) => (
                      <div key={index} className="flex items-start space-x-3 group">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-300">
                          <i className="ri-arrow-up-line text-white text-sm"></i>
                        </div>
                        <span className="text-gray-700 font-medium leading-relaxed">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-6">
                {/* Project Details */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <div className="w-6 h-6 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg flex items-center justify-center mr-3">
                      <i className="ri-file-text-line text-white text-sm"></i>
                    </div>
                    Project Details
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-white/70 rounded-xl">
                      <div>
                        <span className="text-sm text-gray-500 uppercase tracking-wide font-medium">Duration</span>
                        <p className="text-gray-900 font-bold text-lg">{project.duration}</p>
                      </div>
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <i className="ri-calendar-line text-blue-600"></i>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/70 rounded-xl">
                      <div>
                        <span className="text-sm text-gray-500 uppercase tracking-wide font-medium">Client</span>
                        <p className="text-gray-900 font-bold text-lg">{project.client}</p>
                      </div>
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <i className="ri-building-line text-green-600"></i>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/70 rounded-xl">
                      <div>
                        <span className="text-sm text-gray-500 uppercase tracking-wide font-medium">Category</span>
                        <p className="text-gray-900 font-bold text-lg">{project.category}</p>
                      </div>
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <i className="ri-folder-line text-purple-600"></i>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Technologies */}
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl border border-indigo-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <i className="ri-code-line text-white text-sm"></i>
                    </div>
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 border border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300 transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-4 rounded-xl hover:shadow-xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 whitespace-nowrap font-medium text-lg group"
                    >
                      <i className="ri-external-link-line group-hover:rotate-45 transition-transform duration-300"></i>
                      <span>View Live Project</span>
                    </a>
                  )}
                  
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-xl hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 flex items-center justify-center space-x-3 whitespace-nowrap font-medium text-lg group"
                    >
                      <i className="ri-github-line group-hover:scale-110 transition-transform duration-300"></i>
                      <span>View Source Code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}