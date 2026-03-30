import type { Meta, StoryObj } from '@storybook/angular';
import { VariousServicesComponent } from '../../app/controls/various-services-component/various-services-component';
import { WhatWeDoComponent } from '../../app/controls/what-we-do-component/what-we-do-component';


const meta: Meta<WhatWeDoComponent> = {
  title: 'Components/WhatWeDo',
  component: WhatWeDoComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<WhatWeDoComponent>;

export const Default: Story = {
  args: {},
};