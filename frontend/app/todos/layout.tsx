import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Todo Application',
  description: 'A full-stack Todo Application with Laravel and Next.js',
};

export default function TodosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
