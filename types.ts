export type ChallengeType =
  | 'code'
  | 'writing'
  | 'design_contrast'
  | 'security_phishing'
  | 'content_composition'
  | 'gaming_logic'
  | 'multiple_choice';

interface BaseChallenge {
    type: ChallengeType;
    title: string;
    instruction: string;
    hint?: string;
    solution?: string;
}

interface CodeChallenge extends BaseChallenge {
    type: 'code';
    placeholder: string;
    expectedAnswer: string;
    language: string;
}

interface WritingChallenge extends BaseChallenge {
    type: 'writing';
    scenario: string;
    placeholder: string;
}

interface DesignContrastChallenge extends BaseChallenge {
    type: 'design_contrast';
    options: { color: string; hex: string; isCorrect: boolean }[];
    background: string;
}

interface SecurityPhishingChallenge extends BaseChallenge {
    type: 'security_phishing';
    sender: string;
    subject: string;
    body: {
        greeting: string;
        warning: string;
        closing: string;
    };
    linkText: string;
    feedback: string;
}

interface ContentCompositionChallenge extends BaseChallenge {
    type: 'content_composition';
    options: {
        subjectPosition: { top: string; left: string };
        label: string;
        isCorrect: boolean
    }[];
}

interface GamingLogicChallenge extends BaseChallenge {
    type: 'gaming_logic';
    question: string;
    prefix: string;
    suffix: string;
    expectedAnswer: string;
}

interface MultipleChoiceChallenge extends BaseChallenge {
    type: 'multiple_choice';
    question: string;
    options: { text: string; isCorrect: boolean }[];
}


export type InteractiveChallenge =
    | CodeChallenge
    | WritingChallenge
    | DesignContrastChallenge
    | SecurityPhishingChallenge
    | ContentCompositionChallenge
    | GamingLogicChallenge
    | MultipleChoiceChallenge;

export interface Slide {
  title: string;
  content: string[];
}

export interface TopicContent {
    introduction: {
        title: string;
        description: string;
    };
    slides: Slide[];
    challenges: InteractiveChallenge[];
}

// FIX: Add missing types for Suitability Quiz and Results views.
export interface SuitabilityQuestion {
    id: string;
    question: string;
    options: string[];
}

export interface RaisecScores {
    R: number;
    I: number;
    A: number;
    S: number;
    E: number;
    C: number;
}

export type SuitabilityLevel = 'Sangat Cocok' | 'Cocok' | 'Potensi Menjanjikan';

export interface TopicResult {
    suitability: SuitabilityLevel;
    title: string;
    summary: string;
    raisecScores: RaisecScores;
    keyTraits: string[];
    growthAreas: string[];
}
