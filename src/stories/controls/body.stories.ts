import type { Meta, StoryObj } from '@storybook/angular';
import { BodyComponent } from '../../app/controls/body-component/body-component';


const meta: Meta<BodyComponent> = {
  title: 'Components/Body',
  component: BodyComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<BodyComponent>;

export const Default: Story = {
  args: {},
};