import type { Meta, StoryObj } from '@storybook/angular';
import { TextAreaComponent } from '../../app/controls/text-area-component/text-area-component';


const meta: Meta<TextAreaComponent> = {
  title: 'Components/Textarea',
  component: TextAreaComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<TextAreaComponent>;

export const textarea: Story = {
  args: {},
};