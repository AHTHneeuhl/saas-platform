'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/context/auth-context';
import { API_URL } from '@/lib/api';

type AuthFormProps = {
  type: 'login' | 'register';
};

const schema = z.object({
  name: z.string().optional(),
  email: z.email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

export function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const endpoint = type === 'login' ? 'auth/login' : 'auth/register';

    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.accessToken) {
      login(result.accessToken); // store token
      router.push('/dashboard'); // redirect
    }
  };

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow">
      <h1 className="mb-6 text-2xl font-semibold text-neutral-700">
        {type === 'login' ? 'Login' : 'Create account'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {type === 'register' && (
          <div>
            <label className="block text-sm mb-1 text-neutral-400">Name</label>
            <input
              {...register('name')}
              className="w-full rounded border px-3 py-2 text-neutral-500"
            />
            {errors.name && (
              <p className="text-sm text-red-500">Name is required</p>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm mb-1 text-neutral-400">Email</label>
          <input
            {...register('email')}
            type="email"
            className="w-full rounded border px-3 py-2 text-neutral-500"
          />
          {errors.email && (
            <p className="text-sm text-red-500">Invalid email</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1 text-neutral-400">
            Password
          </label>
          <input
            {...register('password')}
            type="password"
            className="w-full rounded border px-3 py-2 text-neutral-500"
          />
          {errors.password && (
            <p className="text-sm text-red-500">
              Password must be at least 6 characters
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded bg-black py-2 text-white"
        >
          {type === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  );
}
