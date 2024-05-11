import { defineCliConfig } from 'sanity/cli';
import { options } from './config/options';

export default defineCliConfig({
  api: {
    projectId: options.projectId,
    dataset: options.dataset,
  }
})
