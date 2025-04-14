import * as React from 'react';

interface IVisibilityProps {
  visibility: any;
  children: React.ReactNode;
  boundaryComponent?: boolean;
  suspenseComponent?: React.JSX.Element |  null
}

export default function Visibility({ children, visibility, boundaryComponent = false, suspenseComponent = null }: IVisibilityProps) {
  // eslint-disable-next-line no-extra-boolean-cast
  return <>{Boolean(visibility) ? children : boundaryComponent ? <div /> : suspenseComponent}</>;
}
