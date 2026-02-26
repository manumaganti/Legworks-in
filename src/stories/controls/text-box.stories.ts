import type { Meta, StoryObj } from '@storybook/angular';
import { TextBoxComponent } from '../../app/controls/text-box-component/text-box-component';


const meta: Meta<TextBoxComponent> = {
  title: 'Components/TextBox',
  component: TextBoxComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<TextBoxComponent>;

export const Default: Story = {
  args: {},
};