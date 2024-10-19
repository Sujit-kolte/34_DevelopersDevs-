import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Portal component
const Portal = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Set the portal-root only after the component has mounted
    const root = document.getElementById("portal-root");
    if (root) {
      setPortalRoot(root);
    }
  }, []);

  if (!portalRoot) return null; // Render nothing if the portal root doesn't exist

  // Render the portal when portalRoot is ready
  return createPortal(<div className={className}>{children}</div>, portalRoot);
};

export default Portal;
