import React from 'react';
import { Topic, TopicContent } from './types';
import {
  CodeIcon,
  DesignIcon,
  GamingIcon,
  MultimediaIcon,
  PublicRelationsIcon,
  SecurityIcon,
} from '../components/Icons';

// Import data konten individual dari direktori topics
import { programmingContent } from './topics/programming';
import { designContent } from './topics/design';
import { securityContent } from './topics/networking-security';
import { creativeContentContent } from './topics/creative-content';
import { publicRelationsContent } from './topics/public-relations';
import { gamingContent } from './topics/gaming';

export interface Topic {
  id: string;
  name: string;
  icon: React.FC<{ className?: string }>;
  description: string;
}

// "Daftar Isi" untuk semua topik tetap di sini.
export const topics: Topic[] = [
  {
    id: 'programming',
    name: 'Pengembangan Perangkat Lunak',
    icon: CodeIcon,
    description: 'Selami seni membangun solusi digital melalui 10 tantangan interaktif, dari dasar hingga logika.',
  },
  {
    id: 'design',
    name: 'Desain Grafis & UI/UX',
    icon: DesignIcon,
    description: 'Pelajari prinsip-prinsip visual yang menciptakan pengalaman digital yang indah dan fungsional.',
  },
  {
    id: 'networking-security',
    name: 'Jaringan & Keamanan Siber',
    icon: SecurityIcon,
    description: 'Jadilah penjaga dunia digital dengan mempelajari cara melindungi data dan sistem dari ancaman.',
  },
  {
    id: 'creative-content',
    name: 'Konten Kreatif & Multimedia',
    icon: MultimediaIcon,
    description: 'Kuasai seni bercerita melalui video, fotografi, dan media digital untuk memikat audiens.',
  },
  {
    id: 'public-relations',
    name: 'Hubungan Masyarakat & Media',
    icon: PublicRelationsIcon,
    description: 'Pelajari cara membangun dan menjaga reputasi positif sebuah merek atau organisasi di mata publik.',
  },
  {
    id: 'gaming',
    name: 'Gaming (Development & E-Sport)',
    icon: GamingIcon,
    description: 'Masuki industri game, dari sisi penciptaan dunia interaktif maupun kompetisi profesional.',
  },
];

// Merakit objek topicData dari semua modul yang diimpor.
// Komponen App akan mengimpor objek ini, sehingga tidak perlu diubah.
export const topicData: Record<string, TopicContent> = {
  programming: programmingContent,
  design: designContent,
  'networking-security': securityContent,
  'creative-content': creativeContentContent,
  'public-relations': publicRelationsContent,
  gaming: gamingContent,
};
