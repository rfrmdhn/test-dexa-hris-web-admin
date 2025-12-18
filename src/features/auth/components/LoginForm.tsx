import React, { useState } from 'react';
import { FormField } from '@/components/molecules/FormField';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Heading, Text } from '@/components/atoms/Typography';
import { useLogin } from '@/features/auth/hooks';

export const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { mutate: login, isPending } = useLogin({
        onError: (err) => {
            setError(err.message || 'Login failed. Please check your credentials.');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        login({ email, password });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-8">
                <Heading as="h2" className="mb-2">
                    Welcome Back
                </Heading>
                <Text variant="muted">
                    Sign in to continue to HRIS Admin
                </Text>
            </div>

            {error && (
                <div className="p-4 bg-danger-light border border-danger/20 rounded-lg flex items-start gap-3">
                    <Icon name="error" className="text-danger flex-shrink-0 mt-0.5" />
                    <Text size="sm" className="text-danger">
                        {error}
                    </Text>
                </div>
            )}

            <FormField
                label="Email"
                type="email"
                placeholder="admin@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                leftIcon={<Icon name="mail" size="sm" />}
            />

            <FormField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                leftIcon={<Icon name="lock" size="sm" />}
                rightIcon={
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="p-0.5 hover:bg-secondary-light rounded transition-colors"
                        tabIndex={-1}
                    >
                        <Icon
                            name={showPassword ? 'visibility_off' : 'visibility'}
                            size="sm"
                            className="text-text-muted"
                        />
                    </button>
                }
            />

            <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={isPending}
            >
                {isPending ? 'Signing in...' : 'Sign In'}
            </Button>
        </form>
    );
};
