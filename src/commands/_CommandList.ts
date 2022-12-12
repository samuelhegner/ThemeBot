import { Command } from '../interfaces/Command';
import { entry } from './entry';
import { ping } from './ping';
import { theme } from './theme';

export const CommandList: Command[] = [ping, theme, entry];
