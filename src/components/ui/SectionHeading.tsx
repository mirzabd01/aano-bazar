import type { ReactNode } from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  center?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  action,
  center = false,
}: SectionHeadingProps) {
  return (
    <div className={`section-heading ${center ? 'section-heading-center' : ''}`}>
      <div>
        <h2 className="section-heading-title">{title}</h2>
        {subtitle && <p className="section-heading-subtitle">{subtitle}</p>}
      </div>
      {action && <div className="section-heading-action">{action}</div>}
    </div>
  );
}
