interface GoogleIdentityServicesAccount {
  id: {
    initialize: (config: {
      client_id: string;
      callback: (response: { credential: string }) => void;
    }) => void;
    renderButton: (
      element: HTMLElement,
      config: {
        theme?: 'outline' | 'filled_blue' | 'filled_black';
        size?: 'large' | 'medium' | 'small';
        type?: 'standard' | 'icon';
        shape?: 'rectangular' | 'pill' | 'circle' | 'square';
        text?: string;
        logo_alignment?: 'left' | 'center';
      }
    ) => void;
    prompt: () => void;
  };
}

interface Window {
  google?: {
    accounts: GoogleIdentityServicesAccount;
  };
}
