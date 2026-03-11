import type { Meta, StoryObj } from '@storybook/angular';
import { VariousServicesComponent } from '../../app/controls/various-services-component/various-services-component';


const meta: Meta<VariousServicesComponent> = {
  title: 'Components/VariousServices',
  component: VariousServicesComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<VariousServicesComponent>;

export const Default: Story = {
  args: {},
};