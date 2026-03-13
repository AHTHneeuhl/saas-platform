import { ReactNode } from 'react';

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-3xl font-semibold mb-6">Settings</h1>
      {children}
    </div>
  );
}
