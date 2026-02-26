import type { Meta, StoryObj } from '@storybook/angular';
import { ModuleComponent } from '../../app/controls/module-component/module-component';


const meta: Meta<ModuleComponent> = {
  title: 'Components/Module',
  component: ModuleComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<ModuleComponent>;

export const Default: Story = {
  args: {},
};