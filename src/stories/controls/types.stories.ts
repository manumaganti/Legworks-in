import type { Meta, StoryObj } from '@storybook/angular';

import { TypesComponent } from '../../app/controls/types-component/types-component';


const meta: Meta<TypesComponent> = {
  title: 'Components/Types',
  component: TypesComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<TypesComponent>;

export const Default: Story = {
  args: {},
};