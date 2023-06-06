import { Plugin } from '@morten-olsen/x-blocks';
import { SiGithub } from 'react-icons/si';
import { VscGitPullRequest } from 'react-icons/vsc';
import { PullRequestRender } from './renders/pr';
import { PullRequestEditor } from './renders/pr/editor';

const plugin: Plugin = {
  name: 'Github',
  id: 'github',
  icon: <SiGithub />,
  renders: {
    pr: {
      icon: <VscGitPullRequest />,
      name: 'Pull Request',
      views: {
        default: PullRequestRender,
        editor: PullRequestEditor,
      },
    },
  },
};

export default plugin;
