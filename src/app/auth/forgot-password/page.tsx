// src/app/auth/forgot-password/page.tsx
'use client';

import { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md animate-fade-in">
      <Card className="p-8 border-0 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-[#74F227]/10 rounded-full mb-4">
            <Mail className="h-8 w-8 text-[#74F227]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isSubmitted ? 'Check Your Email' : 'Forgot Password'}
          </h1>
          <p className="text-gray-600">
            {isSubmitted 
              ? 'We\'ve sent reset instructions to your email'
              : 'Enter your email to receive reset instructions'
            }
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center h-20 w-20 bg-green-100 rounded-full">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            
            <div className="space-y-2">
              <p className="text-gray-700">
                Reset instructions have been sent to <strong>{email}</strong>
              </p>
              <p className="text-sm text-gray-500">
                If you don&apos;t see the email, check your spam folder.
              </p>
            </div>
            
            <div className="space-y-3">
              <Link href="/auth/login">
                <Button variant="solid" className="w-full">
                  Return to Sign In
                </Button>
              </Link>
              
              <p className="text-sm text-gray-500">
                Didn&apos;t receive the email?{' '}
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-[#74F227] hover:text-[#74F227]/80 font-medium"
                >
                  Resend
                </button>
              </p>
            </div>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#74F227] focus:border-transparent transition-all"
                    placeholder="adventurer@example.com"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                variant="solid" 
                size="lg" 
                className="w-full relative"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="loader mr-3"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  'Send Reset Instructions'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link 
                href="/auth/login" 
                className="inline-flex items-center text-[#74F227] hover:text-[#74F227]/80 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Sign In
              </Link>
            </div>
          </>
        )}
      </Card>

      <style jsx>{`
        .loader {
          width: 44.8px;
          height: 44.8px;
          color: #74F227;
          position: relative;
          background: radial-gradient(11.2px, currentColor 94%, #0000);
        }

        .loader:before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(10.08px at bottom right, #0000 94%, currentColor) top left,
                      radial-gradient(10.08px at bottom left, #0000 94%, currentColor) top right,
                      radial-gradient(10.08px at top right, #0000 94%, currentColor) bottom left,
                      radial-gradient(10.08px at top left, #0000 94%, currentColor) bottom right;
          background-size: 22.4px 22.4px;
          background-repeat: no-repeat;
          animation: loader 1.5s infinite cubic-bezier(0.3, 1, 0, 1);
        }

        @keyframes loader {
          33% {
            inset: -11.2px;
            transform: rotate(0deg);
          }

          66% {
            inset: -11.2px;
            transform: rotate(90deg);
          }

          100% {
            inset: 0;
            transform: rotate(90deg);
          }
        }
      `}</style>
    </div>
  );
}