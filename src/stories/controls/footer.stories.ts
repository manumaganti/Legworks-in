import type { Meta, StoryObj } from '@storybook/angular';
import { BodyComponent } from '../../app/controls/body-component/body-component';
import { FooterComponent } from '../../app/controls/footer-component/footer-component';


const meta: Meta<FooterComponent> = {
  title: 'Components/Footer',
  component: FooterComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<FooterComponent>;

export const Default: Story = {
  args: {},
};