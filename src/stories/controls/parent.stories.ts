import type { Meta, StoryObj } from '@storybook/angular';
import { NumberBoxComponent } from '../../app/controls/number-box-component/number-box-component';
import { ParentComponent } from '../../app/controls/parent-component/parent-component';


const meta: Meta<ParentComponent> = {
  title: 'Components/ParentComponent',
  component: ParentComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<ParentComponent>;

export const Default: Story = {
  args: {},
};