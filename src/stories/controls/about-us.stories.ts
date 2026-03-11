import type { Meta, StoryObj } from '@storybook/angular';
import { AboutUsComponent } from '../../app/controls/about-us-component/about-us-component';


const meta: Meta<AboutUsComponent> = {
  title: 'Components/AboutUs',
  component: AboutUsComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<AboutUsComponent>;

export const Default: Story = {
  args: {},
};