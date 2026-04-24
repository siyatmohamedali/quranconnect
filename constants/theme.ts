// constants/theme.ts

export const colors = {
  // Core Palette
  primary: '#FFE600',    // Vivid Yellow
  background: '#000000', // Rich Black
  surface: '#1A1A1A',    // Dark Charcoal
  border: '#333333',
  
  // Accents
  gold: '#FFD700',
  emerald: '#10B981',
  purple: '#A855F7',     // From your onboarding image
  
  // Text & Utils
  text: '#FFFFFF',
  textMuted: '#737373',
  black: '#000000',      // Fixed: Property 'black' now exists
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const borderRadius = { // Fixed: Member 'borderRadius' now exported
  sm: 4,
  md: 8,
  lg: 12,
  xl: 20,
  round: 9999,
};

export const typography = {
  heading1: {
    fontSize: 32,
    fontWeight: '800' as const,
  },
  heading2: {
    fontSize: 24,
    fontWeight: '700' as const,
  },
  bodySmall: { // Fixed: Property 'bodySmall' now exists
    fontSize: 14,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500' as const,
    textTransform: 'uppercase' as const,
  },
};
export const shadows = {
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 10,
  },
};