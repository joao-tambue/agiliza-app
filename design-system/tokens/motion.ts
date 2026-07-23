/**
 * Agiliza Design System — Motion Tokens
 *
 * Sistema de animações usando Reanimated e Moti.
 * Princípio: movimento deve ser funcional, não decorativo.
 *
 * Bibliotecas: react-native-reanimated, moti
 */

// ─── Timing ──────────────────────────────────────────────────────────────────

export const timing = {
  /** Transições rápidas: toggles, opacidade, micro-interações */
  fast: 150,
  /** Transições normais: abertura de modais, mudança de estado */
  normal: 250,
  /** Transições lentas: page transitions, entradas complexas */
  slow: 400,
  /** Transições muito lentas: animações de entrada de lista */
  slower: 600,
} as const;

// ─── Easing ──────────────────────────────────────────────────────────────────

/**
 * Curvas de easing inspiradas em Material Design 3 e iOS.
 * Usar com Reanimated: `withTiming(value, { duration, easing })`
 */
export const easing = {
  /** Curva padrão — movimento natural */
  standard: [0.4, 0, 0.2, 1] as const,
  /** Entrada — elementos aparecendo */
  enter: [0, 0, 0.2, 1] as const,
  /** Saída — elementos desaparecendo */
  exit: [0.4, 0, 1, 1] as const,
  /** Aceleração — elementos saindo da tela */
  accelerate: [0.4, 0, 1, 1] as const,
  /** Desaceleração — elementos entrando na tela */
  decelerate: [0, 0, 0.2, 1] as const,
  /** Spring suave para micro-interações */
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  } as const,
  /** Spring responsivo para botões */
  springBouncy: {
    damping: 12,
    stiffness: 200,
    mass: 1,
  } as const,
  /** Spring firme para modais */
  springFirm: {
    damping: 20,
    stiffness: 300,
    mass: 1,
  } as const,
} as const;

// ─── Animation Presets ───────────────────────────────────────────────────────

/**
 * Configurações prontas para usar com Moti/Reanimated.
 */

export const animations = {
  /** Fade in — elemento aparece gradualmente */
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    transition: { duration: timing.normal, easing: easing.standard },
  },

  /** Fade out — elemento desaparece gradualmente */
  fadeOut: {
    from: { opacity: 1 },
    to: { opacity: 0 },
    transition: { duration: timing.normal, easing: easing.standard },
  },

  /** Scale in — elemento aparece com zoom */
  scaleIn: {
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1 },
    transition: { duration: timing.normal, easing: easing.decelerate },
  },

  /** Slide up — elemento sobe de baixo */
  slideUp: {
    from: { opacity: 0, translateY: 20 },
    to: { opacity: 1, translateY: 0 },
    transition: { duration: timing.normal, easing: easing.decelerate },
  },

  /** Slide down — elemento desce de cima */
  slideDown: {
    from: { opacity: 0, translateY: -20 },
    to: { opacity: 1, translateY: 0 },
    transition: { duration: timing.normal, easing: easing.decelerate },
  },

  /** Slide left — elemento entra pela esquerda */
  slideLeft: {
    from: { opacity: 0, translateX: 20 },
    to: { opacity: 1, translateX: 0 },
    transition: { duration: timing.normal, easing: easing.decelerate },
  },

  /** Slide right — elemento entra pela direita */
  slideRight: {
    from: { opacity: 0, translateX: -20 },
    to: { opacity: 1, translateX: 0 },
    transition: { duration: timing.normal, easing: easing.decelerate },
  },

  /** Card reveal — card aparece com fade + scale */
  cardReveal: {
    from: { opacity: 0, scale: 0.95, translateY: 10 },
    to: { opacity: 1, scale: 1, translateY: 0 },
    transition: { duration: timing.slow, easing: easing.decelerate },
  },
} as const;

// ─── Stagger Configuration ───────────────────────────────────────────────────

/**
 * Configuração para list stagger (itens aparecem um após o outro).
 */
export const stagger = {
  /** Delay entre cada item */
  delay: 50,
  /** Duração de cada item */
  duration: timing.normal,
  /** Easing dos itens */
  easing: easing.decelerate,
} as const;

// ─── Layout Animation Configs ────────────────────────────────────────────────

/**
 * Configurações para LayoutAnimation (React Native built-in).
 * Usar quando Reanimated não for necessário.
 */
export const layoutAnimations = {
  /** Mudança de layout suave */
  smooth: {
    duration: timing.normal,
    create: {
      type: "easeInEaseOut" as const,
      property: "opacity" as const,
    },
    update: {
      type: "easeInEaseOut" as const,
    },
    delete: {
      type: "easeInEaseOut" as const,
      property: "opacity" as const,
    },
  },

  /** Mudança de layout com spring */
  spring: {
    duration: timing.slow,
    create: {
      type: "spring" as const,
      property: "opacity" as const,
      springDamping: 0.7,
    },
    update: {
      type: "spring" as const,
      springDamping: 0.7,
    },
    delete: {
      type: "spring" as const,
      property: "opacity" as const,
      springDamping: 0.7,
    },
  },
} as const;

// ─── Press Animation ─────────────────────────────────────────────────────────

/**
 * Animações de press para botões e cards interativos.
 */
export const pressAnimations = {
  /** Botão padrão — leve redução de escala */
  button: {
    pressed: { scale: 0.97 },
    idle: { scale: 1 },
  },

  /** Card interativo — leve redução de escala */
  card: {
    pressed: { scale: 0.98 },
    idle: { scale: 1 },
  },

  /** Botão fab — redução maior */
  fab: {
    pressed: { scale: 0.92 },
    idle: { scale: 1 },
  },

  /** Ícone interativo — leve rotação */
  icon: {
    pressed: { scale: 0.85, rotate: -5 },
    idle: { scale: 1, rotate: 0 },
  },
} as const;
