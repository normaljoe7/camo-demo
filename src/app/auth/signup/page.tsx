// src/app/auth/signup/page.tsx
'use client';

import { useState } from 'react';
import { UserPlus, Mail, Lock, Eye, EyeOff, User, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AnimatedButton from '@/components/ui/AnimatedButton';
import Card from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    newsletter: true,
  });
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, password: newPassword });
    checkPasswordStrength(newPassword);
  };

  const getStrengthColor = () => {
    if (passwordStrength < 50) return 'bg-red-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (passwordStrength < 50) return 'Weak';
    if (passwordStrength < 75) return 'Fair';
    return 'Strong';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validation
      if (!formData.firstName.trim()) {
        throw new Error('First name is required');
      }

      if (!formData.email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      if (formData.password.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (!formData.agreeTerms) {
        throw new Error('You must agree to the terms and conditions');
      }

      // Signup using context
      await signup(`${formData.firstName} ${formData.lastName}`, formData.email, formData.password);

      // Show success message
      setError('success:Account created successfully! Redirecting...');

      // Redirect to account dashboard after delay
      setTimeout(() => {
        router.push('/account/dashboard');
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider: string) => {
    console.log(`${provider} signup clicked`);
    // Implement social signup logic here
  };

  return (
    <div className="w-full max-w-md animate-fade-in">
      <Card className="p-8 border-0 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-accent/10 rounded-full mb-4">
            <UserPlus className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Start Your Adventure</h1>
          <p className="text-gray-400">Create an account to book expeditions and track your journeys</p>
        </div>

        {/* Error/Success Message */}
        {error && (
          <div className={`mb-6 p-4 rounded-lg ${error.startsWith('success:')
            ? 'bg-green-500/10 border border-green-500/20'
            : 'bg-red-500/10 border border-red-500/20'
            }`}>
            <p className={`text-sm ${error.startsWith('success:') ? 'text-green-400' : 'text-red-400'
              }`}>
              {error.replace('success:', '')}
            </p>
          </div>
        )}

        {/* Social Signup Buttons */}
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSocialSignup('google')}
              className="flex items-center justify-center space-x-2 p-3 border border-white/20 bg-black/20 text-white placeholder-gray-500 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-sm font-medium text-gray-300">Google</span>
            </button>
            <button
              onClick={() => handleSocialSignup('facebook')}
              className="flex items-center justify-center space-x-2 p-3 border border-white/20 bg-black/20 text-white placeholder-gray-500 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-sm font-medium text-gray-300">Facebook</span>
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20 bg-black/20 text-white placeholder-gray-500"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-400">Or sign up with email</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-white/20 bg-black/20 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  placeholder="John"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-3 border border-white/20 bg-black/20 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                placeholder="Doe"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-white/20 bg-black/20 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                placeholder="adventurer@example.com"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handlePasswordChange}
                className="w-full pl-10 pr-12 py-3 border border-white/20 bg-black/20 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                placeholder="••••••••"
                required
                disabled={isLoading}
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-400 transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Password Strength Meter */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">Password strength</span>
                  <span className={`text-xs font-medium ${passwordStrength < 50 ? 'text-red-600' :
                    passwordStrength < 75 ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                    {getStrengthText()}
                  </span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getStrengthColor()} transition-all duration-300`}
                    style={{ width: `${passwordStrength}%` }}
                  />
                </div>
                <ul className="mt-2 space-y-1">
                  <li className="flex items-center text-xs text-gray-400">
                    <Check className={`h-3 w-3 mr-2 ${formData.password.length >= 8 ? 'text-green-500' : 'text-gray-300'}`} />
                    At least 8 characters
                  </li>
                  <li className="flex items-center text-xs text-gray-400">
                    <Check className={`h-3 w-3 mr-2 ${/[A-Z]/.test(formData.password) ? 'text-green-500' : 'text-gray-300'}`} />
                    One uppercase letter
                  </li>
                  <li className="flex items-center text-xs text-gray-400">
                    <Check className={`h-3 w-3 mr-2 ${/[0-9]/.test(formData.password) ? 'text-green-500' : 'text-gray-300'}`} />
                    One number
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full pl-10 pr-12 py-3 border border-white/20 bg-black/20 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-400 transition-colors"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                className="h-4 w-4 text-accent border-white/20 bg-black/20 text-white placeholder-gray-500 rounded focus:ring-accent mt-1"
                required
                disabled={isLoading}
              />
              <label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-300">
                I agree to the{' '}
                <Link href="/terms" className="text-accent hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="newsletter"
                checked={formData.newsletter}
                onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                className="h-4 w-4 text-accent border-white/20 bg-black/20 text-white placeholder-gray-500 rounded focus:ring-accent mt-1"
                disabled={isLoading}
              />
              <label htmlFor="newsletter" className="ml-2 text-sm text-gray-300">
                Subscribe to our newsletter for expedition updates, special offers, and adventure tips
              </label>
            </div>
          </div>

          <AnimatedButton
            variant="solid"
            size="lg"
            className="w-full"
            disabled={isLoading || !formData.agreeTerms || formData.password !== formData.confirmPassword}
            icon={ArrowRight}
            tooltipText={isLoading ? 'Creating Account...' : 'Create Account'}
            onClick={() => { }} // Form handles submit
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </AnimatedButton>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link
              href="/auth/login"
              className="text-accent font-semibold hover:text-accent/80 transition-colors inline-flex items-center group"
            >
              Sign in here
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-center text-gray-400 text-xs">
            By creating an account, you acknowledge that you have read and understood our{' '}
            <Link href="/terms" className="text-accent hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </Card>
    </div>
  );
}